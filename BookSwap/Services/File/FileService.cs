using System.Net;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using BookSwap.Enums;

namespace BookSwap.Services.File;

public class FileService : IFileService
{
    public async Task<string?> CheckIfObjectExistsAndReturnUrlAsync(AmazonS3Client s3Client, string bucketName,
        IFormFile file, string imageCategory)
    {
        var existingObjectRequest = new GetObjectMetadataRequest
        {
            BucketName = bucketName,
            Key = $"{imageCategory}/{file.FileName}",
        };

        try
        {
            var existingObjectMetadata = await s3Client.GetObjectMetadataAsync(existingObjectRequest);
            return
                $"https://{bucketName}.s3.{RegionEndpoint.EUCentral1.SystemName}.amazonaws.com/{existingObjectRequest.Key}";
        }
        catch (AmazonS3Exception ex) when (ex.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task<string> UploadFileToS3Async(AmazonS3Client s3Client, string bucketName, IFormFile file,
        string imageCategory)
    {
        var uploadRequest = new PutObjectRequest
        {
            BucketName = bucketName,
            Key = $"{imageCategory}/{file.FileName}",
            InputStream = file.OpenReadStream(),
            ContentType = file.ContentType,
            CannedACL = S3CannedACL.PublicRead
        };

        var response = await s3Client.PutObjectAsync(uploadRequest);

        if (response.HttpStatusCode == HttpStatusCode.OK)
        {
            return $"https://{bucketName}.s3.{RegionEndpoint.EUCentral1.SystemName}.amazonaws.com/{uploadRequest.Key}";
        }
        else
        {
            throw new Exception("Error uploading to S3");
        }
    }

    public bool FileSizeExceedsLimit(IFormFile file)
    {
        var maxFileSizeInBytes = 5 * 1024 * 1024; // 5 MB
        return file.Length > maxFileSizeInBytes;
    }

    public bool IsImage(IFormFile file)
    {
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tif", ".tiff", ".webp", ".svg" };

        var fileExtension = Path.GetExtension(file.FileName)?.ToLowerInvariant();

        return allowedExtensions.Contains(fileExtension);
    }

    public async Task<string?> CheckIfObjectExistsAndReturnKeyAsync(AmazonS3Client s3Client, string bucketName, Uri fileUrl)
    {
        try
        {
            var key = fileUrl.AbsolutePath.TrimStart('/');
            var existingObjectRequest = new GetObjectMetadataRequest
            {
                BucketName = bucketName,
                Key = key,
            };

            await s3Client.GetObjectMetadataAsync(existingObjectRequest);
            return key;
        }
        catch (AmazonS3Exception ex) when (ex.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task DeleteFileAsync(AmazonS3Client s3Client, string bucketName, string key)
    {
        await s3Client.DeleteObjectAsync(bucketName, key);
    }
}
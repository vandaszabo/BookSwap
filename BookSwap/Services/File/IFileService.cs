using Amazon.S3;
using BookSwap.Enums;

namespace BookSwap.Services.File;

public interface IFileService
{
    Task<string?> CheckIfObjectExistsAndReturnUrlAsync(AmazonS3Client s3Client, string bucketName, IFormFile file, string imageCategory);
    Task<string?> CheckIfObjectExistsAndReturnKeyAsync(AmazonS3Client s3Client, string bucketName, Uri fileUrl);
    Task DeleteFileAsync(AmazonS3Client s3Client, string bucketName, string key);
    Task<string> UploadFileToS3Async(AmazonS3Client s3Client, string bucketName, IFormFile file, string imageCategory);
    bool FileSizeExceedsLimit(IFormFile file);
    bool IsImage(IFormFile file);

}
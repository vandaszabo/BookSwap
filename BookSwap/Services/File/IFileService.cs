using Amazon.S3;
using BookSwap.Enums;

namespace BookSwap.Services.File;

public interface IFileService
{
    Task<string?> CheckIfObjectExistsAndReturnUrlAsync(AmazonS3Client s3Client, string bucketName, IFormFile file, ImageCategory imageCategory);
    Task<string> UploadFileToS3Async(AmazonS3Client s3Client, string bucketName, IFormFile file, ImageCategory imageCategory);
    bool FileSizeExceedsLimit(IFormFile file);
    bool IsImage(IFormFile file);

}
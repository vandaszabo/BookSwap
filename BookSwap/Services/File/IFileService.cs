using Amazon.S3;

namespace BookSwap.Services;

public interface IFileService
{
    Task<string> CheckIfObjectExistsAndReturnUrlAsync(AmazonS3Client s3Client, string bucketName, IFormFile file, ImageCategory imageCategory);
    Task<string> UploadFileToS3Async(AmazonS3Client s3Client, string bucketName, IFormFile file, ImageCategory imageCategory);
    bool FileSizeExceedsLimit(IFormFile file);
    bool IsImage(IFormFile file);

}
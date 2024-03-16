using System.Net;
using Amazon;
using Amazon.S3;
using BookSwap.Services.File;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FileController : ControllerBase
{
    private readonly ILogger<FileController> _logger;
    private readonly IFileService _fileService;
    private readonly string? _accessKey = Environment.GetEnvironmentVariable("AWS_ACCESSKEY");
    private readonly string? _secretKey = Environment.GetEnvironmentVariable("AWS_SECRETKEY");
    private readonly string? _bucketName = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME");

    public FileController(IFileService fileService, ILogger<FileController> logger)
    {
        _logger = logger;
        _fileService = fileService;
    }

    [HttpPost("Upload")]
    public async Task<IActionResult> UploadFile()
    {
        var file = HttpContext.Request.Form.Files.GetFile("file");
        var imageCategory = HttpContext.Request.Form["imageCategory"];

        _logger.LogInformation($"Received imageCategory: {imageCategory}");

        // Check file format
        if (!_fileService.IsImage(file))
        {
            return BadRequest("Invalid file format. Only image files are allowed.");
        }

        // Check file size
        if (_fileService.FileSizeExceedsLimit(file))
        {
            return BadRequest("File size exceeds the allowed limit (5 MB).");
        }

        // Create s3 client
        if (_bucketName != null && _accessKey != null && _secretKey != null)
        {
            var s3Client = new AmazonS3Client(_accessKey, _secretKey, RegionEndpoint.EUCentral1);

            try
            {
                // If file exists, return url
                var existingImageUrl =
                    await _fileService.CheckIfObjectExistsAndReturnUrlAsync(s3Client, _bucketName, file, imageCategory);
                if (existingImageUrl != null)
                {
                    return Ok(new { S3Url = existingImageUrl });
                }

                // If not, upload first, then return url
                var imageUrl = await _fileService.UploadFileToS3Async(s3Client, _bucketName, file, imageCategory);
                return Ok(new { S3Url = imageUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
            finally
            {
                s3Client.Dispose();
            }
        }

        else
        {
            return BadRequest("AWS credentials or bucket name not configured.");
        }
    }

    [HttpDelete("Delete")]
    public async Task<IActionResult> DeleteFile([FromBody] Uri fileUrl)
    {
        _logger.LogInformation($"Received url: {fileUrl}");

        if (_bucketName == null || _accessKey == null || _secretKey == null)
        {
            return BadRequest("AWS credentials or bucket name not configured.");
        }

        using var s3Client = new AmazonS3Client(_accessKey, _secretKey, RegionEndpoint.EUCentral1);

        try
        {
            var key = await _fileService.CheckIfObjectExistsAndReturnKeyAsync(s3Client, _bucketName, fileUrl);

            if (key != null)
            {
                await _fileService.DeleteFileAsync(s3Client, _bucketName, key);
                return Ok(new {
                    Message = "File deleted successfully from S3 bucket yourBucketName", Url = fileUrl });
            }
            else
            {
                return NotFound("File key was not found.");
            }
        }
        catch (AmazonS3Exception ex) when (ex.StatusCode == HttpStatusCode.NotFound)
        {
            return NotFound("File not found in the S3 bucket.");
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error deleting file: {ex.Message}");
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }
}
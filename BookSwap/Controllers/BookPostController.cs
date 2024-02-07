using System.Net;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookPostController : ControllerBase
{
    private readonly IBookService _bookService;

    public BookPostController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpPost("Create")]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Guid))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
    public async Task<ActionResult<Guid>> CreatePost([FromBody] BookPostRequest request)
    {
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdBookPost = await _bookService.CreateBookPost(request);

            if (createdBookPost == null)
            {
                return BadRequest("Error creating post.");
            }

            return CreatedAtAction(nameof(CreatePost), new { id = createdBookPost.PostId }, createdBookPost.PostId);

        }
    }

    [HttpGet("List")]
    public async Task<ActionResult<IEnumerable<BookPost>>> GetAll()
    {
        try
        {
            var books = await _bookService.GetAll();
            return Ok(books);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetAll: {ex.Message}");
            
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<BookPost?>> DeletePost(Guid id)
    {
        try
        {
            var bookPost = await _bookService.DeletePost(id);
        
            if (bookPost == null)
            {
                return NotFound("Cannot find post to delete.");
            }

            return Ok(bookPost);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in DeletePost: {ex.Message}");
        
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<BookPost>>> GetPostById(Guid id)
    {
        try
        {
            var bookPost = await _bookService.GetByPostId(id);
        
            if (bookPost == null)
            {
                return NotFound();
            }

            return Ok(bookPost);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetPostById: {ex.Message}");
        
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    [HttpGet("User/{userId}")]
    public async Task<ActionResult<IEnumerable<BookPost>>> GetUserPosts(string userId)
    {
        try
        {
            var postList = await _bookService.GetUserPosts(userId);
        
            if (postList == null)
            {
                return NotFound("Cannot find user's posts.");
            }

            return Ok(postList);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetUserPosts: {ex.Message}");
        
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    [HttpPost("Upload")]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        if (!IsImage(file))
        {
            return BadRequest("Invalid file format. Only image files are allowed.");
        }
        
        var maxFileSizeInBytes = 5 * 1024 * 1024; // 5 MB
        if (file.Length > maxFileSizeInBytes)
        {
            return BadRequest("File size exceeds the allowed limit (5 MB).");
        }
        
        var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESSKEY");
        var secretKey = Environment.GetEnvironmentVariable("AWS_SECRETKEY");
        var bucketName = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME");
        
        // Upload to AWS S3
        using (var s3Client = new AmazonS3Client( accessKey, secretKey, RegionEndpoint.EUCentral1))
        {
            var request = new PutObjectRequest
            {
                BucketName = bucketName,
                Key = $"bookCoverImages/{DateTime.Now.Ticks}_{file.Name}",
                InputStream = file.OpenReadStream(),
                ContentType = file.ContentType,
                CannedACL = S3CannedACL.PublicRead
            };
    
            var response = await s3Client.PutObjectAsync(request);
            
            if (response.HttpStatusCode == HttpStatusCode.OK)
            {
                var imageUrl = $"https://{bucketName}.s3.{RegionEndpoint.EUCentral1.SystemName}.amazonaws.com/{request.Key}";
                return Ok(new { S3Url = imageUrl });
            }
            else
            {
                return StatusCode(500, "Error uploading to S3");
            }
        }
    }
    
    private bool IsImage(IFormFile file)
    {
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tif", ".tiff", ".webp", ".svg" };
        
        var fileExtension = Path.GetExtension(file.FileName)?.ToLowerInvariant();
        
        return allowedExtensions.Contains(fileExtension);
    }


}
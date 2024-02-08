using System.Net;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet("User/List")]
    public async Task<ActionResult<IEnumerable<IdentityUser>>> GetAll()
    {
        try
        {
            var identityUsers = await _userService.GetAllUser();
            return Ok(identityUsers);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetAll: {ex.Message}");
            
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    [HttpGet("Details/List")]
    public async Task<ActionResult<IEnumerable<IdentityUser>>> GetAllDetails()
    {
        try
        {
            var userDetails = await _userService.GetAllUserDetails();
            return Ok(userDetails);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetAllDetails: {ex.Message}");
            
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    [HttpPost("AddDetails")]
    public async Task<ActionResult<UserDetails>> AddUserDetails([FromBody] UserDetailsRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (request.City == null && request.ProfileImage == null)
        {
            return BadRequest("At least one of City or ProfileImage must be non-null!");
        }

        var userDetails = await _userService.CreateUserDetails(request);
        
        if (userDetails == null)
        {
            return BadRequest("Cannot create UserDetails");
        }
        
        var assignedUserDetails = await _userService.AssignUserDetails(request.UserId, request.City, request.ProfileImage);

        if (assignedUserDetails != null)
        {
            return Ok(assignedUserDetails);
        }

        return NotFound("User not found");
    }
    
    [HttpPost("UpdateData")]
    public async Task<ActionResult<UserDetails>> UpdateUserData([FromBody] UpdateDataRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userService.UpdateUserData(request.UserId, request.NewEmail, request.NewUsername, request.NewPhoneNumber);

        if (user != null)
        {
            return Ok(user);
        }

        return NotFound("User not found");
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDetails>> GetUser(string id)
    {
        try
        {
            var user = await _userService.GetUserById(id);
        
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetUser: {ex.Message}");
        
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    [HttpGet("Details/{userId}")]
    public async Task<ActionResult<UserDetails?>> GetUserDetails(string userId)
    {
            var details = await _userService.GetDetailsByUserId(userId);
        
            if (details == null)
            {
                return Ok(null);
            }

            return Ok(details);
    }
    
    [HttpPost("AddBookPost")]
    public async Task<ActionResult<UserDetails>> AddBookPost([FromBody] AddBookPostRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
    
        try
        {
            await _userService.AddBookPost(request.UserId, request.PostId);
            
            return Ok("Book post added successfully");
            
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
        
    }
    
    [HttpPost("Upload")]
    public async Task<IActionResult> AddProfileImage(IFormFile file)
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
                Key = $"userProfileImages/{DateTime.Now.Ticks}_{file.Name}",
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
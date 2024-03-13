using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Services.Like;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BookSwap.Controllers;

[ApiController]
[Route("api/[controller]")]

public class LikeController : ControllerBase
{
    private readonly ILogger<LikeController> _logger;
    private readonly ILikeService _likeService;

    public LikeController(ILikeService likeService, ILogger<LikeController> logger)
    {
        _logger = logger;
        _likeService = likeService;
    }

    [HttpPost("Add")]
    public async Task<IActionResult> AddLike([FromBody] LikeRequest request)
    {
        _logger.LogInformation($"Recieved data: , {request.UserId}, {request.PostId}");
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdLike = await _likeService.CreateLike(request);
            _logger.LogInformation($"createdLike: , {createdLike}");
            if (createdLike == null)
            {
                return BadRequest("Error creating like.");
            }

            return CreatedAtAction(nameof(AddLike), new { id = createdLike.PostId }, createdLike.PostId);
        }
    }
    
    // Find Likers for a specific BookPost
    [HttpGet("{postId:guid}")]
    public async Task<ActionResult<IEnumerable<string?>>> GetLikers(Guid postId)
    {
        try
        {
            var userIds = await _likeService.GetLikes(postId);

            return Ok(userIds);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
    
}
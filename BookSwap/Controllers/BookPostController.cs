using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Repositories;
using BookSwap.Services;
using BookSwap.Services.Like;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookPostController : ControllerBase
{
    private readonly IBookService _bookService;
    private readonly ILikeService _likeService;

    public BookPostController(IBookService bookService, ILikeService likeService)
    {
        _bookService = bookService;
        _likeService = likeService;
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
    
    [HttpPost("Like")]
    public async Task<ActionResult<Guid>> AddLike([FromBody] LikeRequest request)
    {
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdLike = await _likeService.CreateLike(request);

            if (createdLike == null)
            {
                return BadRequest("Error creating like.");
            }

            return CreatedAtAction(nameof(AddLike), new { id = createdLike.LikerId }, createdLike.PostId);
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
}
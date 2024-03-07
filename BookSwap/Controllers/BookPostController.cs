using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Repositories;
using BookSwap.Services;
using BookSwap.Services.Book;
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

    // Update main User data
    [HttpPost("Update")]
    public async Task<ActionResult<ApplicationUser>> UpdateBookPost([FromBody] UpdatePostRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Retrieve the existing BookPost from the database
        var bookPost = await _bookService.GetByPostId(request.PostId);

        if (bookPost == null)
        {
            return NotFound();
        }

        // Merge the data from the DTO with the existing data
        bookPost.Title = request.Title;
        bookPost.Author = request.Author;
        bookPost.Category = request.Category;
        bookPost.Description = request.Description;
        bookPost.Language = request.Language;
        bookPost.PageCount = request.PageCount;
        bookPost.CoverImage = request.CoverImage;
        

        // Update the BookPost in the database
        var updatedPost = await _bookService.UpdatePost(bookPost);

        if (updatedPost != null)
        {
            return Ok(updatedPost);
        }

        return NotFound("Post not found");
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
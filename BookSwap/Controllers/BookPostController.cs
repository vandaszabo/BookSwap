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
}
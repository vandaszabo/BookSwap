using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Controllers;

[ApiController]
[Route("[controller]")]
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
}
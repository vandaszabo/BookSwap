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
    public async Task<ActionResult<BookPost>> CreatePost([FromBody] BookPostRequest request)
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
            
            return Ok(createdBookPost);

        }
    }
}
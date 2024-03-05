using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Services;
using BookSwap.Services.User;
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

    // List all user
    [HttpGet("List")]
    public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetAll()
    {
        try
        {
            var identityUsers = await _userService.GetAllUser();
            return Ok(identityUsers);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
    
    // List all user locations
    [HttpGet("Location/List")]
    public async Task<ActionResult<IEnumerable<string>>> GetAllLocations()
    {
        try
        {
            var cityList = await _userService.GetAllUserLocations();
            return Ok(cityList);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    // Update main User data
    [HttpPost("UpdateData")]
    public async Task<ActionResult<ApplicationUser>> UpdateUserData([FromBody] UpdateDataRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userService.UpdateUserData(request);

        if (user != null)
        {
            return Ok(user);
        }

        return NotFound("User not found");
    }

    // Find User by Id
    [HttpGet("{id}")]
    public async Task<ActionResult<ApplicationUser>> GetUser(string id)
    {
        try
        {
            var user = await _userService.GetUserById(id);

            if (user == null) return NotFound($"No user found with this id: {id}");

            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
    
    // Delete User by Id
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<string>> DeleteUser(string id)
    {
        try
        {
            var deletedUserEmail = await _userService.DeleteUser(id);

            if (deletedUserEmail == null) return NotFound($"No user found with this id: {id}");

            return Ok(deletedUserEmail);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    // Add New Post to User object
    [HttpPost("AddBookPost")]
    public async Task<ActionResult<ApplicationUser>> AddBookPost([FromBody] AddBookPostRequest request)
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
}
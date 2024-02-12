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

        var assignedUserDetails =
            await _userService.AssignUserDetails(request.UserId, request.City, request.ProfileImage);

        if (assignedUserDetails != null)
        {
            return Ok(assignedUserDetails);
        }

        return NotFound("User not found");
    }

    // Update main User data
    [HttpPost("UpdateData")]
    public async Task<ActionResult<UserDetails>> UpdateUserData([FromBody] UpdateDataRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userService.UpdateUserData(request.UserId, request.NewEmail, request.NewUsername,
            request.NewPhoneNumber);

        if (user != null)
        {
            return Ok(user);
        }

        return NotFound("User not found");
    }

    // Find User by Id
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

    // Find Details for selected User
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

    // Add New Post to UserDetails object
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

}
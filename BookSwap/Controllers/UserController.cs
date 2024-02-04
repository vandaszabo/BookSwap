using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Services;
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
            var details = await _userService.GetDetailsById(userId);
        
            if (details == null)
            {
                return Ok(null);
            }

            return Ok(details);
    }
}
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

        if (request.NewEmail == null && request.NewUsername == null && request.NewPhoneNumber == null)
        {
            return BadRequest("At least one of Email, Username or Phone number must be non-null!");
        }

        var user = await _userService.UpdateUserData(request.UserId, request.NewEmail, request.NewUsername, request.NewPhoneNumber);

        if (user != null)
        {
            return Ok(user);
        }

        return NotFound("User not found");
    }
}
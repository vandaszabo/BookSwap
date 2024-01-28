using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpPost("Details")]
    public async Task<ActionResult<UserDetails>> CreateUserDetails([FromBody] UserDetailsRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (request.City == null && request.ProfileImage == null)
        {
            return BadRequest("At least one of City or ProfileImage must be non-null!");
        }

        var userDetails = await _userService.AssignUserDetails(request.UserId, request.City, request.ProfileImage);

        if (userDetails != null)
        {
            return Ok(userDetails);
        }

        return NotFound("User not found");
    }
}
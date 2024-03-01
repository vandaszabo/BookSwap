using BookSwap.Contracts;
using BookSwap.Services;
using BookSwap.Services.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authenticationService;

    public AuthController(IAuthService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost("Register")]
    public async Task<ActionResult<RegistrationResponse>> Register([FromBody] RegistrationRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _authenticationService.RegisterAsync(request.Email, request.Username, request.Password, "User");

        if (!result.Success)
        {
            AddErrors(result);
            return BadRequest(ModelState);
        }
        return CreatedAtAction(nameof(Register), new RegistrationResponse(result.User.Id, result.User.Email, result.User.UserName));
    }

    private void AddErrors(AuthResult result)
    {
        foreach (var error in result.ErrorMessages)
        {
            ModelState.AddModelError(error.Key, error.Value);
        }
    }
    
    [HttpPost("Login")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LoginResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
    public async Task<ActionResult<LoginResponse>> Authenticate([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _authenticationService.LoginAsync(request.Email, request.Password);

        if (!result.Success)
        {
            AddErrors(result);
            return BadRequest(ModelState);
        }

        if (result.User == null)
        {
            return NotFound(ModelState);
        }
        
        return Ok(new LoginResponse(result.User, result.Token));
    }

}
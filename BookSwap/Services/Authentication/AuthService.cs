using BookSwap.Models;
using Microsoft.AspNetCore.Identity;

namespace BookSwap.Services.Authentication;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;

    public AuthService(UserManager<ApplicationUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<AuthResult> RegisterAsync(string email, string username, string password, string role)
    {
        var user = new ApplicationUser { UserName = username, Email = email };
        var result = await _userManager.CreateAsync(user, password);

        if (!result.Succeeded)
        {
            return FailedRegistration(result, email, username);
        }

        await SetRole(user.UserName, role);

        return new AuthResult(true, user,"");
    }

    private static AuthResult FailedRegistration(IdentityResult result, string email, string username)
    {
        var authResult = new AuthResult(false, null, "");

        foreach (var error in result.Errors)
        {
            authResult.ErrorMessages.Add(error.Code, error.Description);
        }

        return authResult;
    }

    public async Task<AuthResult> LoginAsync(string email, string password)
    {
        var managedUser = await _userManager.FindByEmailAsync(email);

        if (managedUser == null)
        {
            return InvalidEmail(email);
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, password);
        if (!isPasswordValid)
        {
            if (managedUser is { Email: not null, UserName: not null })
            {
                return InvalidPassword(managedUser.Email, managedUser.UserName);
            }
        }

        var roles = await _userManager.GetRolesAsync(managedUser);
        var accessToken = _tokenService.CreateToken(managedUser, roles.Last());

        return new AuthResult(true, managedUser, accessToken);
    }

    private static AuthResult InvalidUsername(string username)
    {
        var result = new AuthResult(false, null,"");
        result.ErrorMessages.Add("Bad credentials", "Invalid username");
        return result;
    }

    private static AuthResult InvalidEmail(string email)
    {
        var result = new AuthResult(false,null, "");
        result.ErrorMessages.Add("Bad credentials", "Invalid email");
        return result;
    }
    private static AuthResult InvalidPassword(string email, string userName)
    {
        var result = new AuthResult(false, null, "");
        result.ErrorMessages.Add("Bad credentials", "Invalid password");
        return result;
    }
    
    public async Task<AuthResult> SetRole(string username, string role)
    {
        var managedUser = await _userManager.FindByNameAsync(username);
        if (managedUser == null)
        {
            return InvalidUsername(username);
        }
        var roles = await _userManager.GetRolesAsync(managedUser);
        await _userManager.RemoveFromRolesAsync(managedUser, roles);
        await _userManager.AddToRoleAsync(managedUser, role);

        return new AuthResult(true, managedUser, "");
    }
}
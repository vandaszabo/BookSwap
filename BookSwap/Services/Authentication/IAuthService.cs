using BookSwap.Services.Authentication;

namespace BookSwap.Services;

public interface IAuthService
{
    Task<AuthResult> RegisterAsync(string email, string username, string password, string role);
    Task<AuthResult> LoginAsync(string username, string password);
}
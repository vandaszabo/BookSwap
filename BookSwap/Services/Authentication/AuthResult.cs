using BookSwap.Models;

namespace BookSwap.Services.Authentication;

public record AuthResult(
    bool Success,
    ApplicationUser? User,
    string Token)
{
    //Error code - error message
    public readonly Dictionary<string, string> ErrorMessages = new();
}
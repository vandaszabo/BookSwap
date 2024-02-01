namespace BookSwap.Services.Authentication;

public record AuthResult(
    bool Success,
    string Id,
    string Email,
    string UserName,
    string PhoneNumber,
    string Token)
{
    //Error code - error message
    public readonly Dictionary<string, string> ErrorMessages = new();
}
namespace BookSwap.Contracts;

public record LoginResponse(string Id, string Email, string Username, string? PhoneNumber, string Token);
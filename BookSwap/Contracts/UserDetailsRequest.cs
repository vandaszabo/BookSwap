namespace BookSwap.Contracts;

public record UserDetailsRequest(string UserId, string? City, string? ProfileImage);
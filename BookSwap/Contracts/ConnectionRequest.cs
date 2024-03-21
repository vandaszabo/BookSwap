using BookSwap.Models;

namespace BookSwap.Contracts;

public record ConnectionRequest(string UserId, string? ConnectionId);
using BookSwap.Models;

namespace BookSwap.Contracts;

public record AddBookPostRequest(string UserId, Guid PostId);
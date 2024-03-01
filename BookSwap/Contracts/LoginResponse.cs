using BookSwap.Models;

namespace BookSwap.Contracts;

public record LoginResponse(ApplicationUser User, string Token);
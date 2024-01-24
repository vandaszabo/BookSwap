using BookSwap.Models;
using Microsoft.AspNetCore.Identity;

namespace BookSwap.Services.Authentication;

public interface ITokenService
{
    string CreateToken(ApplicationUser user, string? role);
}
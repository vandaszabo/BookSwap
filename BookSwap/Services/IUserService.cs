using BookSwap.Models;

namespace BookSwap.Services;

public interface IUserService
{
    Task<UserDetails?> AssignUserDetails(string userId, string city, string profileImage);
}
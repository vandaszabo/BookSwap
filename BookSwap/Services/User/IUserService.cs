using BookSwap.Contracts;
using BookSwap.Models;
using Microsoft.AspNetCore.Identity;

namespace BookSwap.Services;

public interface IUserService
{
    Task<IEnumerable<IdentityUser>> GetAllUser();
    Task<IdentityUser?> GetUserById(string userId);
    Task<IdentityUser?> UpdateUserData(string userId, string newEmail, string newUsername, string newPhoneNumber);
    Task<UserDetails?> GetDetailsByUserId(string id);
    Task<UserDetails?> CreateUserDetails(UserDetailsRequest request);
    Task<UserDetails?> UpdateUserDetails(UserDetailsRequest request);
    Task AddBookPost(string userId, Guid postId);
    Task<string?> DeleteUser(string userName);
}
using BookSwap.Contracts;
using BookSwap.Models;
using Microsoft.AspNetCore.Identity;

namespace BookSwap.Services;

public interface IUserService
{
    Task<IEnumerable<IdentityUser>> GetAllUser();
    Task<IdentityUser?> GetUserById(string userId);
    Task<IdentityUser?> GetUserByUsername(string username);
    Task<IdentityUser?> UpdateUserData(string userId, string newEmail, string newUsername, string newPhoneNumber);
    Task<string?> DeleteUser(string userName);
    Task<IList<string>> GetUserRoles(string userName);
    Task<string?> SetUserRole(string username, string role);
    Task<UserDetails?> AssignUserDetails(string userId, string city, string profileImage);
    Task<UserDetails?> CreateUserDetails(UserDetailsRequest request);
    Task<UserDetails?> GetDetailsById(string id);
}
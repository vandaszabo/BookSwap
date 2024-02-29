using BookSwap.Contracts;
using BookSwap.Models;

namespace BookSwap.Services;

public interface IUserService
{
    Task<IEnumerable<ApplicationUser>> GetAllUser();
    Task<ApplicationUser?> GetUserById(string userId);
    Task<ApplicationUser?> UpdateUserData(UpdateDataRequest request);
    //Task<ApplicationUser?> UpdateUserDetails(UserDetailsRequest request);
    Task AddBookPost(string userId, Guid postId);
    Task<string?> DeleteUser(string userId);
}
using BookSwap.Contracts;
using BookSwap.Models;

namespace BookSwap.Services.User;

public interface IUserService
{
    Task<IEnumerable<ApplicationUser>> GetAllUser();
    Task<List<string?>> GetAllUserLocations();
    Task<ApplicationUser?> GetUserById(string userId);
    Task<ApplicationUser?> UpdateUserData(UpdateDataRequest request);
    Task<string?> DeleteUser(string userId);
}
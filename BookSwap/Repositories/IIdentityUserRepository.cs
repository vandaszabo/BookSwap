using Microsoft.AspNetCore.Identity;

namespace BookSwap.Repositories;

public interface IIdentityUserRepository
{
    Task<IEnumerable<IdentityUser>> GetAll();
    Task<IdentityUser?> GetById(string userId);
    Task<IdentityUser?> GetByUsername(string username);
    Task UpdateUserEmail(string userId, string newEmail);
    Task UpdateUserName(string userId,string newUsername);
    Task<string?> DeleteUser(string userName);
    Task<IList<string>> GetRoles(string userName);
    Task<string?> SetRole(string username, string role);
}
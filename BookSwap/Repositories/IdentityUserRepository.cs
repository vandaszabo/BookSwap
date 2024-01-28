using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Repositories;

public class IdentityUserRepository : IIdentityUserRepository
{
    private readonly UserManager<IdentityUser> _userManager;
    
    public IdentityUserRepository(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }
    
    public async Task<IEnumerable<IdentityUser>> GetAll()
    {
        var users = await _userManager.Users.ToListAsync();
        return users;
    }

    public async Task<IdentityUser?> GetById(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        return user;
    }

    public async Task UpdateUserEmail(string userId, string newEmail)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user != null)
        {
            user.Email = newEmail;
            await _userManager.UpdateAsync(user);
        }
    }
    
    public async Task UpdateUserName(string userId, string newUsername)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user != null)
        {
            user.UserName = newUsername;
            await _userManager.UpdateAsync(user);
        }
    }

    public async Task<string?> DeleteUser(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        
        if (user == null)
        {
            return null;
        }

        await _userManager.DeleteAsync(user);
        
        return user.UserName;
    }
    
    public async Task<IList<string>> GetRoles(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);

        if (user == null)
        {
            return new List<string>();
        }
        
        var roles = await _userManager.GetRolesAsync(user);
        return roles;
    }
    
    public async Task<string?> SetRole(string userName, string role)
    {
        var user = await _userManager.FindByNameAsync(userName);
        
        if (user == null)
        {
            return null;
        }
        
        var existingRoles = await _userManager.GetRolesAsync(user);
        if (existingRoles.Any())
        {
            await _userManager.RemoveFromRolesAsync(user, existingRoles);
        }
        await _userManager.AddToRoleAsync(user, role);

        return user.UserName;
    }
}
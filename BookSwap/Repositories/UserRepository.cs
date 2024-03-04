using BookSwap.Data;
using BookSwap.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Repositories;

public class UserRepository : IUserRepository
{
    private readonly BookSwapDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserRepository(BookSwapDbContext dbContext, UserManager<ApplicationUser> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }
    
    public async Task<ApplicationUser?> GetById(string userId)
    {
        return await _userManager.FindByIdAsync(userId);
    }
    
    public async Task<IEnumerable<ApplicationUser>> GetAll()
    {
        return await _dbContext.AppUsers.ToListAsync();
    }
    
    public async Task AddBookPost(string userId, BookPost post)
    {
        var user = await GetById(userId);
        if (user != null)
        {
            user.BookPosts.Add(post);
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task UpdateUserNameAndEmail(ApplicationUser user, string newUserName, string newEmail)
    {
        user.Email = newEmail;
        user.UserName = newUserName;
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task UpdatePhoneNumber(ApplicationUser user, string newPhoneNumber)
    {
        user.PhoneNumber = newPhoneNumber;
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task UpdateCity(ApplicationUser user, string newCity)
    {
        user.City = newCity;
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task UpdateProfileImage(ApplicationUser user, string newProfileImage)
    {
        user.ProfileImage = newProfileImage;
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task<string?> Delete(ApplicationUser user)
    {
        await _userManager.DeleteAsync(user);
        return user.Email;
    }
    
    
}
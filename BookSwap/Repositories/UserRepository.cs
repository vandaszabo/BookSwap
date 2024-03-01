using BookSwap.Data;
using BookSwap.Models;
using Microsoft.AspNetCore.Identity;

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
    
    public async Task AddBookPost(string userId, BookPost post)
    {
        var user = await GetById(userId);
        if (user != null)
        {
            user.BookPosts.Add(post);
            await _dbContext.SaveChangesAsync();
        }
    }
    
    
}
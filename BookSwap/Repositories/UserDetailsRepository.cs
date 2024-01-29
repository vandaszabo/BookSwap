using BookSwap.Data;
using BookSwap.Models;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Repositories;

public class UserDetailsRepository : IUserDetailsRepository
{
    private readonly BookSwapDbContext _dbContext;
    
    public UserDetailsRepository(BookSwapDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UserDetails?> Create(UserDetails userDetails)
    {
        _dbContext.UserDetails.Add(userDetails);
        await _dbContext.SaveChangesAsync();
        return userDetails;
    }
    
    public async Task<UserDetails?> GetByUserId(string userId)
    {
        return await _dbContext.UserDetails.FirstOrDefaultAsync(ud => ud.UserId == userId);
    }

    public async Task UpdateUserCity(string userId, string? newCity)
    {
        var userDetail = await GetByUserId(userId);

        if (userDetail != null)
        {
            userDetail.City = newCity;
            await _dbContext.SaveChangesAsync();
        }
    }
    
    public async Task UpdateProfileImage(string userId, string? newProfileImage)
    {
        var userDetail = await GetByUserId(userId);

        if (userDetail != null)
        {
            userDetail.ProfileImage = newProfileImage;
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task AddBookPost(string userId, BookPost bookPost)
    {
        var userDetail = await GetByUserId(userId);
        if (userDetail != null)
        {
            userDetail.BookPosts.Add(bookPost);
            await _dbContext.SaveChangesAsync();
        }
    }
    
    public async Task<IEnumerable<BookPost>> GetBookPosts(string userId)
    {
        var userDetail = await GetByUserId(userId);
        return userDetail?.BookPosts ?? Enumerable.Empty<BookPost>();
    }
    
    public async Task DeleteBookPost(string userId, BookPost bookPost)
    {
        var userDetail = await GetByUserId(userId);
        if (userDetail != null)
        {
            userDetail.BookPosts.Remove(bookPost);
            await _dbContext.SaveChangesAsync();
        }
    }
}
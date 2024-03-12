using BookSwap.Data;
using BookSwap.Models;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Repositories;

public class BookPostRepository : IBookPostRepository
{
    private readonly BookSwapDbContext _dbContext;

    public BookPostRepository(BookSwapDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<IEnumerable<BookPost?>> GetAll()
    {
        return await _dbContext.BookPosts.ToListAsync();
    }
    
    public async Task<IEnumerable<BookPost?>> GetAllByLocation(string userId, string location)
    {
        return await _dbContext.BookPosts.Where(bp =>
            bp.UserId != userId && 
            bp.User.City.ToLower() == location.ToLower())
            .ToListAsync();
    }
    
    public async Task<BookPost?> GetById(Guid postId)
    {
        return await _dbContext.BookPosts.FirstOrDefaultAsync(bp => bp.PostId == postId);
    }

    public async Task<BookPost?> Create(BookPost bookPost)
    {
        try
        {
            _dbContext.BookPosts.Add(bookPost);
            await _dbContext.SaveChangesAsync();
            return bookPost;
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public async Task<BookPost?> Update(BookPost bookPost)
    {
        _dbContext.BookPosts.Update(bookPost);
        await _dbContext.SaveChangesAsync();
        
        return await GetById(bookPost.PostId);
    }

    public async Task<BookPost?> Delete(Guid postId)
    {
        try
        {
            var postToDelete = await GetById(postId);

            if (postToDelete == null)
            {
                return null;
            }

            _dbContext.BookPosts.Remove(postToDelete);
            await _dbContext.SaveChangesAsync();
            return postToDelete;
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public async Task<IEnumerable<BookPost?>?> GetAllFromUser(string userId)
    {
        try
        {
            var posts = await _dbContext.BookPosts
                .Where(bp => bp.UserId == userId)
                .ToListAsync();

            return posts;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
    
}
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

    public async Task<BookPost?> GetById(Guid postId)
    {
        return await _dbContext.BookPosts.FirstOrDefaultAsync(bp => bp.PostId == postId);
    }

    public async Task<BookPost> Create(BookPost bookPost)
    {
        _dbContext.BookPosts.Add(bookPost);
        await _dbContext.SaveChangesAsync();
        return bookPost;
    }

    public async Task Update(BookPost bookPost)
    {
        _dbContext.BookPosts.Update(bookPost);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Delete(Guid postId)
    {
        var postToDelete = await GetById(postId);
        if (postToDelete != null)
        {
            _dbContext.BookPosts.Remove(postToDelete);
            await _dbContext.SaveChangesAsync();
        }
    }
}
using BookSwap.Contracts;
using BookSwap.Data;
using BookSwap.Models;

namespace BookSwap.Repositories;

public class LikeRepository : ILikeRepository
{
    private readonly BookSwapDbContext _dbContext;
    
    public LikeRepository(BookSwapDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<Like?> Create(Like like)
    {
        try
        {
            _dbContext.Likes.Add(like);
            await _dbContext.SaveChangesAsync();
            return like;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
}
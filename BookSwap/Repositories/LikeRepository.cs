using BookSwap.Contracts;
using BookSwap.Data;
using BookSwap.Models;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Repositories;

public class LikeRepository : ILikeRepository
{
    private readonly BookSwapDbContext _dbContext;
    
    public LikeRepository(BookSwapDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<IEnumerable<string?>> GetAllByPostId(Guid postId)
    {
        var likes = await _dbContext.Likes.Where(l => l.PostId == postId).ToListAsync();
        return likes.Select(l => l.LikerId).ToList();
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
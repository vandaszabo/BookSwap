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
    
    public async Task<IEnumerable<Guid>> GetAllByUserId(string userId)
    {
        var likes = await _dbContext.Likes.Where(l => l.LikerId == userId).ToListAsync();
        return likes.Select(l => l.PostId).ToList();
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
    
    public async Task<Like?> Remove(Like like)
    {
        try
        {
            _dbContext.Likes.Remove(like);
            await _dbContext.SaveChangesAsync();
            return like;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
    
    public async Task<Like?> GetByIds(string userId, Guid postId)
    {
        return await _dbContext.Likes.FirstOrDefaultAsync(l => l.PostId == postId && l.LikerId == userId);
    }
    
    public async Task<Guid?> GetMostLiked()
    {
        var likesGrouped = await _dbContext.Likes
            .GroupBy(l => l.PostId)
            .ToListAsync();

        var mostLikedGroup = likesGrouped.MaxBy(g => g.Count());

        return mostLikedGroup?.Key;

    }
}
using BookSwap.Models;

namespace BookSwap.Repositories;

public interface ILikeRepository
{
    Task<IEnumerable<string?>> GetAllByPostId(Guid postId);
    Task<IEnumerable<Guid>> GetAllByUserId(string userId);
    Task<Like?> Create(Like like);
}
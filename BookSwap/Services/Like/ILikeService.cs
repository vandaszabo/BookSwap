using BookSwap.Contracts;

namespace BookSwap.Services.Like;

public interface ILikeService
{
    Task<IEnumerable<string?>> GetLikes(Guid postId);
    Task<Models.Like?> CreateLike(LikeRequest request);
}
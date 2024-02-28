using BookSwap.Contracts;

namespace BookSwap.Services.Like;

public interface ILikeService
{
    Task<Models.Like?> CreateLike(LikeRequest request);
}
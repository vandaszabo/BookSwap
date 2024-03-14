using BookSwap.Contracts;
using BookSwap.Models;

namespace BookSwap.Services.Like;

public interface ILikeService
{
    Task<IEnumerable<string?>> GetLikes(Guid postId);
    Task<IEnumerable<BookPostDto?>> GetPosts(string userId);
    Task<Models.Like?> CreateLike(LikeRequest request);
    Task<Models.Like?> Delete(LikeRequest request);
}
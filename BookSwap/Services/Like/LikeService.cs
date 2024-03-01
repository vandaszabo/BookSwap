using BookSwap.Contracts;
using BookSwap.Repositories;

namespace BookSwap.Services.Like;

public class LikeService : ILikeService
{
    private readonly ILikeRepository _likeRepository;
    private readonly IBookPostRepository _bookPostRepository;

    public LikeService(ILikeRepository likeRepository, IBookPostRepository bookPostRepository)
    {
        _likeRepository = likeRepository;
        _bookPostRepository = bookPostRepository;
    }
    
    public async Task<Models.Like?> CreateLike(LikeRequest request)
    {
        var likerId = request.UserId;
        var bookPost = await _bookPostRepository.GetById(request.PostId);

        if (bookPost == null)
        {
            return null;
        }
        
        var newLike = new Models.Like
        {
            LikerId= likerId,
            PostId = request.PostId,
            Post = bookPost
        };

        return await _likeRepository.Create(newLike);
    }
}
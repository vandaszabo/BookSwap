using BookSwap.Contracts;
using BookSwap.Repositories;

namespace BookSwap.Services.Like;

public class LikeService : ILikeService
{
    private readonly ILikeRepository _likeRepository;
    private readonly IBookPostRepository _bookPostRepository;
    private readonly IUserRepository _userRepository;

    public LikeService(ILikeRepository likeRepository, IBookPostRepository bookPostRepository, IUserRepository userRepository)
    {
        _likeRepository = likeRepository;
        _bookPostRepository = bookPostRepository;
        _userRepository = userRepository;
    }
    
    public async Task<Models.Like?> CreateLike(LikeRequest request)
    {
        var user = await _userRepository.GetById(request.UserId);
        var bookPost = await _bookPostRepository.GetById(request.PostId);

        if (bookPost == null || user == null)
        {
            return null;
        }
        
        var newLike = new Models.Like
        {
            LikerId= request.UserId,
            Liker = user,
            PostId = request.PostId,
            Post = bookPost
        };

        return await _likeRepository.Create(newLike);
    }

    public async Task<IEnumerable<string?>> GetLikes(Guid postId)
    {
        return await _likeRepository.GetAllByPostId(postId);
    }
}
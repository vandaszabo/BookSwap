using BookSwap.Contracts;
using BookSwap.Repositories;

namespace BookSwap.Services.Like;

public class LikeService : ILikeService
{
    private ILikeRepository _likeRepository;
    private readonly IUserDetailsRepository _userDetailsRepository;
    private readonly IBookPostRepository _bookPostRepository;

    public LikeService(ILikeRepository likeRepository, IUserDetailsRepository userDetailsRepository, IBookPostRepository bookPostRepository)
    {
        _likeRepository = likeRepository;
        _userDetailsRepository = userDetailsRepository;
        _bookPostRepository = bookPostRepository;
    }
    
    public async Task<Models.Like?> CreateLike(LikeRequest request)
    {
        var likerId = Guid.Parse(request.UserId);
        var likerDetails = await _userDetailsRepository.GetByUserId(request.UserId.ToString());
        var bookPost = await _bookPostRepository.GetById(request.PostId);

        if (bookPost == null)
        {
            return null;
        }
        var ownerId = Guid.Parse(bookPost.UserId);
        var ownerDetails = bookPost.UserDetails;
        
        var newLike = new Models.Like
        {
            LikerId= likerId,
            OwnerId = ownerId,
            PostId = request.PostId,
            Liker = likerDetails,
            Owner = ownerDetails,
            Post = bookPost
        };

        return await _likeRepository.Create(newLike);
    }
}
using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Repositories;

namespace BookSwap.Services;

public class BookService : IBookService
{
    private readonly IUserDetailsRepository _userDetailsRepository;
    private readonly IBookPostRepository _bookPostRepository;
    private readonly IUserService _userService;

    public BookService(IUserDetailsRepository userDetailsRepository, IBookPostRepository bookPostRepository, IUserService userService)
    {
        _userDetailsRepository = userDetailsRepository;
        _bookPostRepository = bookPostRepository;
        _userService = userService;
    }
    
    public async Task<BookPost?> CreateBookPost(BookPostRequest request)
    {
        var user = await _userService.GetUserById(request.UserId);
        var userDetails = await _userDetailsRepository.GetByUserId(request.UserId);

        if (user == null)
        {
            return null;
        }
        
        var newPost = new BookPost
        {
            Title = request.Title,
            Author = request.Author,
            Description = request.Description,
            PageCount = request.PageCount,
            Category = request.Category,
            Language = request.Language,
            CoverImage = request.CoverImage,
            UserId = request.UserId,
            User = user,
            UserDetailsId = userDetails?.Id,
            UserDetails = userDetails
        };

        return await _bookPostRepository.Create(newPost);
    }

    public async Task<IEnumerable<BookPost?>> GetAll()
    {
       return await _bookPostRepository.GetAll();
    }

    public async Task<BookPost?> GetByPostId(Guid postId)
    {
        return await _bookPostRepository.GetById(postId);
    }
}
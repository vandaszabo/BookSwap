using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Repositories;
using BookSwap.Services.User;

namespace BookSwap.Services.Book;

public class BookService : IBookService
{
    private readonly IBookPostRepository _bookPostRepository;
    private readonly IUserService _userService;

    public BookService( IBookPostRepository bookPostRepository, IUserService userService)
    {
        _bookPostRepository = bookPostRepository;
        _userService = userService;
    }
    
    public async Task<BookPost?> CreateBookPost(BookPostRequest request)
    {
        var user = await _userService.GetUserById(request.UserId);

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
    
    public async Task<BookPost?> DeletePost(Guid postId)
    {
        return await _bookPostRepository.Delete(postId);
    }

    public async Task<IEnumerable<BookPost?>?> GetUserPosts(string userId)
    {
        return await _bookPostRepository.GetAllFromUser(userId);
    }
}
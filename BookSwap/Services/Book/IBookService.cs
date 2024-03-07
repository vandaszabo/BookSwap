using BookSwap.Contracts;
using BookSwap.Models;

namespace BookSwap.Services.Book;

public interface IBookService
{
    Task<BookPost?> CreateBookPost(BookPostRequest request);
    Task<IEnumerable<BookPost?>> GetAll();
    Task<BookPost?> GetByPostId(Guid postId);
    Task<BookPost?> DeletePost(Guid postId);
    Task<IEnumerable<BookPost?>?> GetUserPosts(string userId);
    Task<BookPost?> UpdatePost(BookPost bookPost);
}
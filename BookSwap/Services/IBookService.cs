using BookSwap.Contracts;
using BookSwap.Models;

namespace BookSwap.Services;

public interface IBookService
{
    Task<BookPost?> CreateBookPost(BookPostRequest request);
    Task<IEnumerable<BookPost?>> GetAll();
    Task<BookPost?> GetByPostId(Guid postId);
}
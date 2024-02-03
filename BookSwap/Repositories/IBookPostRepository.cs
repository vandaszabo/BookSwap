using BookSwap.Models;

namespace BookSwap.Repositories;

public interface IBookPostRepository
{
    Task<IEnumerable<BookPost?>> GetAll();
    Task<BookPost?> GetById(Guid postId);
    Task<BookPost?> Create(BookPost bookPost);
    Task Update(BookPost bookPost);
    Task<BookPost?> Delete(Guid postId);
}
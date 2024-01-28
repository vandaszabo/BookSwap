using BookSwap.Models;

namespace BookSwap.Repositories;

public interface IPostRepository
{
    Task<IEnumerable<BookPost?>> GetAll();
    Task<BookPost?> GetById(Guid postId);
    Task Create(BookPost bookPost);
    Task Update(BookPost bookPost);
    Task Delete(Guid postId);
}
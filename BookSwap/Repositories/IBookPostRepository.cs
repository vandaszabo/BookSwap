using BookSwap.Contracts;
using BookSwap.Models;

namespace BookSwap.Repositories;

public interface IBookPostRepository
{
    Task<IEnumerable<BookPost?>> GetAll();
    Task<BookPost?> GetById(Guid postId);
    Task<BookPostDto?> GetDtoById(Guid postId);
    Task<BookPost?> Create(BookPost bookPost);
    Task<BookPost?> Update(BookPost bookPost);
    Task<IEnumerable<BookPost?>> GetAllByLocation(string userId, string location);
    Task<BookPost?> Delete(Guid postId);
    Task<IEnumerable<BookPost?>?> GetAllFromUser(string userId);
}
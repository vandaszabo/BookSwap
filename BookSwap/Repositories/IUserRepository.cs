using BookSwap.Models;

namespace BookSwap.Repositories;

public interface IUserRepository
{
    Task<ApplicationUser?> GetById(string userId);
    Task AddBookPost(string userId, BookPost post);
}
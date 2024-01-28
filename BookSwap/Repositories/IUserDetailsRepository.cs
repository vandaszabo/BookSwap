using BookSwap.Models;

namespace BookSwap.Repositories;

public interface IUserDetailsRepository
{
    Task<UserDetails?> GetByUserId(string userId);
    Task UpdateUserCity(string userId, string newCity);
    Task UpdateProfileImage(string userId, string newProfileImage);
    Task AddBookPost(string userId, BookPost bookPost);
    Task DeleteBookPost(string userId, BookPost bookPost);
}
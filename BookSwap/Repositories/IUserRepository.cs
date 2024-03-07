using BookSwap.Models;

namespace BookSwap.Repositories;

public interface IUserRepository
{
    Task<ApplicationUser?> GetById(string userId);
    Task<IEnumerable<ApplicationUser>> GetAll();
    Task<List<string?>> GetAllLocations();
    Task UpdateUserNameAndEmail(ApplicationUser user, string newUserName, string newEmail);
    Task UpdatePhoneNumber(ApplicationUser user, string newPhoneNumber);
    Task UpdateCity(ApplicationUser user, string newCity);
    Task UpdateProfileImage(ApplicationUser user, string newProfileImage);
    Task<string?> Delete(ApplicationUser user);
}
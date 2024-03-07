using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Repositories;

namespace BookSwap.Services.User;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IBookPostRepository _bookPostRepository;

    public UserService(IBookPostRepository bookPostRepository, IUserRepository userRepository)
    {
        _bookPostRepository = bookPostRepository;
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<ApplicationUser>> GetAllUser()
    {
        return await _userRepository.GetAll();
    }

    public async Task<List<string?>> GetAllUserLocations()
    {
        return await _userRepository.GetAllLocations();
    }

    public async Task<ApplicationUser?> GetUserById(string userId)
    {
        return await _userRepository.GetById(userId);
    }

    public async Task<ApplicationUser?> UpdateUserData(UpdateDataRequest request)
    {
        var user = await _userRepository.GetById(request.UserId);

        if (user == null)
        {
            return null;
        }

        await _userRepository.UpdateUserNameAndEmail(user, request.NewUsername, request.NewEmail);
        
        if (request.NewPhoneNumber != null)
        {
            await _userRepository.UpdatePhoneNumber(user, request.NewPhoneNumber);
        }
        
        if (request.NewCity != null)
        {
            await _userRepository.UpdateCity(user, request.NewCity);
        }
        
        if (request.NewProfileImage != null)
        {
            await _userRepository.UpdateProfileImage(user, request.NewProfileImage);
        }
        
        var updatedUser = await _userRepository.GetById(request.UserId);
        return updatedUser;
        
    }


    public async Task<string?> DeleteUser(string userId)
    {
        var user = await _userRepository.GetById(userId);

        if (user == null)
        {
            return null;
        }

        return await _userRepository.Delete(user);
    }
}
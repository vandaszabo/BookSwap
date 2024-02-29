using BookSwap.Contracts;
using BookSwap.Data;
using BookSwap.Models;
using BookSwap.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Services;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserRepository _userRepository;
    private readonly IBookPostRepository _bookPostRepository;
    private readonly BookSwapDbContext _dbContext;

    public UserService(UserManager<ApplicationUser> userManager, BookSwapDbContext dbContext, IBookPostRepository bookPostRepository, IUserRepository userRepository)
    {
        _userManager = userManager;
        _bookPostRepository = bookPostRepository;
        _userRepository = userRepository;
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<ApplicationUser>> GetAllUser()
    {
        var users = await _dbContext.AppUsers.ToListAsync();
        return users;
    }

    public async Task<ApplicationUser?> GetUserById(string userId)
    {
        var user = await _userRepository.GetById(userId);
        return user;
    }

    public async Task<ApplicationUser?> UpdateUserData(UpdateDataRequest request)
    {
        var user = await _userRepository.GetById(request.UserId);

        if (user == null)
        {
            return null;
        }

        user.Email = request.NewEmail;
        user.UserName = request.NewUsername;
        await _dbContext.SaveChangesAsync();
        
        
        if (request.NewPhoneNumber != null)
        {
            user.PhoneNumber = request.NewPhoneNumber;
            await _dbContext.SaveChangesAsync();
        }
        
        if (request.NewCity != null)
        {
            user.City = request.NewCity;
            await _dbContext.SaveChangesAsync();
        }

        if (request.NewProfileImage != null)
        {
            user.ProfileImage = request.NewProfileImage;
            await _dbContext.SaveChangesAsync();
        }

        var updatedUser = await _userRepository.GetById(request.UserId);
        return updatedUser;
    }

    public async Task<string?> DeleteUser(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return null;
        }

        await _userManager.DeleteAsync(user);

        return user.UserName;
    }

    public async Task AddBookPost(string userId, Guid postId)
    {
        var bookPost = await _bookPostRepository.GetById(postId);
        if (bookPost != null)
        {
            await _userRepository.AddBookPost(userId, bookPost);
        }
    }
}
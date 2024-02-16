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
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IUserDetailsRepository _userDetailsRepository;
    private readonly IBookPostRepository _bookPostRepository;
    private readonly BookSwapDbContext _dbContext;

    public UserService(UserManager<IdentityUser> userManager, BookSwapDbContext dbContext,
        IUserDetailsRepository userDetailsRepository, IBookPostRepository bookPostRepository)
    {
        _userManager = userManager;
        _userDetailsRepository = userDetailsRepository;
        _bookPostRepository = bookPostRepository;
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<IdentityUser>> GetAllUser()
    {
        var users = await _userManager.Users.ToListAsync();
        return users;
    }

    public async Task<IdentityUser?> GetUserById(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        return user;
    }

    public async Task<IdentityUser?> UpdateUserData(string userId, string newEmail, string newUsername, string newPhoneNumber)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return null;
        }

        user.Email = newEmail;
        user.UserName = newUsername;
        user.PhoneNumber = newPhoneNumber;
        
        await _dbContext.SaveChangesAsync();
        return user;
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

    public async Task<UserDetails?> UpdateUserDetails(UserDetailsRequest request)
    {
        var details = await _userDetailsRepository.GetByUserId(request.UserId);
        
        if (details == null)
        {
            return null;
        }

        if (request.City != null)
        {
            await _userDetailsRepository.UpdateUserCity(request.UserId, request.City);
        }

        if (request.ProfileImage != null)
        {
            await _userDetailsRepository.UpdateProfileImage(request.UserId, request.ProfileImage);
        }
        
        var updatedDetails = await _userDetailsRepository.GetByUserId(request.UserId);
        return updatedDetails;

    }

    public async Task<UserDetails?> CreateUserDetails(UserDetailsRequest request)
    {
        var user = await GetUserById(request.UserId);

        if (user == null)
        {
            return null;
        }
        
        var newUserDetails = new UserDetails
        {
            City = request.City,
            ProfileImage = request.ProfileImage,
            UserId = user.Id,
            User = user,
        };

        return await _userDetailsRepository.Create(newUserDetails);
    }
    
    public async Task<UserDetails?> GetDetailsByUserId(string id)
    {
        var userDetail = await _userDetailsRepository.GetByUserId(id);

        return userDetail;
    }

    public async Task AddBookPost(string userId, Guid postId)
    {
        var bookPost = await _bookPostRepository.GetById(postId);
        if (bookPost != null)
        {
            await _userDetailsRepository.AddBookPost(userId, bookPost);
        }
    }
}
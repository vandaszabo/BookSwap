using BookSwap.Contracts;
using BookSwap.Data;
using BookSwap.Models;
using BookSwap.Repositories;
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
    
    public async Task<IEnumerable<UserDetails?>> GetAllUserDetails()
    {
        return await _userDetailsRepository.GetAll();
    }

    public async Task<IdentityUser?> GetUserById(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        return user;
    }

    public async Task<IdentityUser?> GetUserByUsername(string username)
    {
        var user = await _userManager.FindByNameAsync(username);
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

    public async Task<IList<string>> GetUserRoles(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);

        if (user == null)
        {
            return new List<string>();
        }

        var roles = await _userManager.GetRolesAsync(user);
        return roles;
    }

    public async Task<string?> SetUserRole(string userName, string role)
    {
        var user = await _userManager.FindByNameAsync(userName);

        if (user == null)
        {
            return null;
        }

        var existingRoles = await _userManager.GetRolesAsync(user);
        if (existingRoles.Any())
        {
            await _userManager.RemoveFromRolesAsync(user, existingRoles);
        }

        await _userManager.AddToRoleAsync(user, role);

        return user.UserName;
    }

    public async Task<UserDetails?> AssignUserDetails(string userId, string? city, string? profileImage)
    {
        var userToAssign = await GetUserById(userId);

        if (userToAssign == null)
        {
            return null;
        }

        var newDetailObj = new UserDetails { UserId = userToAssign.Id, City = city, ProfileImage = profileImage };
        _dbContext.UserDetails.Add(newDetailObj);
        return newDetailObj;
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
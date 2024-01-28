using BookSwap.Data;
using BookSwap.Models;
using BookSwap.Repositories;

namespace BookSwap.Services;

public class UserService : IUserService
{
    private readonly IIdentityUserRepository _identityUserRepository;
    private readonly BookSwapDbContext _dbContext;

    public UserService(IIdentityUserRepository identityUserRepository, IUserDetailsRepository userDetailsRepository, BookSwapDbContext dbContext)
    {
        _identityUserRepository = identityUserRepository;
        _dbContext = dbContext;
    }

    public async Task<UserDetails?> AssignUserDetails(string userId, string? city, string? profileImage)
    {
        var userToAssign = await _identityUserRepository.GetById(userId);

        if (userToAssign == null)
        {
            return null;
        }

        var newDetailObj = new UserDetails { UserId = userToAssign.Id, City = city, ProfileImage = profileImage };
        _dbContext.UserDetails.Add(newDetailObj);
        return newDetailObj;
    }
}
using BookSwap.Data;
using BookSwap.Models;
using BookSwap.Repositories.Book;
using BookSwap.Repositories.User;
using Microsoft.EntityFrameworkCore;

namespace BookSwapUnitTest;

public class CRUDTests
{
    private IBookPostRepository _bookPostRepository;
    private IUserRepository _userRepository;
    private BookSwapDbContext _dbContext;
    
    [OneTimeSetUp]
    public void OneTimeSetup()
    {
        Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Test");
        Environment.SetEnvironmentVariable("ASPNETCORE_ISSUERSIGNINGKEY", "PlaceholderSigningKey123");
        Environment.SetEnvironmentVariable("ASPNETCORE_VALIDAUDIENCE", "PlaceholderAudience");
        Environment.SetEnvironmentVariable("ASPNETCORE_VALIDISSUER", "PlaceholderIssuer");
        
        var options = new DbContextOptionsBuilder<BookSwapDbContext>()
            .UseInMemoryDatabase("TestDatabase")
            .Options;
        
        _dbContext = new BookSwapDbContext(options);
    }
    
    [SetUp]
    public void Setup()
    {
        _bookPostRepository = new BookPostRepository(_dbContext);
        _userRepository = new UserRepository(_dbContext);
    }

    [Test]
    public async Task BookPostRepositoryCrudTest()
    {
        var guid = new Guid();
        BookPost newBookPost = new BookPost
        {
            PostId = guid,
            Title = "title1",
            Author = "author1",
            Category = "cat1",
            CoverImage = "image1",
            PageCount = 123,
            Language = "hungarian",
            UserId = "userId1",
            Description = "description1",
            User = new ApplicationUser{Id="userId1", UserName = "User1", Email = "user1@email.com"}
        };
        var created = await _bookPostRepository.Create(newBookPost);
        var allPosts = await _bookPostRepository.GetAll();
        Assert.That(created, Is.Not.Null);
        Assert.That(allPosts.Count(), Is.EqualTo(1));
        Assert.That(created.Description, Is.EqualTo("description1"));
        
        newBookPost.Description = "description2";
        var updatedBookPost = await _bookPostRepository.Update(newBookPost);
        Assert.That(updatedBookPost?.Description, Is.EqualTo("description2"));

        var foundPost = await _bookPostRepository.GetById(created.PostId);
        Assert.That(foundPost, Is.Not.Null);
        
        var deleted = await _bookPostRepository.Delete(created.PostId);
        Assert.That(deleted, Is.Not.Null);
        
        var all = await _bookPostRepository.GetAll();
        Assert.That(all.Count(), Is.EqualTo(0));
    }
    
    [Test]
    public async Task UserRepositoryCrudTest()
    {
        ApplicationUser newUser = new ApplicationUser
        {
            Id = "user2Id",
            UserName = "User2", 
            Email = "user2@email.com",
            City = "Pécs",
            ProfileImage = "image2"
        };
        _dbContext.AppUsers.Add(newUser);
        await _dbContext.SaveChangesAsync();
        
        var foundUser = await _userRepository.GetById("user2Id");
        Assert.That(foundUser, Is.Not.Null);
        
        var allUser = await _userRepository.GetAll();
        Assert.That(allUser.Count(), Is.EqualTo(1));
        
        var newCity = "Budapest";
        await _userRepository.UpdateCity(newUser, newCity);
        var updatedUser = await _userRepository.GetById("user2Id");
        Assert.That(updatedUser.City, Is.EqualTo(newCity));

        var deletedUserEmail = await _userRepository.Delete(newUser);
        Assert.That(deletedUserEmail, Is.Not.Null);
        
        var all = await _userRepository.GetAll();
        Assert.That(all.Count(), Is.EqualTo(0));
        
    }
}
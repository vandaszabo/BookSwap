using BookSwap.Data;
using BookSwap.Models;
using BookSwap.Repositories;
using BookSwap.Repositories.Book;
using BookSwap.Repositories.Messages;
using BookSwap.Repositories.User;
using Microsoft.EntityFrameworkCore;

namespace BookSwapUnitTest;

public class CRUDTests
{
    private IBookPostRepository _bookPostRepository;
    private IUserRepository _userRepository;
    private ILikeRepository _likeRepository;
    private IMessageRepository _messageRepository;
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
        _likeRepository = new LikeRepository(_dbContext);
        _messageRepository = new MessageRepository(_dbContext);
    }

    [Test]
    public async Task BookPostRepositoryCrudTest()
    {
        var newUser = new ApplicationUser 
            { Id = "userId1", UserName = "User1", Email = "user1@email.com" };
        _dbContext.AppUsers.Add(newUser);
        await _dbContext.SaveChangesAsync();
        
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
            UserId = newUser.Id,
            Description = "description1",
            User = newUser
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
        
        _dbContext.AppUsers.Remove(newUser);
        await _dbContext.SaveChangesAsync();
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
    
    [Test]
    public async Task LikeRepositoryCrudTest()
    {
        ApplicationUser liker = new ApplicationUser
        {
            Id = "user2Id",
            UserName = "User2", 
            Email = "user2@email.com",
            City = "Pécs",
            ProfileImage = "image2"
        };
        ApplicationUser poster = new ApplicationUser
        {
            Id = "user3Id",
            UserName = "User3", 
            Email = "user3@email.com",
            City = "Győr",
            ProfileImage = "image3"
        };
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
            UserId = poster.Id,
            Description = "description1",
            User = poster
        };
        
        _dbContext.AppUsers.Add(liker);
        _dbContext.AppUsers.Add(poster);
        _dbContext.BookPosts.Add(newBookPost);
        await _dbContext.SaveChangesAsync();

        var newLike = new Like
        {
            Liker = liker,
            LikerId = liker.Id,
            Post = newBookPost,
            PostId = newBookPost.PostId
        };

        var createdLike = await _likeRepository.Create(newLike);
        Assert.That(createdLike, Is.Not.Null);

        var allLikes = await _likeRepository.GetAllByPostId(newBookPost.PostId);
        Assert.That(allLikes.Count(), Is.EqualTo(1));

        var removed = await _likeRepository.Remove(newLike);
        var all = await _likeRepository.GetAllByPostId(newBookPost.PostId);
        Assert.That(all.Count(), Is.EqualTo(0));

    }
    
    [Test]
    public async Task MessageRepositoryCrudTest()
    {
        ApplicationUser sender = new ApplicationUser
        {
            Id = "user2Id",
            UserName = "User2", 
            Email = "user2@email.com",
            City = "Pécs",
            ProfileImage = "image2"
        };
        ApplicationUser receiver = new ApplicationUser
        {
            Id = "user3Id",
            UserName = "User3", 
            Email = "user3@email.com",
            City = "Győr",
            ProfileImage = "image3"
        };
        
        _dbContext.AppUsers.Add(sender);
        _dbContext.AppUsers.Add(receiver);
        await _dbContext.SaveChangesAsync();
        var messageId = new Guid();

        var newMessage = new Message
        {
            MessageId = messageId,
            SenderId = sender.Id,
            ReceiverId = receiver.Id,
            MessageText = "helloWorld"
        };

        var createdMessage = await _messageRepository.Create(newMessage);
        Assert.That(createdMessage, Is.Not.Null);

        var allMessagesBySender = await _messageRepository.FindBySenderId(sender.Id);
        Assert.That(allMessagesBySender.Count(), Is.EqualTo(1));

    }
}
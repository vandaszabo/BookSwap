using BookSwap.Data;
using BookSwap.Repositories.Book;
using BookSwap.Repositories.User;
using BookSwap.Services.Book;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace BookSwapIntegrationTest;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    public IBookPostRepository _bookPostRepository;
    public IUserRepository _userRepository;
    public BookSwapDbContext _testBookSwapDbContext { get; }

    public CustomWebApplicationFactory()
    {
        var options = new DbContextOptionsBuilder<BookSwapDbContext>()
            .UseInMemoryDatabase("TestDatabase")
            .Options;
        _testBookSwapDbContext = new BookSwapDbContext(options);
        _bookPostRepository = new BookPostRepository(_testBookSwapDbContext);
        _userRepository = new UserRepository(_testBookSwapDbContext);
    }
    
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        base.ConfigureWebHost(builder);
        builder.ConfigureTestServices(services =>
        {
            services.AddDbContext<BookSwapDbContext>();
            services.AddTransient<IBookPostRepository, BookPostRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddSingleton<IPolicyEvaluator, FakePolicyEvaluator>();
        });

        builder.UseEnvironment("Test");
    }
}
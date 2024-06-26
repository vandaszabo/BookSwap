using System.Text;
using BookSwap.Data;
using BookSwap.Hubs;
using BookSwap.Models;
using BookSwap.Repositories;
using BookSwap.Repositories.Book;
using BookSwap.Repositories.Messages;
using BookSwap.Repositories.User;
using BookSwap.Services.Authentication;
using BookSwap.Services.Book;
using BookSwap.Services.File;
using BookSwap.Services.Like;
using BookSwap.Services.Messages;
using BookSwap.Services.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;


public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        var connectionString = Environment.GetEnvironmentVariable("ASPNETCORE_CONNECTIONSTRING");
        var frontendDomain = Environment.GetEnvironmentVariable("FRONTEND_DOMAIN");

        AddServices();
        ConfigureSwagger();
        AddDbContext();
        AddAuthentication();
        AddIdentity();
        builder.Services.AddSignalR();
        
        var app = builder.Build();

        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != "Testing")
        {
            AddRoles();
            AddAdmin();
        }


// Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        
        app.UseHttpsRedirection();

//Authentication and Authorization
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        
        //WebSocket
        app.MapHub<ChatHub>("/api/Chat");
        
        //Cors
        app.UseCors("reactApp");
        
        var webSocketOptions = new WebSocketOptions
        {
            KeepAliveInterval = TimeSpan.FromMinutes(2)
        };

        webSocketOptions.AllowedOrigins.Add(frontendDomain);
        
        app.UseWebSockets(webSocketOptions);
        
        //Run
        app.Run();

        void AddServices()
        {
            builder.Services.AddHttpClient();
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("reactApp",
                    builder =>
                    {
                        builder.WithOrigins(frontendDomain)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });

            builder.Services.AddScoped<IBookPostRepository, BookPostRepository>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<ILikeRepository, LikeRepository>();
            builder.Services.AddScoped<IMessageRepository, MessageRepository>();
            
            builder.Services.AddScoped<IBookService, BookService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IFileService, FileService>();
            builder.Services.AddScoped<ILikeService, LikeService>();
            builder.Services.AddScoped<IMessageService, MessageService>();
            
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ITokenService, TokenService>();
            
            builder.Services.AddLogging();

        }

//Configure Swagger
        void ConfigureSwagger()
        {
            builder.Services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });
            });
        }

//Add DbContext
        void AddDbContext()
        {
            builder.Services.AddDbContext<BookSwapDbContext>(options =>
            {
                if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Test")
                {
                    options.UseInMemoryDatabase("TestDatabase");
                }
                else
                {
                    options.UseNpgsql(connectionString);
                }
            });
        }

//Add authentication
        void AddAuthentication()
        {
            //This will add a JWT token authentication scheme to your API. This piece of code is required to validate a JWT.
            builder.Services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Environment.GetEnvironmentVariable("ASPNETCORE_VALIDISSUER"),
                        ValidAudience = Environment.GetEnvironmentVariable("ASPNETCORE_VALIDAUDIENCE"),
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("ASPNETCORE_ISSUERSIGNINGKEY") ??
                            throw new InvalidOperationException()))
                    };
                });
        }

//Add identity user
        void AddIdentity()
        {
            // User requirements
            builder.Services
                .AddIdentityCore<ApplicationUser>(options =>
                {
                    // Configure identity options for ApplicationUser
                    options.SignIn.RequireConfirmedAccount = false;
                    options.User.RequireUniqueEmail = true;
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 6;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;
                })
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<BookSwapDbContext>();
        }

//Add roles
        void AddRoles()
        {
            using var
                scope = app.Services
                    .CreateScope(); // RoleManager is a scoped service, therefore we need a scope instance to access it
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            var tAdmin = CreateAdminRole(roleManager);
            tAdmin.Wait();

            var tUser = CreateUserRole(roleManager);
            tUser.Wait();
        }

//Create roles
        async Task CreateAdminRole(RoleManager<IdentityRole> roleManager)
        {
            await roleManager.CreateAsync(
                new IdentityRole("Admin"));
        }

        async Task CreateUserRole(RoleManager<IdentityRole> roleManager)
        {
            await roleManager.CreateAsync(
                new IdentityRole("User"));
        }

        void AddAdmin()
        {
            var tAdmin = CreateAdminIfNotExists();
            tAdmin.Wait();
        }

//Create Admin if not exists
        async Task CreateAdminIfNotExists()
        {
            using var scope = app.Services.CreateScope();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var adminInDb = await userManager.FindByEmailAsync("admin@admin.com");

            if (adminInDb == null)
            {
                var admin = new ApplicationUser
                {
                    UserName = "someAdmin",
                    Email = "admin@admin.com",
                };
                var adminCreated = await userManager.CreateAsync(admin, "admin123");

                if (adminCreated.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }
        }
        
        

    }
}

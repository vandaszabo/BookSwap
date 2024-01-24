using System.Text;
using BookSwap.Data;
using BookSwap.Models;
using BookSwap.Services;
using BookSwap.Services.Authentication;
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
        

        AddServices();
        ConfigureSwagger();
        AddDbContext();
        AddAuthentication();
        AddIdentity();

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

// Add CORS middleware here
        app.UseCors(builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });

        app.UseHttpsRedirection();

//Authentication and Authorization
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();

        void AddServices()
        {
            builder.Services.AddHttpClient();
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            // builder.Services.AddScoped<IBookRepository, BookRepository>();
            // builder.Services.AddScoped<IBookService, BookService>();
            // builder.Services.AddScoped<IUserService, UserService>();
            
            // builder.Services.AddScoped<IDataProvider, GoogleBooksApi>();
            // builder.Services.AddScoped<IBookJsonProcessor, BookJsonProcessor>();

            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ITokenService, TokenService>();
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
            builder.Services.AddDbContext<BookDbContext>(options =>
            {
                if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Testing")
                {
                    options.UseInMemoryDatabase("SolarWatchTestDb");
                }
                else
                {
                    options.UseNpgsql(connectionString);
                }
            });

            builder.Services.AddDbContext<UserDbContext>(options =>
            { 
                options.UseNpgsql(connectionString);
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
                    // ... other options
                })
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<UserDbContext>();
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
                var admin = new ApplicationUser()
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
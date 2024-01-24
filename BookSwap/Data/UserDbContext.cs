using BookSwap.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Data;

public class UserDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
{
    public DbSet<ApplicationUser> AppUsers  { get; set; }

    public UserDbContext(DbContextOptions<UserDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<ApplicationUser>().ToTable("AspNetUsers");
    }
}

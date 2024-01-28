using BookSwap.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Data;

public class BookSwapDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<UserDetails> UserDetails { get; set; }
    public DbSet<BookPost> BookPosts { get; set; }

    public BookSwapDbContext(DbContextOptions<BookSwapDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<UserDetails>()
            .HasMany(e => e.BookPosts)
            .WithOne(e => e.UserDetails)
            .HasForeignKey(e => e.UserId)
            .IsRequired();
        
    }

}

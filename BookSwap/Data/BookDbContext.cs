using BookSwap.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Data;

public class BookSwapDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public DbSet<UserDetails> UserDetails { get; set; }
    public DbSet<BookPost> BookPosts { get; set; }

    public BookSwapDbContext(DbContextOptions<BookSwapDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<BookPost>()
            .HasOne(e => e.User)
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .IsRequired();

        modelBuilder.Entity<BookPost>()
            .HasOne(e => e.UserDetails)
            .WithMany(e => e.BookPosts)
            .HasForeignKey(e => e.UserDetailsId);
    }
}
using BookSwap.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Data;

public class BookSwapDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public DbSet<ApplicationUser> AppUsers { get; set; }
    public DbSet<BookPost> BookPosts { get; set; }
    public DbSet<Like> Likes { get; set; }
    public DbSet<Message> Messages { get; set; }
    
    public BookSwapDbContext(DbContextOptions<BookSwapDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<BookPost>()
            .HasOne(e => e.User)
            .WithMany(e => e.BookPosts)
            .HasForeignKey(e => e.UserId);
        
        modelBuilder.Entity<Like>()
            .HasKey(l => new { l.LikerId, l.PostId });

        modelBuilder.Entity<Like>()
            .HasOne(l => l.Liker)
            .WithMany()
            .HasForeignKey(l => l.LikerId);

        modelBuilder.Entity<Like>()
            .HasOne(l => l.Post)
            .WithMany(p => p.Likes)
            .HasForeignKey(l => l.PostId);
    }
}
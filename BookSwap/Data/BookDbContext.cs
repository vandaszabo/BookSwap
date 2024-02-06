using BookSwap.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Data;

public class BookSwapDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public DbSet<UserDetails> UserDetails { get; set; }
    public DbSet<BookPost> BookPosts { get; set; }
    
    public DbSet<Like> Likes { get; set; }

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
        
        modelBuilder.Entity<Like>()
            .HasKey(l => new { l.LikerId, l.OwnerId, l.PostId });

        modelBuilder.Entity<Like>()
            .HasOne(l => l.Liker)
            .WithMany(u => u.LikesReceived)
            .HasForeignKey(l => l.LikerId);

        modelBuilder.Entity<Like>()
            .HasOne(l => l.Owner)
            .WithMany() // Assuming that a user can own multiple posts
            .HasForeignKey(l => l.OwnerId); // Foreign key relationship to the UserDetails entity

        modelBuilder.Entity<Like>()
            .HasOne(l => l.Post)
            .WithMany(p => p.Likes)
            .HasForeignKey(l => l.PostId);
    }
}
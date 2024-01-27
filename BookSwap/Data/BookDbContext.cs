using BookSwap.Models;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Data;

public class BookDbContext : DbContext
{
    public DbSet<BookPost> BookPosts { get; set; }

    public BookDbContext(DbContextOptions<BookDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<ApplicationUser>()
            .HasMany(e => e.BookPosts)
            .WithOne(e => e.Owner)
            .HasForeignKey(e => e.OwnerId)
            .IsRequired();
        
    }

}

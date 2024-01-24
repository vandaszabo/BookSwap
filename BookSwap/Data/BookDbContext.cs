using BookSwap.Models;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Data;

public class BookDbContext : DbContext
{
    public DbSet<Book> Books { get; set; }
    public DbSet<UserBook> UserBooks { get; set; }

    public BookDbContext(DbContextOptions<BookDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       
        modelBuilder.Entity<UserBook>()
            .HasKey(ub => new { ub.UserId, ub.BookId });

        modelBuilder.Entity<UserBook>()
            .HasOne(ub => ub.User)
            .WithMany(u => u.UserBooks)
            .HasForeignKey(ub => ub.UserId);

        modelBuilder.Entity<UserBook>()
            .HasOne(ub => ub.Book)
            .WithMany(b => b.UserBooks)
            .HasForeignKey(ub => ub.BookId);
    }
}

using Microsoft.EntityFrameworkCore;

namespace BookSwap.Models;

[PrimaryKey("UserBookId")]
public class UserBook
{
    public Guid UserBookId { get; set; }
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }
    public string BookId { get; set; }
    public Book Book { get; set; }
}
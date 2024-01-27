using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Models;

[PrimaryKey("Id")]
public class ApplicationUser : IdentityUser
{
    public string? City { get; set; }
    public string? ProfileImage { get; set; }
    public ICollection<BookPost> BookPosts { get; set; }
}
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace BookSwap.Models;

public class ApplicationUser : IdentityUser
{
    public string? ProfileImage { get; set; }
    public string? City { get; set; }
    public ICollection<BookPost> BookPosts { get; set; }
}
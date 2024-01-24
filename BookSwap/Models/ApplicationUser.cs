using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Models;

[PrimaryKey("Id")]
public class ApplicationUser : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Address { get; set; }
    public string? ProfileImage { get; set; }
    public ICollection<UserBook> UserBooks { get; set; } = new List<UserBook>();
    
}
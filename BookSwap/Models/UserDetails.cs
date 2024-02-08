using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace BookSwap.Models;

public class UserDetails
{
    [Key]
    public Guid Id { get; set; }
    
    [ForeignKey("UserId")]
    public string UserId { get; set; }
    public IdentityUser? User { get; set; }
    public string? City { get; set; }
    public string? ProfileImage { get; set; }
    public ICollection<BookPost> BookPosts { get; set; }
    
    public ICollection<Like> LikesReceived { get; set; }
}
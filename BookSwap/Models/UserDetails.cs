using System.ComponentModel.DataAnnotations;

namespace BookSwap.Models;

public class UserDetails
{
    [Key]
    public string UserId { get; set; }
    public string City { get; set; }
    public string ProfileImage { get; set; }
    public ICollection<BookPost> BookPosts { get; set; }
}
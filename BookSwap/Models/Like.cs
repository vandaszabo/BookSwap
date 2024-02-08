namespace BookSwap.Models;

public class Like
{
    public Guid LikerId { get; set; }
    public Guid OwnerId { get; set; }
    public Guid PostId { get; set; }

    public UserDetails Liker { get; set; }
    public UserDetails Owner { get; set; }
    public BookPost Post { get; set; }
}
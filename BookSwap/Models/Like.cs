namespace BookSwap.Models;

public class Like
{
    public string LikerId { get; set; }
    public ApplicationUser Liker { get; set; }
    public Guid PostId { get; set; }
    public BookPost Post { get; set; }
}
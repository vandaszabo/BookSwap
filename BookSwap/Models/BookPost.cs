using Microsoft.EntityFrameworkCore;

namespace BookSwap.Models;

[PrimaryKey("PostId")]
public class BookPost
{
    public Guid PostId { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public int PageCount { get; set; }
    public string CoverImage { get; set; } 
    public string Language { get; set; } 

    public string OwnerId { get; set; }
    public ApplicationUser Owner { get; set; } 
}

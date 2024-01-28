using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Models;

public class BookPost
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid PostId { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public int PageCount { get; set; }
    public string CoverImage { get; set; } 
    public string Language { get; set; } 
    public string UserId { get; set; }
    public UserDetails? UserDetails { get; set; } 
}

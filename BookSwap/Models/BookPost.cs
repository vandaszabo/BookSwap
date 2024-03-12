using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
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
    
    [ForeignKey("UserId")]
    public string UserId { get; set; }
    public ApplicationUser? User { get; set; }
    
    public ICollection<Like> Likes { get; set; }
}

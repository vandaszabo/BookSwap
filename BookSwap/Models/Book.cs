using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Models;

[PrimaryKey("BookId")]
public class Book
{
    public string BookId { get;}
    public string Title { get;}
    public IEnumerable<string> Authors { get;}
    public IEnumerable<string> Categories { get;}
    public string Description { get;}
    public int PageCount { get;}
    public string CoverImage { get;}
    public string Language { get; }
    public ICollection<UserBook> UserBooks { get; set; } = new List<UserBook>();

}
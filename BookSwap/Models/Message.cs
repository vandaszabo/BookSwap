using System.ComponentModel.DataAnnotations;

namespace BookSwap.Models;

public class Message
{
    [Key]
    public Guid MessageId { get; set; }
    public string SenderId { get; set; }
    public string ReceiverId { get; set; }
    public string MessageText { get; set; }
}
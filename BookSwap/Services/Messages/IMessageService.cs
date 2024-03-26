using BookSwap.Contracts;
using BookSwap.Models;

namespace BookSwap.Services.Messages;

public interface IMessageService
{
    Task<Message?> CreateMessage(Message message);
    Task<IEnumerable<Message?>> FindSentMessages(string userId);
    Task<IEnumerable<Message?>> FindReceivedMessages(string userId);
    Task<IEnumerable<Message?>> FindAllMessagesForUser(string userId);
}
using BookSwap.Models;

namespace BookSwap.Repositories.Messages;

public interface IMessageRepository
{
    Task<Message?> Create(Message message);
    Task<IEnumerable<Message?>> FindBySenderId(string userId);
    Task<IEnumerable<Message?>> FindByReceiverId(string userId);
    Task<IEnumerable<Message?>> FindAllByUser(string userId);
}
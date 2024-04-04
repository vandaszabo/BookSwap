using BookSwap.Models;

namespace BookSwap.Repositories.Messages;

public interface IMessageRepository
{
    Task<Message?> Create(Message message);
    Task<Message?> FindById(Guid id);
    Task<Message?> Update(Message message);
    Task<IEnumerable<Message?>> FindBySenderId(string userId);
    Task<IEnumerable<Message?>> FindByReceiverId(string userId);
    Task<IEnumerable<Message?>> FindAllByUser(string userId);
    Task<IEnumerable<Message?>> FindAllUnreceived(string userId);
}
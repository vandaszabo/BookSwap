using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Repositories.Messages;
using BookSwap.Repositories.User;

namespace BookSwap.Services.Messages;

public class MessageService : IMessageService
{
    private readonly IMessageRepository _messageRepository;

    public MessageService(IMessageRepository messageRepository)
    {
        _messageRepository = messageRepository;
    }
    
    public async Task<Message?> CreateMessage(Message message)
    {
        return await _messageRepository.Create(message);
    }

    public async Task<IEnumerable<Message?>> FindSentMessages(string userId)
    {
        return await _messageRepository.FindBySenderId(userId);
    }
    
    public async Task<IEnumerable<Message?>> FindReceivedMessages(string userId)
    {
        return await _messageRepository.FindByReceiverId(userId);
    }
    
    public async Task<IEnumerable<Message?>> FindAllMessagesForUser(string userId)
    {
        return await _messageRepository.FindAllByUser(userId);
    }

    public async Task<IEnumerable<Message?>> GetUndelivered(string userId)
    {
        return await _messageRepository.FindAllUnreceived(userId);
    }

    public async Task<bool> UpdateIsDelivered(IEnumerable<Guid> messageIds)
    {
        try
        {
            foreach (var id in messageIds)
            {
                var message = await _messageRepository.FindById(id);
                if (message != null)
                {
                    message.IsDelivered = true;
                    await _messageRepository.Update(message);
                }
            }
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating message delivery status: {ex.Message}");
            return false;
        }
    }

    
}
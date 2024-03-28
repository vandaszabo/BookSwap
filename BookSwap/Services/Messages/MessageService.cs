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
    
    
}
using BookSwap.Data;
using BookSwap.Models;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Repositories.Messages;

public class MessageRepository : IMessageRepository
{
    private readonly BookSwapDbContext _dbContext;

    public MessageRepository(BookSwapDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Message?> Create(Message message)
    {
        try
        {
            _dbContext.Messages.Add(message);
            await _dbContext.SaveChangesAsync();
            return message;
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public async Task<IEnumerable<Message?>> FindBySenderId(string userId)
    {
        return await _dbContext.Messages
            .Where(message => message.SenderId == userId)
            .ToListAsync();
    }
    
    public async Task<IEnumerable<Message?>> FindByReceiverId(string userId)
    {
        return await _dbContext.Messages
            .Where(message => message.ReceiverId == userId)
            .ToListAsync();
    }
    
    public async Task<IEnumerable<Message?>> FindAllByUser(string userId)
    {
        return await _dbContext.Messages
            .Where(message => message.ReceiverId == userId || message.SenderId == userId)
            .ToListAsync();
    }
}
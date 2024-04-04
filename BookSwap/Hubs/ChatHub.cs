using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Repositories.Messages;
using BookSwap.Services.Messages;
using BookSwap.Services.User;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.SignalR;

namespace BookSwap.Hubs;

public class ChatHub : Hub
{

    private readonly IMessageService _messageService;
    private readonly IUserService _userService;
    private readonly ILogger<ChatHub> _logger;

    public ChatHub(IMessageService messageService, IUserService userService, ILogger<ChatHub> logger)
    {
        _messageService = messageService;
        _userService = userService;
        _logger = logger;
    }

    public async Task GetClientConnectionId(string ownConnId, string receiverId)
    {
        var user = await _userService.GetUserById(receiverId);
        await Clients.Client(ownConnId)
            .SendAsync("GetConnectionId", "admin", user?.ConnectionID);
    }
    
    public async Task SendToUser(MessageRequest request, string receiverConnId)  
    {
        try
        {
            // Send the message to the specified client
            await Clients.Client(receiverConnId)
                .SendAsync("ReceivePrivateMessage", request.UserImage, request.UserName, request.UserId, request.Msg);
        
            // Create the message and mark it as delivered
            var message = new Message
            {
                SenderId = request.UserId, 
                ReceiverId = request.ReceiverId, 
                MessageText = request.Msg, 
                IsDelivered = true
            };

            // Save the message to the database
            var createdMessage = await _messageService.CreateMessage(message);
            if (createdMessage == null)
            {
                _logger.LogError("Error creating message.");
                return;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError($"An error occurred while sending message: {ex.Message}");
        }
    }

    public string? GetOwnConnectionId()
    {
        try
        {
            return Context.ConnectionId;
        }
        catch (Exception ex)
        {
            _logger.LogError($"An error occurred while getting own connection ID: {ex.Message}");
            return null;
        }
    }

}
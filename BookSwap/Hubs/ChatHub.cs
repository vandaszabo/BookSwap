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

    public ChatHub(IMessageService messageService, IUserService userService)
    {
        _messageService = messageService;
        _userService = userService;
    }

    public async Task GetClientConnectionId(string receiverId)
    {
        var user = await _userService.GetUserById(receiverId);
        await Clients.All
            .SendAsync("GetConnectionId", "admin", user?.ConnectionID);
    }
    
    public async Task SendToUser(MessageRequest request, string receiverConnId)
    {
        await Clients.Client(receiverConnId).SendAsync("ReceivePrivateMessage", request.UserImage, request.UserName, request.UserId, request.Msg);
        var message = new Message{SenderId = request.UserId, ReceiverId = request.ReceiverId, MessageText = request.Msg};
        await _messageService.CreateMessage(message);
    }

    public string GetOwnConnectionId()
    {
       return Context.ConnectionId;
    }
}
using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Repositories.Messages;
using BookSwap.Services.Messages;
using Microsoft.AspNetCore.SignalR;

namespace BookSwap.Hubs;

public class ChatHub : Hub
{

    private readonly IMessageService _messageService;

    public ChatHub(IMessageService messageService)
    {
        _messageService = messageService;
    }
    
    //private readonly SharedDb _shared;
    //public ChatHub(SharedDb shared) => _shared = shared;
    
    // public async Task JoinChat(UserConnection conn)
    // {
    //     await Clients.All
    //         .SendAsync("ReceiveMessage", "admin", $"{conn.UserName} has joined");
    // }
    //
    // public async Task JoinSpecificChatRoom(UserConnection conn)
    // {
    //     await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
    //     
    //     //When someone join the chatRoom, We add the unique connectionId to the inMemoryDb
    //     _shared.connections[Context.ConnectionId] = conn;
    //     
    //     await Clients.Group(conn.ChatRoom)
    //         .SendAsync("JoinSpecificChatRoom", "admin", $"{conn.UserName} has joined {conn.ChatRoom}");
    // }
    //
    // public async Task SendMessage(string msg)
    // {
    //     if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
    //     {
    //         await Clients.Group(conn.ChatRoom)
    //             .SendAsync("ReceiveSpecificMessage", conn.UserImage, msg);
    //     }
    // }

    public async Task SendToUser(string userId, string userImage, string receiverConnId, string receiverId, string msg)
    {
        await Clients.Client(receiverConnId).SendAsync("ReceivePrivateMessage", userImage, msg);
        var message = new Message{SenderId = userId, ReceiverId = receiverId, MessageText = msg};
        await _messageService.CreateMessage(message);
    }

    public string GetConnectionId()
    {
       return Context.ConnectionId;
    }
}
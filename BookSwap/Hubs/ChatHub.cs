using BookSwap.Models;
using Microsoft.AspNetCore.SignalR;

namespace BookSwap.Hubs;

public class ChatHub : Hub
{
    public async Task JoinChat(UserConnection conn)
    {
        await Clients.All
            .SendAsync("ReceiveMessage", "admin", $"{conn.UserId} has joined");
    }

    public async Task JoinSpecificChatRoom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
        
        await Clients.Group(conn.ChatRoom)
            .SendAsync("ReceiveMessage", "admin", $"{conn.UserId} has joined {conn.ChatRoom}");
    }
}
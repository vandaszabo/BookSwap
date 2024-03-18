using BookSwap.DataService;
using BookSwap.Models;
using Microsoft.AspNetCore.SignalR;

namespace BookSwap.Hubs;

public class ChatHub : Hub
{
    private readonly SharedDb _shared;
    public ChatHub(SharedDb shared) => _shared = shared;
    
    public async Task JoinChat(UserConnection conn)
    {
        await Clients.All
            .SendAsync("ReceiveMessage", "admin", $"{conn.UserId} has joined");
    }

    public async Task JoinSpecificChatRoom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
        
        //When someone join the chatRoom, We add the unique connectionId to the inMemoryDb
        _shared.connections[Context.ConnectionId] = conn;
        
        await Clients.Group(conn.ChatRoom)
            .SendAsync("JoinSpecificChatRoom", "admin", $"{conn.UserId} has joined {conn.ChatRoom}");
    }

    public async Task SendMessage(string msg)
    {
        if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
        {
            await Clients.Group(conn.ChatRoom)
                .SendAsync("ReceiveSpecificMessage", conn.UserId, msg);
        }
    }
}
namespace BookSwap.Contracts;

public record MessageCreate(string SenderId, string ReceiverId, string Msg);

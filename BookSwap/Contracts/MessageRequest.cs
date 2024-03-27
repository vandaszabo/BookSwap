namespace BookSwap.Contracts;

public record MessageRequest(string UserId, string UserImage, string ReceiverId, string Msg);
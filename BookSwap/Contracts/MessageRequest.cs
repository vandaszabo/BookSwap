namespace BookSwap.Contracts;

public record MessageRequest(string UserId, string UserName, string UserImage, string ReceiverId, string ReceiverName, string Msg);
namespace BookSwap.Contracts;

public record MessageRequest(string UserId, string UserImage, string ReceiverConnId, string ReceiverId, string Msg);
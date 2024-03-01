namespace BookSwap.Contracts;

public record LikeRequest(string UserId, Guid PostId);
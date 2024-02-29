namespace BookSwap.Contracts;

public record UpdateDataRequest(
    string UserId, 
    string NewEmail, 
    string NewUsername, 
    string? NewPhoneNumber, 
    string? NewCity, 
    string? NewProfileImage);
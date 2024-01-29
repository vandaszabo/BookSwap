namespace BookSwap.Contracts;

public record BookPostRequest(
    string Title,
    string Author, 
    string Description, 
    string Category, 
    string Language, 
    int PageCount, 
    string CoverImage, 
    string UserId);
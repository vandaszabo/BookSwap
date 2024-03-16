namespace BookSwap.Contracts;

public record BookPostDto(
    Guid PostId,
    string Title,
    string Author, 
    string Description, 
    string Category, 
    string Language, 
    int PageCount, 
    string CoverImage, 
    string UserId);
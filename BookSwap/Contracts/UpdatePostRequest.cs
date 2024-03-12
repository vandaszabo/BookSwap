namespace BookSwap.Contracts;

public record UpdatePostRequest(
    Guid PostId,
    string Title, 
    string Author, 
    string Category,
    int PageCount,
    string Language,
    string Description, 
    string CoverImage
    );
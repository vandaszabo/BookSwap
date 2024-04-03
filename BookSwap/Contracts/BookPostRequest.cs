namespace BookSwap.Contracts;

public class BookPostRequest
{
   public string Title { get; set; }
   public string Author { get; set; } 
   public string Description { get; set; } 
   public string Category { get; set; }
   public string Language { get; set; } 
   public int PageCount { get; set; } 
   public string CoverImage { get; set; } 
   public string UserId { get; set; }

   public BookPostRequest()
   {
      
   }

   public BookPostRequest(string title, string author, string description, string category, string language, int pageCount, string coverImage, string userId)
   {
      Title = title;
      Author = author;
      Description = description;
      Category = category;
      Language = language;
      PageCount = pageCount;
      CoverImage = coverImage;
      UserId = userId;
   }
}

    
    
# BookSwap

BookSwap is a web application designed for exchanging books. 
It enables users to upload their own books and browse through posts made by others before deciding to swap.
Users can like their favorite books, and maintain their profile page. 

## Technologies
- backend: Asp.Net Core with EF and C#
- frontend: React.js with MUI and JavaScript

### Database Setup with Entity Framework and PostgreSQL

1. **Create Migrations:**
   - Open a terminal or command prompt.
   - Navigate to the project's backend directory. (BookSwap)
   - Run the following commands to create migrations:
       - dotnet ef migrations add InitialCreate --context BookDbContext
2. **Apply the migrations to update the databases:**
   - Run the following commands to update your database:
       - dotnet ef database update --context BookDbContext
     
#### Start the application

3. **Running the Project**
   - Start the backend server by running the following command:
       - dotnet run
   - Open a new terminal or command prompt.
   - Navigate to the project's frontend directory.
   - Start the frontend application:
       - npm start

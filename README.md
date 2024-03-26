# BookSwap
BookSwap is a web application for book enthusiasts to exchange and discover new books. 
It provides a platform where users can post their books for swapping, browse available books from other users, and connect with fellow readers for book exchanges.

# Features
- **User Authentication**: Secure user authentication system using JWT tokens.
- **Book Posting**: Users can post books they own and are willing to swap.
- **Book Search**: Browse and search for available books based on location, language, genre, etc.
- **Book Like**: Users can express interest in books by liking them. Liked books are displayed at their profile.
- **Mutual Swapping**: Users can swap books with others who have mutually liked each other's posts. Matches also displayed at their profile.
- **Editable posts and profile**: Users can update details about their books and personal information, or change their pictures.
- **Real-Time Chat**: Integrated chat functionality using SignalR for users to communicate and arrange book exchanges.
- **Image Storage**: Profile images and book cover photos are stored in AWS S3 bucket for efficient storage and retrieval.
- **Responsive Design**: Mobile-friendly interface for seamless browsing and interaction across devices.

# Technologies Used
- **Backend**: ASP.NET Core Web API with Entity Framework (EF) for data access.
- **Database**: PostgreSQL database hosted on the cloud for storing book and user information.
- **Real-Time Communication**: SignalR for real-time chat functionality.
- **Frontend**: React.js with Material-UI for building the user interface.
- **Image Storage**: AWS S3 bucket for storing profile images and book cover photos.
- **Dockerization**: Dockerized setup for easy deployment and scalability.

# Getting Started

## Prerequisites
Before running BookSwap, ensure you have the following:
Database: Set up a PostgreSQL database to store book and user information. You can host the database on a cloud platform like Render or Amazon RDS.
AWS S3 Bucket: Create an AWS S3 bucket for storing profile images and book cover photos. Obtain the necessary AWS credentials to access the bucket from your application.

## Configuration
Environment Variables: 
Set up environment variables for database connection string, JWT secret key, AWS secret key, etc., as required in the launchSettings.json file.

## To run BookSwap locally, follow these steps:
1. Clone this repository to your local machine. 
   ```
    git clone https://github.com/vandaszabo/BookSwap
    ```
2. Navigate to the BookSwap directory.
   ```
    cd BookSwap
    ```
3. Run Docker Compose to build and start the application containers.
   ```
    docker-compose up -d
    ```
4. Access the application in your web browser at [http://localhost:3000](http://localhost:3000).

## Status
I am currently actively working on this project. 



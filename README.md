# BookSwap
BookSwap is a web application for book enthusiasts to exchange and discover new books. 
It provides a platform where users can post their books for swapping, browse available books from other users, and connect with fellow readers for book exchanges.

# Features

- **User Authentication**: Register and login to access personalized features.
- **Book Posting**: Users can create and share their book posts with the community.
- **Book Search**: Browse and search for available books based on various criteria such as location, language, and genre.
- **Book Like**: Express interest in any book post by liking it. Liked books are conveniently displayed on the user's profile.
- **Find Match**: Discover potential book swaps with other users who have mutually liked each other's posts.
- **Post and Profile Editing**: Easily update book posts and personal information, or change profile pictures as needed.
- **Real-Time Chat**: Seamlessly communicate and arrange book exchanges with matched users through real-time chat functionality.
- **Image Upload**: Upload profile images and book cover photos to personalize your profile and book posts.
- **Responsive Design**: Enjoy a consistent and optimized experience across devices, ensuring usability on desktops, tablets, and mobile phones.

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
- **Database**:
  Set up a PostgreSQL database to store book and user information.
  You can host the database on a cloud platform like Render or Amazon RDS.
- **AWS S3 Bucket**:
  Create an AWS S3 bucket for storing profile images and book cover photos.
  Obtain the necessary AWS credentials to access the bucket from your application.

## Configuration
- **Environment Variables**: 
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



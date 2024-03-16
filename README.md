# BookSwap

BookSwap is a web application designed for exchanging books. 
It enables users to upload their own books and browse through posts made by others before deciding to swap.
Users can like their favorite books, and maintain their profile page. 

## Technologies
- backend: Asp.Net Core with EF and C#
- frontend: React.js with MUI and JavaScript
- docker: The project is Dockerized for easy deployment and management
- CI: github actions for test and build

## Prequisites
- PostgreSQL database
- AWS S3 bucket 

## Start the application
- Clone the repository
- Add environment variables in launchSettings (ConnectionString, AWS secret keys...)
- Run the following command in root directory(BookSwap): docker-compose up -d
- Access the frontend page at http://localhost:3000

   

# Use the Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend project
COPY . .

# Build the frontend application
RUN npm run build

# Install serve globally to serve the production build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to run the production build
CMD ["serve", "-s", "build", "-l", "3000"]

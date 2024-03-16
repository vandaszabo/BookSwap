# Use the .NET SDK image as the base image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env

# Set the working directory inside the container
WORKDIR /app

# Copy the backend project file and restore dependencies
COPY BookSwap.csproj ./
RUN dotnet restore

# Copy the entire backend project
COPY . ./

# Build the backend application
RUN dotnet publish -c Release -o out

# Create a new image with the .NET runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app

# Copy the built application from the build environment
COPY --from=build-env /app/out .

ENV ASPNETCORE_URLS=http://+:5029
EXPOSE 5029
# Set the entry point for the container
ENTRYPOINT ["dotnet", "BookSwap.dll"]

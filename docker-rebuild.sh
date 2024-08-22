#!/bin/bash

# Stop and remove all running containers
echo "Stopping and removing all running containers..."
docker container stop $(docker container ls -aq)
docker container rm $(docker container ls -aq)

# Remove all dangling images (unused images)
echo "Removing all dangling images..."
docker image prune -f

# Remove all unused volumes (optional)
echo "Removing all unused volumes..."
docker volume prune -f

# Remove all networks not used by at least one container (optional)
echo "Removing all unused networks..."
docker network prune -f

# Build the Docker image
echo "Building the Docker image..."
docker build -t universe_plus_backend .

# Run the Docker container
echo "Running the Docker container..."
docker run -p 3000:3000 universe_plus_backend
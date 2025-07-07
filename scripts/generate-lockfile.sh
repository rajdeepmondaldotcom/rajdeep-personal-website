#!/bin/bash
set -e

echo "Building Docker image to generate a Linux-compatible yarn.lock file..."
docker build -t rajdeep-lockfile-gen -f Dockerfile.lockfile .

# Create a container from the image
CONTAINER_ID=$(docker create rajdeep-lockfile-gen)

echo "Copying the generated yarn.lock from the container to your project..."
# Use docker cp to copy the file from the container to the host
docker cp "${CONTAINER_ID}:/app/yarn.lock" ./yarn.lock

echo "Cleaning up the temporary container..."
docker rm -f "${CONTAINER_ID}" > /dev/null

echo "✅ Successfully updated yarn.lock with the Linux-generated version."
echo "Please commit the new yarn.lock file and push to GitHub." 
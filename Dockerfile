# This Dockerfile is used as an entry point for Render
FROM debian:bullseye-slim

# Install Docker and Docker Compose
RUN apt-get update && \
    apt-get install -y docker.io docker-compose

# Copy the docker-compose file
COPY docker-compose.yml .

# Command to run docker-compose
CMD ["docker-compose", "up"]
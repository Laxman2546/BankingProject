# Use Ubuntu as base image
FROM ubuntu:20.04

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install required packages
RUN apt-get update && \
    apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

# Add Docker's official GPG key and repository
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Install Docker and Docker Compose
RUN apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose

# Copy the docker-compose file
COPY docker-compose.yml .

# Create startup script
RUN echo '#!/bin/bash\n\
service docker start\n\
dockerd &\n\
sleep 5\n\
docker-compose up\n' > /start.sh && \
    chmod +x /start.sh

# Command to run startup script
CMD ["/start.sh"]
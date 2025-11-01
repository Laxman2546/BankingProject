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
    software-properties-common \
    sudo \
    iptables

# Add Docker's official GPG key and repository
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Install Docker and Docker Compose
RUN apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose

# Create a non-root user
RUN useradd -m -s /bin/bash docker-user && \
    usermod -aG sudo docker-user && \
    echo "docker-user ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Copy the docker-compose file
COPY docker-compose.yml /home/docker-user/

WORKDIR /home/docker-user

# Create startup script with proper permissions
RUN echo '#!/bin/bash\n\
sudo mkdir -p /var/run/docker.sock\n\
sudo chmod 666 /var/run/docker.sock\n\
sudo service docker start\n\
sudo dockerd --iptables=false &\n\
sleep 5\n\
sudo chmod 666 /var/run/docker.sock\n\
docker-compose up\n' > start.sh && \
    chmod +x start.sh

# Switch to non-root user
USER docker-user

# Command to run startup script
CMD ["./start.sh"]
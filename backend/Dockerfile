# Use a specific Java version for the build environment
FROM openjdk:17-jdk-slim as build

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and the pom.xml file
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download the dependencies
RUN ./mvnw dependency:go-offline

# Copy the source code
COPY src src

# Build the application
RUN ./mvnw package -DskipTests

# Use a smaller JRE image for the final container
FROM openjdk:17-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/codersbank-0.0.1-SNAPSHOT.jar .

# Expose the port the application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","codersbank-0.0.1-SNAPSHOT.jar"]

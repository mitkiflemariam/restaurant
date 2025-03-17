# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server/server.js"]


# # Use official Node.js image
# FROM node:18

# # Set working directory
# WORKDIR /server

# # Copy package.json and install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy application files
# COPY . .

# # Set environment variable
# ENV PORT=3000

# # Expose port
# EXPOSE 3000

# # Command to run the application
# CMD ["node", "server.js"]

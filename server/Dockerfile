

# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]





# Use an official Node.js runtime as the base image
# FROM node:18

# # Set the working directory inside the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json (if present)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose the port your app runs on
# EXPOSE 3000

# # Command to run the application
# CMD ["npm", "start"]


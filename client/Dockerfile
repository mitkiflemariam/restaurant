# Use Node.js for building the React app
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code and build the React app
COPY . .
RUN npm run build

# Serve the React app with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 5173

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

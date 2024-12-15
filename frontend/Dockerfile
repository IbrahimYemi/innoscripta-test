# Stage 1: Build Stage
FROM node:22 AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Final Stage (production environment)
FROM nginx:alpine

# Copy the build from the previous stage to Nginx's public directory
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

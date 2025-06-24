FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy full project (includes package.json, src/, etc.)
COPY . .

# Install dependencies
RUN npm ci --omit=dev

# Expose the backend port
EXPOSE 5050

# Start the application
CMD ["node", "src/app.js"]

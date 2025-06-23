FROM node:20-alpine

# Install essential extras for Alpine if needed
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy manifest and install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy application code
COPY src ./src

# Explicit runtime environment
ENV NODE_ENV=production

# Expose HTTP port
EXPOSE 8000

# Launch the application
CMD ["node", "src/app.js"]

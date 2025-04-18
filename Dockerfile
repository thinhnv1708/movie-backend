# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock* ./

# Install all dependencies (including dev dependencies for build)
RUN yarn install --frozen-lockfile

COPY src /app/src
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.build.json /app/tsconfig.build.json


# Build the application
RUN yarn build

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Copy only the dist folder from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
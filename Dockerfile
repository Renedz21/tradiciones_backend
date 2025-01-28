# Stage 1: Build
FROM node:22-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy dependency-related files
COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma/

# Install pnpm globally and dependencies
RUN npm install -g pnpm@latest-10 && pnpm install --frozen-lockfile

# Generate Prisma client
RUN pnpm dlx prisma generate

# Copy the rest of the application
COPY . .

# Build the NestJS application
RUN pnpm build

# Stage 2: Production
FROM node:22-alpine AS runner

# Set environment variables
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY .env .env

# Expose application port
EXPOSE 5000

# Set the default command
CMD ["node", "dist/main.js"]

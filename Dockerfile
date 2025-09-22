# Use Node.js 20 Alpine as base image for smaller size
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install production dependencies only
RUN corepack enable pnpm && \
    pnpm i --frozen-lockfile --prod && \
    pnpm store prune

# Build stage with dev dependencies
FROM base AS builder
WORKDIR /app

# Copy package files and install all dependencies for build
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Copy source code
COPY . .

# Disable telemetry for smaller build
ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN pnpm run build

# Production image - ultra-minimal
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Create .next directory with correct permissions
RUN mkdir -p .next && chown nextjs:nodejs .next

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Use exec form for better signal handling
CMD ["node", "server.js"]

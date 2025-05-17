# Step 1: Build all packages
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only package manager files for caching
COPY turbo.json ./
COPY pnpm-lock.yaml ./
COPY package.json ./

# Copy the whole monorepo
COPY . .

# Install deps and build only web
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build --filter=web...

# Step 2: Serve the Next.js app
FROM node:18-alpine AS runner

WORKDIR /app

# Reuse built output
COPY --from=builder /app/apps/web/.next .next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./package.json

# Install just prod deps
RUN pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]

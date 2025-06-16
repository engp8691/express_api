FROM node:lts-alpine AS builder

WORKDIR /app

# Install required packages for Prisma (OpenSSL, etc.)
RUN apk add --no-cache openssl

# Copy necessary files
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies including devDeps for Prisma CLI
RUN npm install

# Generate Prisma Client for correct binary target
RUN npx prisma generate

# Copy rest of source code and build it
COPY dist ./api

# --- Final image ---
FROM node:lts-alpine

WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=3000

# Database envs (optional - better to pass at runtime)
ENV DB_HOST='dpg-d17dftqdbo4c73fqk2eg-a.ohio-postgres.render.com'
ENV DB_PORT=5432
ENV DB_NAME='cradl'
ENV DB_USER='cradl'
ENV DB_PASS='EGlOzWDdcNYywV25FboD7ldsjM9MCQ3Y'

# Install OpenSSL for Prisma engine
RUN apk add --no-cache openssl

# Create a non-root user
RUN addgroup --system apirunner && \
    adduser --system -G apirunner apirunner

# Copy built app and node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/api ./api
COPY --from=builder /app/prisma ./prisma

# Ensure correct file ownership
RUN chown -R apirunner:apirunner .

USER apirunner

CMD ["node", "api/server.js"]

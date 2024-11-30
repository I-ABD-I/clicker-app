# Fetch the latest node img on apline
FROM node:22-alpine AS base

FROM base AS deps
# setup workdir
WORKDIR /app

# install deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
# setup workdir
WORKDIR /app

# copy deps & code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# build
RUN npm run build

FROM base AS runner
# setup workdir
WORKDIR /app
# declare env
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# copy project files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# switch user
USER nextjs

# expose port 3000
EXPOSE 3000

# setup env for nodejs
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
# run the server
CMD ["node", "server.js"]

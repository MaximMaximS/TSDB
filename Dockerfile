FROM node:18-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN npm install -g pnpm@latest && pnpm install --frozen-lockfile && pnpm run generate

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build && npm run bundle

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/dist .

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]



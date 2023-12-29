FROM node:21.5.0-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN npm install -g pnpm turbo

COPY . .

RUN pnpm install

RUN pnpm run build --filter=xpense-server... 

FROM node:20-alpine

COPY --from=builder /app/apps/server/dist .

ENV PORT=80

CMD ["node", "app.js"]
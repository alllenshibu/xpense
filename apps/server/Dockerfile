FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN npm install -g pnpm turbo

COPY ../../. .

RUN apk add --no-cache \
    build-base \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg \
    python3

ENV PYTHON=/usr/bin/python3

RUN pnpm install

RUN pnpm run build --filter=xpense-server...

FROM node:18-alpine

COPY --from=builder /app/apps/server/dist .
COPY --from=builder /app/node_modules/.pnpm/@prisma+client*/node_modules/.prisma/client/*.node .

ENV PORT=80

EXPOSE 80

CMD ["node", "app.cjs"]

FROM oven/bun:1.1.13-alpine

WORKDIR /app

COPY package.json ./
COPY bun.lock ./

RUN bun install

COPY . .

RUN bun run tsc || true

ENV NODE_ENV=production

CMD ["bun", "run", "index.ts"]

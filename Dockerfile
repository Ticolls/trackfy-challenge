FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm exec prisma generate

RUN pnpm run build

EXPOSE 3001

CMD ["pnpm", "run", "start:prod"]
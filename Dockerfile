FROM node:18-alpine
LABEL org.opencontainers.image.authors="https://github.com/kev-ac"

# Add MySQL client for mysqldump command
RUN apk add --no-cache mysql-client

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci

COPY . .

CMD ["node", "app.js"]

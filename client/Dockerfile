FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM caddy:2.8

COPY ./Caddyfile.prod /etc/caddy/Caddyfile

COPY --from=builder /app/build/ /srv/

EXPOSE 80
EXPOSE 443
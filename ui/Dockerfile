FROM node:18-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i && npm cache clean --force
COPY . .
RUN npm run build

FROM nginx:1.25-bookworm
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
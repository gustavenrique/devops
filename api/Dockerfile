FROM node:18-bookworm-slim AS builder
WORKDIR /app
COPY ./package*.json ./
RUN yarn --production && yarn cache clean -all
COPY ./ ./
RUN yarn build

FROM node:18-bookworm-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]
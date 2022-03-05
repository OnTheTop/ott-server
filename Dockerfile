FROM node:14-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@7.24.1 && npm install && npm cache clear --force

COPY . .

RUN npm run build

FROM node:14-alpine
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

FROM node:16.2.0-alpine

RUN apk add --no-cache git

WORKDIR /app/src

COPY . .

RUN npm install

RUN npm run build
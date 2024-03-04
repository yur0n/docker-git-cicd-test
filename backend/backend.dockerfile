FROM node:alpine

ENV NODE_VERSION 21.6.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 4000

CMD ["node", "./bin/www"]
FROM ubuntu:latest
LABEL authors="jbush"

ENTRYPOINT ["top", "-b"]

FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["node", "app/app.js"]


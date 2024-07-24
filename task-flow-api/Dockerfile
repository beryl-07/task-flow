# NodeJS Version 18
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@10.2.5

RUN npm install

COPY . .

RUN npm run prisma:generate

ENV NODE_ENV development

EXPOSE 3333

CMD ["npm", "run", "start:dev"]
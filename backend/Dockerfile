FROM node:20.15.0-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:migrate:prod" ]

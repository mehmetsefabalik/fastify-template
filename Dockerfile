FROM node:10.17-alpine

WORKDIR /usr/src/app

COPY ./node_modules ./node_modules
COPY ./dist ./dist
COPY ./package.json ./package.json

EXPOSE 5050

CMD ["npm", "run", "start"]
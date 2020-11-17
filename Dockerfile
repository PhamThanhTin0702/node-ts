FROM node:latest

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

COPY node_modules ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 4001

CMD [ "node", "./build/main.js" ]
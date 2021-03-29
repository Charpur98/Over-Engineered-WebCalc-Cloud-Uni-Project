FROM node:10
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install
RUN npm install xmlhttprequest

COPY . .

EXPOSE 80

CMD [ "node", "proxy.js" ]

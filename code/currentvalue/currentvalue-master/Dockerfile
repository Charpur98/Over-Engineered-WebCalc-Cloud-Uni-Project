
FROM node:10
WORKDIR /usr/src/

RUN npm install

COPY . .

EXPOSE 80

CMD [ "node", "src/index.js" ]


FROM node:10
WORKDIR /src/

RUN npm install
RUN npm install xmlhttprequest
RUN apt-get update -y && apt-get install -y python3-pip python

COPY . .
COPY src/ .

EXPOSE 80

CMD [ "node", "index.js" ]

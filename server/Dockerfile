FROM  node:20-alpine3.17

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "start"]
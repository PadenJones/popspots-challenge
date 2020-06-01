FROM node:12
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN cd client && npm install && npm run build && cd ../
RUN cd server && npm install && cd ../
EXPOSE 5000
CMD node server/server.js

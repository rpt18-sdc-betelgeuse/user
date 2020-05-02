FROM node:10-alpine
WORKDIR /app
COPY package-lock.json /app
COPY package.json /app
COPY newrelic.js /app
COPY database /app/database
COPY server /app/server
RUN npm install
CMD ["npm", "run", "start:prod"]
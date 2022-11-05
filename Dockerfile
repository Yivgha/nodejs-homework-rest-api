FROM node:19-alpine
WORKDIR /app
COPY . /app
RUN npm install --production
COPY . /app
CMD node server.js
EXPOSE 3000
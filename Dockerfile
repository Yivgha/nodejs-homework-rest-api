# FROM node:12-alpine
# RUN /nodejs-homework-rest-api
# COPY . .
# RUN npm install --production
# CMD ["node", "server.js"]
# EXPOSE 3000

FROM node:19-alpine
WORKDIR /app
COPY . /app
RUN npm install --production
COPY . /app
CMD node server.js
EXPOSE 3000
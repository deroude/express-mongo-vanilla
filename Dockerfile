FROM node:10 AS dependencies
ADD package.json .
RUN npm install

FROM dependencies
ADD index.js .
EXPOSE 3000
ENTRYPOINT [ "node", "--experimental-modules", "index.mjs" ]
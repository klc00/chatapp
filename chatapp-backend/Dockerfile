FROM node:18.16.0

WORKDIR /base

COPY . .

RUN yarn install

RUN yarn build

CMD [ "node" , "dist/main.js" ]
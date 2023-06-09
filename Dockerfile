FROM node:16.13.1

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY .env  /usr/src/app/.env

COPY .docker.env  /usr/src/app/.docker.env

COPY package.json yarn.lock /usr/src/app/

RUN yarn install

RUN yarn global add copyfiles

COPY . /usr/src/app

RUN yarn run build:prod

EXPOSE 3000

CMD [ "yarn", "start:prod" ]



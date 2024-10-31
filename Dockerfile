FROM node:22

WORKDIR /opt

COPY ./package*.json ./
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

CMD ["yarn", "start"]

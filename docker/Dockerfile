# BUILDER
FROM node:20 AS builder

WORKDIR /usr/src/app
COPY package*.json ./usr/src/app
RUN yarn install --production

# PRODUCTION IMAGE
FROM node:20

ENV NODE_ENV=production
COPY --from=builder /usr/bin/ /usr/bin/
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app

ENV ACCESS_KEY_ID=AKIAQXPZDKPZIMJ3CM5B
ENV ACCESS_KEY_SECRET=X4mTFGAHgfUgBjAhsamJcUZbGyUmBhwoUxQvlJG

EXPOSE 3000

CMD ["node", "dist/main.js"]

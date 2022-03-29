# Dockerfile in root Strapi
FROM node:14 as Base

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

COPY package*.json ./

RUN npm install --only=production

COPY . ./

RUN npm run build

EXPOSE 1337

CMD [ "npm", "start" ]
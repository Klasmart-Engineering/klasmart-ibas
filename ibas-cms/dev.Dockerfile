FROM node:14-alpine as BUILD_IMAGE

WORKDIR /strapi

# Resolve node_modules for caching
COPY ./ibas-cms/package.json ./
COPY ./ibas-cms/yarn.lock ./
RUN yarn install --production=true --frozen-lockfile

# Copy all for build and release cache if package.json update
COPY /ibas-cms/. .
#ENV NODE_ENV=production

RUN yarn build

#------------------------------------------------------------------------------------

# Create new namespace for final Docker Image
FROM node:14-alpine

# Only copy your source code without system file
COPY --from=BUILD_IMAGE /strapi /strapi

WORKDIR /strapi

EXPOSE 1338

#ENV NODE_ENV=production
ENV STRAPI_LOG_LEVEL=debug

CMD ["yarn", "develop"]
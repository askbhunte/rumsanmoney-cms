FROM node:14.17.0-alpine3.13
RUN apk add git
WORKDIR /usr/src/app
COPY . .
RUN yarn
CMD ["yarn","production"]
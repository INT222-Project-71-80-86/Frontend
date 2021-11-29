FROM node:latest as build-stage
WORKDIR /app
ARG backend_url
ENV VUE_APP_BACKEND_URL=$backend_url
COPY package*.json ./
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
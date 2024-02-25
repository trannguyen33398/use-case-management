# build stage
FROM node:18-alpine as build-stage
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

FROM node:16.14.0 as build
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app/
RUN npm run build --output-path=dist

FROM nginx:1.25.2
COPY --from=build /app/dist/blog-client /usr/share/nginx/html
EXPOSE ${NGINX_PORT}
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
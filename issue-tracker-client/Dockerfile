FROM node:16.14.0 as build

ARG KC_URL
ENV REACT_APP_KC_URL=${KC_URL}

ARG CLIENT_URL
ENV REACT_APP_CLIENT_URL=${CLIENT_URL}

ARG API_URL
ENV REACT_APP_API_URL=${API_URL}

WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:1.25.2
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE ${NGINX_PORT}
CMD ["nginx", "-g", "daemon off;"]
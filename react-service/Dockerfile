FROM node:16.14.0 as build

ARG KC_URL
ENV REACT_APP_KC_URL=${KC_URL}

ARG CLIENT_HOST
ENV REACT_APP_CLIENT_HOST=${CLIENT_HOST}

ARG CLIENT_PORT
ENV REACT_APP_CLIENT_PORT=${CLIENT_PORT}

ARG CLIENT_URL
ENV REACT_APP_CLIENT_URL=http://${REACT_APP_CLIENT_HOST}:${REACT_APP_CLIENT_PORT}

WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:1.25.2
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE ${REACT_APP_CLIENT_PORT}
CMD ["nginx", "-g", "daemon off;"]
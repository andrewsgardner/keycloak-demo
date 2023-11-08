FROM node:16.14.0 as build

ARG REACT_APP_KC_URL=http://localhost:8080
ENV REACT_APP_KC_URL=$REACT_APP_KC_URL

ARG REACT_APP_CLIENT_URL=http://localhost:3000
ENV REACT_APP_CLIENT_URL=$REACT_APP_CLIENT_URL

WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:1.25.2
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]
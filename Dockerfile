FROM nginx:latest
#FROM openresty/openresty
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/
#COPY ./dist/fuse /usr/share/nginx/html

EXPOSE 80 443

#FROM node:latest
#WORKDIR /app
#COPY package.json ./
#RUN npm install
#COPY . .
#EXPOSE 80 443
#CMD npm run start

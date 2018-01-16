#FROM nginx
#COPY build /usr/share/nginx/html
FROM node:carbon
RUN mkdir /usr/src/app/
COPY package*.json /usr/src/app/
WORKDIR /usr/src/app/
RUN npm install --only-production
COPY . /usr/src/app/
EXPOSE 3000
CMD ["npm", "start"]
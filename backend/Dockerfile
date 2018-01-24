FROM node:carbon
#RUN mkdir /usr/src/app/
#COPY package*.json /usr/src/app/
#WORKDIR /usr/src/app/
#RUN npm install --only-production
#COPY . /usr/src/app/
#EXPOSE 3001
#CMD ["npm", "start"]
RUN mkdir /usr/src/app/
COPY dist /usr/src/app/
WORKDIR /usr/src/app/
EXPOSE 3000
CMD ["node", "dist/server.js"]
FROM node:carbon

RUN mkdir /usr/src/app/
COPY dist /usr/src/app/dist
COPY node_modules /usr/src/app/dist/node_modules
WORKDIR /usr/src/app/
EXPOSE 3000
CMD ["node", "dist/server.js"]
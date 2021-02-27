FROM node:14

WORKDIR /usr/src/app/frontend

ENV PATH /usr/src/app/frontend/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@4.0.1 -g --silent

COPY . .

EXPOSE 3333
CMD ["npm", "start"]
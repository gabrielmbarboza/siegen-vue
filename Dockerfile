FROM node:lts-alpine
LABEL maintainer="gabrielmbarboza"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]

FROM node:latest
RUN apt-get update
WORKDIR /Backend
COPY Backend/ .
RUN npm install
CMD ["node", "index.js"]
EXPOSE 8080

FROM node:18-alpine
#wget for healthcheck
RUN apk add --no-cache wget
WORKDIR /app
COPY package*.json .
RUN npm install
COPY index.js .
EXPOSE 3000
CMD ["node", "index.js"]

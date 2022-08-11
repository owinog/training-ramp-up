FROM node:16.15.1 AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5500
CMD ["node", "dist/apps/file-processing/main"]
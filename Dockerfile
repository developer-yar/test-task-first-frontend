FROM node:alpine
WORKDIR /usr/app/front
ENV PORT=3000
EXPOSE ${PORT}
COPY package*.json ./
RUN npm install
CMD ["npm", "start"]
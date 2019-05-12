FROM node:10.15.0
WORKDIR /usr/src/
COPY package.json package-lock.json ./
RUN npm i
ADD . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"]

FROM node:16.18.0-alpine

LABEL author="ifedun.jeremiah@gmail.com"

RUN mkdir -p /root/onebrick
WORKDIR /root/onebrick

COPY . .

RUN npm install

EXPOSE 3030

CMD ["npm", "start"]
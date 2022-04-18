FROM node:17

EXPOSE 3000

RUN mkdir /sample
WORKDIR /sample

COPY . /sample
RUN npm install

RUN npm run build

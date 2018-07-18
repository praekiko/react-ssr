FROM node:8.11.3-alpine

ARG APP_DIR=/app

RUN mkdir ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package.json ${APP_DIR}
RUN npm install

COPY scripts ${APP_DIR}/scripts
COPY src ${APP_DIR}/src
COPY webpack ${APP_DIR}/webpack

COPY .babelrc ${APP_DIR}
COPY postcss.config.js ${APP_DIR}

COPY index.js ${APP_DIR}

EXPOSE 8080

RUN npm run build

CMD ["npm", "run", "start"]
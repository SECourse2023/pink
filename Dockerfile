FROM node:18-alpine

RUN mkdir -p /app
COPY . /app
WORKDIR /app

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]

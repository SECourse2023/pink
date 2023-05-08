FROM node:18-alpine

RUN mkdir -p /app
COPY apps/server /app
COPY .yarnrc.yml /app
WORKDIR /app
RUN corepack yarn install
COPY apps/ui/out /app/public

EXPOSE 8848

CMD ["node", "."]
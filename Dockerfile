FROM node:18-alpine

RUN mkdir -p /app
COPY apps/server /app
WORKDIR /app
RUN corepack yarn install --frozen-lockfile
COPY apps/ui/out /app/public

EXPOSE 8848

ENTRYPOINT ["node", "."]
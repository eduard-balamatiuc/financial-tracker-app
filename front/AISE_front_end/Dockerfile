FROM node:slim
WORKDIR /app
COPY ./dist .
RUN npm install -g serve
EXPOSE 3000
CMD ["npx", "serve", "-s", "."]



FROM node:18.15.0 as build
WORKDIR /app

COPY ./package.json .
RUN npm install --force
COPY . .
RUN npm install -g @angular/cli
RUN ng build

FROM nginx as runtime
COPY --from=build /app/dist/DjangularTodoFrontend /usr/share/nginx/html
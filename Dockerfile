# Stage 1: Build the Angular application
FROM node:18 as build

ARG BUILD_CONFIGURATION=docker

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=${BUILD_CONFIGURATION}

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/app-playlist-manager-front/browser /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

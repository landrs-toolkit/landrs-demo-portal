FROM node:lts-alpine as build-stage

# Make sure to include the variables from NGINX.
ARG VUE_APP_AXIOS_BASE_URL
ARG VUE_APP_GRANT_TYPE
ARG VUE_APP_CLIENT_ID
ARG VUE_APP_CLIENT_SECRET

# Copy build files.
COPY ./ /app

# make the 'app' folder the current working directory
WORKDIR /app

# Install and build.
RUN apk add --no-cache git && npm install && npm run build

# PRODUCTION-STAGE
FROM nginx:stable-alpine as production-stage

# Copy the dist folder from the build-stage into app.
COPY --from=build-stage /app/dist /app

# Copy a default nginx.conf with all the necessary configurations.
COPY nginx.conf /etc/nginx/nginx.conf
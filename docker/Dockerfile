FROM node:22 AS build
WORKDIR /frontend-app

# Copy only package*.json for the npm ci cache
COPY package*.json ./
RUN npm ci

# Copy rest of the project files**
COPY . .

# Build project
RUN npm run build

# Final stage: serve with nginx
FROM nginx:alpine
COPY --from=build /frontend-app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
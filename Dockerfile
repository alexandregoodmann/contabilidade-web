FROM nginx:alpine
COPY dist/contabilidade-web/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
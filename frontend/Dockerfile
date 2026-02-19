FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html

# Kopiere die eigene Nginx-Konf (überschreibt die Standard-Konf)
COPY nginx.conf /etc/nginx/conf.d/default.conf


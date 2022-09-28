clear 
sudo ng build --prod
docker build -t contabilidade/contabilidade-web .
docker run --name contabilidade-web -d -p 80:80 contabilidade/contabilidade-web


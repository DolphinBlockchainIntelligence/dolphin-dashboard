# docker build -t dashboard . && docker run -d --name dashboard -e "WEBPORT=80" -e "REGURL=http://localhost:3000" -p 5004:80 dashboard
#
FROM node:7.10-alpine
LABEL maintainer="Eugen Soloviov"
RUN apk update && apk upgrade && apk add --no-cache git
COPY server /server
COPY client /client
RUN cd /client && npm install && npm run build && mv /client/build /server/public
COPY register.json /server/register.json
WORKDIR /server
RUN npm install
CMD ["node","index.js"]
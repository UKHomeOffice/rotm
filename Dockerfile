FROM node:5.6

RUN /usr/sbin/useradd --create-home --home-dir /app --shell /bin/bash app 
RUN chown -R app /app
USER app

WORKDIR /app
COPY package.json /app/package.json
COPY assets /app/assets
ENV HOME /app
RUN npm install
COPY . /app

USER root
RUN npm install -g nodemon
EXPOSE 8080

USER app
ENTRYPOINT [ '/app/run.sh' ]


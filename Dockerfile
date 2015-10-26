# Node image to build on top of
FROM node:4.1.2

# Install nodemon
RUN npm install -g nodemon

# Create the app user and the app directory
RUN groupadd app           \
 && useradd -mg app app    \
 && mkdir -p /srv/app      \
 && chown app:app /srv/app

# Switch to the app user
USER app
WORKDIR /srv/app

# Copy files required by the app
COPY . /srv/app

# Install dependencies
RUN npm install

# Go!
EXPOSE 8080
ENV DOCKER 1
CMD ./run.sh


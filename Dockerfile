# Each instruction in this file creates a new layer
# Here we are getting our node as Base image
FROM node:16.15.0-alpine
# Creating a new directory for app files and setting path in the container
RUN mkdir -p /usr/src/neuroweb
# setting working directory in the container
WORKDIR /usr/src/neuroweb
# copying the package.json file(contains dependencies) from project source dir to container dir
COPY package*.json ./
# installing the dependencies into the container
RUN npm install
# copying the source code of Application into the container dir
COPY . /usr/src/neuroweb
# container exposed network port number
EXPOSE 3000
# setup of environment variables
ENV ENV="production"
ENV REQUEST_LOG_FILE="log-file.log"
ENV REQUEST_LOG_FORMAT="common"
ENV DEBUG="neuroweb:*"
# command to run within the container
CMD ["node", "./bin/www"]

# Setting the base to nodejs 8.9.4
FROM node:8.14.0-alpine@sha256:fa979a27cee3c8664a689e27e778b766af72da52920454160421854027374f09

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT npm start

FROM node:16.15.1

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
# Wildcard for all packages in package.json and package-lock,json

COPY package*.json ./

RUN npm install

# install dependencies for poduction
# RUN npm ci --only=prodution

# Bundle app source

COPY . . 

EXPOSE 8080

CMD ["npm", "src/server.js"]



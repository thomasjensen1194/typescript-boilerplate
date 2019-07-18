FROM node:10.16.0

# Create app dir
WORKDIR /usr/src/app

# Copy package*.json
COPY package*.json  ./

RUN npm ci --only=production

COPY . .

RUN ["npm", "run", "build"]

CMD [ "npm", "start" ]
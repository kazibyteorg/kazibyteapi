# Use the official Node.js image as the base image
FROM node:22-alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the app source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Start the app
CMD ["npm", "run", "serve"]

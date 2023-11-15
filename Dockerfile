# Use an official Node.js runtime as base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 4000 (the port your app is listening on)
EXPOSE 4000

# Define the command to run your application
CMD ["node", "app.js"]

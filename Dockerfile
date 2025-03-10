# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 8000

# Define the command to run your app
CMD ["npm", "start"]
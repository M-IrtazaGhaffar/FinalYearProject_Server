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

# Generate the Prisma Client
RUN npx prisma generate

# Set environment variables
ENV PORT="8000"
ENV JWT_SECRET="FinalYearProject"
ENV DATABASE_URL="mysql://root:aXJ0YXphQDIwMDM=@13.200.127.249:3306/advanced_pos?schema=public"

# Expose the port your app will run on
EXPOSE 8000

# Define the command to run your app
CMD ["npm", "start"]
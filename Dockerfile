# specfic a full version to ensure all developers use the same version of node
FROM node:8.0.0

# Create app directory
WORKDIR /app


# Copy all local files into the image
COPY . .


# Install dependencies
RUN npm install 


# Tell Docker about the port that we will run on 
EXPOSE 4000


# Set the command to run the node server.
CMD npm run dev
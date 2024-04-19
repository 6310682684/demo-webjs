FROM node:15
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Port 
EXPOSE 3300

# Start application
CMD ["npm", "start"]
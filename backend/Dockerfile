# Use a lighter version of Node as a parent image
FROM nikolaik/python-nodejs:python3.8-nodejs15

# Set the working directory to /api
WORKDIR /backend
# copy package.json into the container at /api
COPY package*.json /backend/
# install dependencies
RUN npm install
RUN npm install python-shell

RUN npm install -g nodemon
# Copy the current directory contents into the container at /api
COPY . /backend/

# install java
RUN apt update
RUN apt -y install default-jre
#create python virtual environment

RUN python -m venv venv
RUN . venv/bin/activate
#install python requirements
RUN pip install -r requirements.txt
# Make port 80 available to the world outside this container

# Run the app when the container launches
CMD ["nodemon", "start"]
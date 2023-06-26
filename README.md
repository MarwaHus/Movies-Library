# Movies-Library

**Author Name**: Marwa Hussein

## WRRC

![WRRC](lab13.PNG)

## Overview

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
**TO build your app on machine do this steps:**

- Create a new project folder
- Initialize the project: Run "npm init -y"
- Install dependencies: Use "npm install"
- Create the app
- Test the app:by running "node server.js"
- Deploy the app

## Project Features
<!-- What are the features included in you app -->
- Create routes with there methods.
  - Home
  - Favorite
  - server error
  - page not found error
- This project makes two requests to the Movie DB API:
  1- /trending: Gets the data for the first trending movie
  2- /search: Search for a movie name to get its information
- Set database to save and read data
  1- create a post request (/addMovie)taht will sava movie id,title and year.
  2- Create a get request (/getMovies)to get all the data from the database
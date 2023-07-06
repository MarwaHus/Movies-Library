  
"use strict"

const express = require("express");
const cors=require("cors");
require("dotenv").config();
const data=require("./Movie-data/data.json")
const movieRoutes =require("./routes/movie.routes")
const generalRoutes =require("./routes/general.routes")
const client = require("./client");
const notFound = require("./error_handler/404");
const internalError = require("./error_handler/500");
const {PORT} = require("./configs");
const app =express();
app.use(cors());
app.use(express.json());

app.use(movieRoutes);
app.use(generalRoutes);
app.use(notFound);
app.use(internalError);

client.connect().then(()=> {
  app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
  });
});
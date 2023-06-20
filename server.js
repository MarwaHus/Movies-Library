"use strict"

const express = require("express");

const app =express();
const data=require("./Movie-data/data.json")

app.get("/",handelHome);
function handelHome(req,res){
    console.log("Home page");
    
    res.send({
        "title": "Spider-Man: No Way Home",
        "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
        });
}
//-------------------------------------//
app.get("/favorite",handelFavorite);
function handelFavorite(req,res){
    console.log("Welcome to Favorite Page");
}
//--------------------------------------//
/*app.get("*",handleServerError);
function handleServerError(err, res) {
    const response = {
      status: 500,
      responseText: "Sorry, something went wrong"
    };
    console.error(err);
    return response;
  }*/
  //----------------------------//
  app.get("*",handleNotFoud)
  function handleNotFoud(req, res) {
    res.send({
        "status": 404,
        "responseText": "page not found error"
    });
  }
  //------------------------------//
app.listen(3000,startingLog);
function startingLog(req,res){
    console.log("running at 3000");
}


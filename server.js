"use strict"

const express = require("express");

const app =express();
const data=require("./Movie-data/data.json")
 

function Movie (title,genre_ids,original_language,original_title,poster_path,video,vote_average,
  overview,release_date,vote_count,id,adult,backdrop_path,popularity,media_type)
  {
    this.title = title;
    this.genre_ids = genre_ids;
    this.original_language = original_language;
    this.original_title = original_title;
    this.poster_path = poster_path;
    this.video = video;
    this.vote_average = vote_average;
    this.overview = overview;
    this.release_date = release_date;
    this.vote_count = vote_count;
    this.id = id;
    this.adult = adult;
    this.backdrop_path = backdrop_path;
    this.popularity = popularity;
    this.media_type = media_type;
}
const movie = new Movie(

  data.title,
    data.genre_ids,
    data.original_language,
    data.original_title ,
    data.poster_path ,
    data.video ,
    data.vote_average ,
    data.overview,
    data.release_date,
    data.vote_count ,
    data.id ,
    data.adult ,
    data.backdrop_path ,
    data.popularity ,
    data.media_type ,
);
app.get("/",handelHome);
function handelHome(req,res){
    console.log("Home page");
    res.send(movie);
   
}
//-------------------------------------//
app.get("/favorite",handelFavorite);
function handelFavorite(req,res){
    res.send("Welcome to Favorite Page");
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
  //-----------------------------------//
  app.get("*",handleNotFoud)
  function handleNotFoud(req, res) {
    res.send({
        "status": 404,
        "responseText": "page not found error"
    });
  }
  //----------------------------------//
app.listen(3000,startingLog);
function startingLog(req,res){
    console.log("running at 3000");
}


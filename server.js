"use strict"

const express = require("express");
const app =express();
require("dotenv").config();
const data=require("./Movie-data/data.json")
const axios =require("axios");
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
//----------------------------------------//
app.get("/trending",async(req,res)=>{
 // let tm =  req.query.m;
  let axiosRes= await axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US');
//`${process.env.TRENDING_MOVIES}?movie=${tm}`
const filteredMovies= axiosRes.data.results.filter(movie =>movie.title === "Spider-Man: Across the Spider-Verse");
const trend=filteredMovies.map(movie=>({id:movie.id,
                                        title:movie.title,
                                        release_date:movie.release_date,
                                        poster_path:movie.poster_path,
                                        overview:movie.overview}));
  res.send(trend);
});
//--------------------------------------//

app.get("/search",async(req,res)=>{
 // let searchName=req.query;
  //console.log(searchName);
  let axiosSearch= await axios.get("https://api.themoviedb.org/3/search/movie?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=The&page=2");
 // let a = searchName.movie;
//  a=axiosSearch.data.results.filter(m => m.title === searchName);
  res.send(axiosSearch);
})


//---------------------------------------//
  app.use((req, res, next) => {
    res.status(404).send({
      code: 404,
      message: "Not Found",
      extra: "you can visit only /, /favorite,/trending routes ",
    });
  }); 
  
  app.use((err, req, res, next) => {
    res.status(500).send({
      code: 500,
      message: "Server Error",
      error: err,
    });
  }); 
  
  //----------------------------------//
app.listen(3000,startingLog);
function startingLog(req,res){
    console.log("running at 3000");
}


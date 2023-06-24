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
/*app.get("/trending",async(req,res)=>{
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
});*/
app.get("/trending", async (req, res) => {
 // const url = `${process.env.TRENDING_MOVIES}?api_key=${process.env.API_KEY}&language=en-US`;

    const response = await axios.get(`${process.env.TRENDING_MOVIES}?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US`);

    const results = response.data.results.filter(item => item.media_type === "movie" || item.media_type === "tv")
    .map(item => {
        const {
          id,
          title,
          overview,
          poster_path,
          release_date,
          vote_count
        } = item;
        return {
          id,
          title,
          release_date,
          poster_path, 
          overview,
          vote_count
         
        };
      })
      .sort((a, b) => b.vote_count - a.vote_count); 

    const getData={
      total_pages: response.data.total_pages,
      total_results: results.length,
      results: results
    };
res.send(getData);

});
//--------------------------------------//


app.get("/search", async (req, res) => {
  
    const searchName = req.query.s;
   // const page = req.query.page; 
    const response = await axios.get(`${process.env.SEARCH_MOVEIS}?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=${searchName}&page=2`)
    const results = response.data.results.map(movie => {
      const {
        id,
        original_language,
        title,
        original_title,
        overview,
        poster_path,
        release_date,
        vote_average
      } = movie;

      return {
        id,
        original_language,
        title: title,
        original_title,
        overview,
        poster_path,
        release_date,
        vote_average
      };
    });

    const responseData = {
      total_results: response.data.total_results,
      total_pages: response.data.total_pages,
      results
    };
    res.send(responseData);

  } 
);

//---------------------------------------//
  app.use((req, res, next) => {
    res.status(404).send({
      code: 404,
      message: "Not Found",
      extra: "you can visit only /, /favorite,/trending,/search routes only ",
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


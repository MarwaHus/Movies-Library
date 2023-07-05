"use strict";
const express=require("express");
const axios = require("axios");
const Router=express.Router();



Router.get("/",handelHome);
function handelHome(req,res){
    console.log("Home page");
    res.send("home page");
   
}
//-------------------------------------//
Router.get("/favorite",handelFavorite);
function handelFavorite(req,res){
    res.send("Welcome to Favorite Page");
}
//----------------------------------------//

Router.get("/trending", async(req,res,next)=>{
  try{
  let axiosRes= await axios.get(`${process.env.TRENDING_MOVIES}?api_key=${process.env.API_KEY}&language=en-US`);
  const trendingMovies = axiosRes.data.results;
  const movieData = trendingMovies.find(movie => movie.id === 634649);
  const filteredMovie ={id:movie.id,
    title:movie.original_title,
    release_date:movie.release_date,
    poster_path:movie.poster_path,
    overview:movie.overview}

  res.send(filteredMovie);}
  catch(e){
    next("trending"+e)
  }
});

//--------------------------------------//
Router.get("/search", async (req, res) => {
  

    const searchName = req.query.s;
   // const page = req.query.page; 
    const response = await axios.get(`${process.env.SEARCH_MOVEIS}?api_key=${process.env.API_KEY}&language=en-US&query=${searchName}&page=2`)
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
//-----------------------------------------//
Router.get("/getId" ,async(req,res)=>{
let id=req.query.i;
let axiosId= await axios.get(`${process.env.ID_MOVIES}/${id}?api_key=${process.env.API_KEY}&language=en-US`);
res.send(axiosId.data);
})

Router.get('/topRatedAction2021', async (req, res) => {
    const response = await axios.get(`${process.env.TOP}?api_key=${process.env.API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&primary_release_year=2021&with_genres=28`);
    const topRatedAction2021 = response.data.results.map(movie => {
      return { 
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        genres: movie.genre_ids
      }
    });
    res.send(topRatedAction2021)
});

module.exports=Router;
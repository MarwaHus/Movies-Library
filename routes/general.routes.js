"use strict";
const express=require("express");
const axios = require("axios");
const {TRENDING_MOVIES,API_KEY,SEARCH_MOVEIS,ID_MOVIES,TOP} = require("../configs");
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

/*Router.get("/trending", async(req,res,next)=>{
  try{
  let axiosRes= await axios.get(`${TRENDING_MOVIES}?api_key=${API_KEY}&language=en-US`);
  const trendingMovies = axiosRes.data.results;
  const movieData = trendingMovies.find(movie => movie.id === 634649);
 const filteredMovie ={id:movieData.id,
    title:movieData.original_title,
    release_date:movieData.release_date,
    poster_path:movieData.poster_path,
    overview:movieData.overview}

  res.send(trendingMovies);}
  catch(e){
    next("trending"+e)
  }
});*/
Router.get("/trending", async (req, res, next) => {
  try {
    const axiosRes = await axios.get(`${TRENDING_MOVIES}?api_key=${API_KEY}&language=en-US`);
    const trendingMovies = axiosRes.data.results;
    res.send(trendingMovies);
  } catch (error) {
    next("trending" + error);
  }
});
//--------------------------------------//
Router.get("/search", async (req, res) => {
  

    const searchName = req.query.s;
   // const page = req.query.page; 
    const response = await axios.get(`${SEARCH_MOVEIS}?api_key=${API_KEY}&language=en-US&query=${searchName}&page=2`)
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
let axiosId= await axios.get(`${ID_MOVIES}/${id}?api_key=${API_KEY}&language=en-US`);
res.send(axiosId.data);
})

Router.get('/topRatedAction2021', async (req, res) => {
    const response = await axios.get(`${TOP}?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&primary_release_year=2021&with_genres=28`);
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
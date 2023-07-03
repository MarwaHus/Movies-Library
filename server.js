"use strict"

const express = require("express");
const cors=require("cors");
const app =express();
require("dotenv").config();

const cors=require("cors");
app.use(cors());

//app.use(express.json()); 

const data=require("./Movie-data/data.json")
const axios =require("axios");
app.use(cors());
app.use(express.json());
const db_url=process.env.DATABASE;
const client= new pg.Client(db_url);

const PORT = process.env.PORT;
client.connect().then(()=> {
  app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
  });
});


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

app.get("/trending", async(req,res)=>{
  let axiosRes= await axios.get(`${process.env.TRENDING_MOVIES}?api_key=${process.env.API_KEY}&language=en-US`);
  const trendingMovies = axiosRes.data.results;
  const movieData = trendingMovies.find(movie => movie.id === 634649);
  const filteredMovie = {id:movie.id,
    title:movie.original_title,
    release_date:movie.release_date,
    poster_path:movie.poster_path,
    overview:movie.overview}

  res.send(filteredMovie);
});

//--------------------------------------//
app.get("/search", async (req, res) => {
  

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
app.get("/getId" ,async(req,res)=>{
let id=req.query.i;
let axiosId= await axios.get(`${process.env.ID_MOVIES}/${id}?api_key=${process.env.API_KEY}&language=en-US`);
res.send(axiosId.data);
})

app.get('/topRatedAction2021', async (req, res) => {
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



//------------------------------------------------//Lab 13
app.post("/addMovie",(req,res)=>{
let title=req.body.t;
let overview=req.body.o;
let comment=req.body.c;
  let sql =`insert into movie(title,overview,comment)values($1,$2,$3)`;
  client.query(sql,[title,overview,comment]).then(()=>{
    res.status(201).send(` title: ${title}, overview:${overview} , commit ${comment} is added `);
  });
//res.send(req.body);
});
//-----------------------------------------//
app.get("/getMovies",(req,res)=>{
  let sql =`select * from movie`;
  client.query(sql).then((movieData)=>{
res.status(200).send(movieData.rows);
  });
});

//---------------------------------------//Lab13
  app.use((req, res, next) => {
    res.status(404).send({
      code: 404,
      message: "Not Found",
      extra: "you can visit only /, /favorite,/trending,/search ,/addMovie,/getMovies routes only ",
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
//  app.listen(3000,startingLog);
//  function startingLog(req,res){
//      console.log("running at 3000");
//  }


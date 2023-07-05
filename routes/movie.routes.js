"use strict";
const express = require("express");
const axios = require("axios");
const client = require("../client");
const Router = express.Router();

Router.get("/getMovies", (req, res,next) => {
  try{
  let sql = `select * from movie`;
  client.query(sql).then((movieData) => {
    res.status(200).send(movieData.rows);
  });
}catch(e){
next("get"+e)
}
});
Router.get("/getMovie/:id", (req, res,next) => {
  try{
  let sql = `SELECT * FROM movie WHERE id=${req.params.id}`;
  client.query(sql).then((movieData) => {
    res.status(200).send(movieData.rows);
  });
}catch(e){
next("getid"+e)
}
});

Router.post("/addMovie", (req, res,next) => {
  try{
  let title = req.body.t;
  let overview = req.body.o;
  let comment = req.body.c;
  //{
  // "t":"",
  // "o":"",
  //  "c":""
  //}
  let sql = `insert into movie(title,overview,comment)values($1,$2,$3)`;
  client.query(sql, [title, overview, comment]).then(() => {
    res.status(201).send(` title: ${title}, overview:${overview} , commit ${comment} is added `);
  });
}catch(e){
next("add"+e)
}

});


Router.delete("/DELETE/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let sql = `DELETE FROM movie WHERE id =${id}`;
    let data = await client.query(sql);
    res.status(204).send(`Movie:${id} deleted`);
  } catch (e) {
    next("delete" + e);
  }
});

Router.put("/UPDATE/:id", (req, res, next) => {
  try {
    let { newComment } = req.body;
    // {
    //   "newComment":""
    // }
    let sql = `UPDATE movie SET comment=$1 WHERE id =${req.params.id}`;
    client.query(sql, [newComment]).then((data) => {
      res.status(200).send('comment updeted');
    })
  } catch (e) {
    next("update" + e);
  }
})


module.exports = Router;
const express = require('express');
const app = express();
const { Joke } = require('./db');
const { Op, where } = require('sequelize');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req,res, next) => {
  // the code checks whether the the query parameters "tags" or "content" is present in the request 
  // if a "tags" query parameter is present, use the Sequelize "findAll" method to filter joke by this tag 
  // if a "content" query parameter is present, use the findAll method again to filter by this substring 
  // if neither is present, will return all the jokes in the database and sends the filtered jokes as a response 
    try {
        if(req.query.tags) {
            jokes = await Joke.findAll({where: { tags:{[Op.substring]: req.query.tags }}})
          } 
          if(req.query.content)
          {
            jokes = await Joke.findAll({where: { joke: {[Op.substring]: req.query.content }}})
          }
          if(!req.query.tags && ! req.query.content)
          {
            jokes = await Joke.findAll()
          }
          res.send(jokes);
    } catch (error) {
        console.log(error)
        next(error)
    }
})
module.exports = app;

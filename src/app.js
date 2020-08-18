const express = require("express");
const { request, response } = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

    return response.json(repositories)
});

app.post("/repositories", (request, response) => {
    const {title, url, techs} = request.body
    const likes = 0

    const repository = {id: uuid(), title, url , techs,likes}

    console.log(repository)

    repositories.push(repository)

    return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params
    const {title, url, techs} = request.body

    const repositoryIndex= repositories.findIndex(repository => repository.id === id)

    console.log(repositoryIndex)
    
    if(repositoryIndex < 0){
      return response.status(400).json({ erro:"Repository not found!"})
    }

    const repository = {
      id,
      title,
      url,
      techs,
    }

    repositories[repositoryIndex]=repository

    return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
    
  const repositoryIndex= repositories.findIndex(repository => repository.id === id)

    console.log(repositoryIndex)
    
    if(repositoryIndex < 0){
      return response.status(400).json({ erro:"Repository not found!"})
    }

    repositories.splice(repositoryIndex, 1)

    return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;

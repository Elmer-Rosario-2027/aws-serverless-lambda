'use strict';

const serverless = require('serverless-http');
const express = require('express')

const Swapi = require("./helpers/swapi");
const Crud = require("./helpers/crud")
const { responseStatus } = require('./libs/swapApi');

const app = express()
app.use(express.json());


/****************************** */
/** list record by id */
/****************************** */
let CrudApi = new Crud();
app.get('/users/:userId', function (request, response) {

    CrudApi.ListItemById(request.params.userId).then(item => {
      response.status(200).json({reponse: item})
    }).catch(error => {
      response.status(500).json(error)
    })
})

/****************************** */
/** list all records  */
/****************************** */
app.get('/usersAll', async (request, response) => {

  try {

    let respItem = await CrudApi.ListItems();
    response.status(200).json(responseStatus(true, respItem))
  } catch (error) {
    response.status(500).json(responseStatus(false, `Internal server error`))
  }
})

/****************************** */
/**register a model */
/****************************** */
app.post('/users', function (request, response) {

  let { userId, name } = request.body;

  if (typeof userId !== 'string') {
    response.status(400).json(responseStatus(false, 'userId must be a string' ));
  } else if (typeof name !== 'string') {
    response.status(400).json(responseStatus(false, 'name must be a string' ));
  }

  CrudApi.CreateItems(userId, name)
  .then(item => {
    response.status(200).json(responseStatus(true, item))
  }).catch(error => {
    response.status(500).json(responseStatus(false, `Internal server error`))
  })
})


/****************************** */
/** StarWars API test api integration  */
/****************************** */
var swappi = new Swapi();
app.get("/swapi/:id", (request, response) => {

  if(!request.params.id){
    response.status(404).json({reponse: `id not found ` })
  }

  let { id } = request.params;
  swappi.SwapiPlanetById(parseInt(id))
  .then(item => {
    if(item.status === 200){
        response.status(200).json(responseStatus(true, item))
    } else {
      response.status(404).json(responseStatus(false, `id ${id} not found `))
    }
  }).catch(error => {
    response.status(500).json(  responseStatus(false, `Internal server error`))
  })
})


module.exports.handler = serverless(app);
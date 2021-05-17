const axios = require('axios').default;

function SwapiServices(){}
SwapiServices.prototype.SwapiPlanetById = async (IdPlanet) => {
      return  await axios.get(`https://swapi.py4e.com/api/planets/`+IdPlanet)
}

module.exports = SwapiServices;
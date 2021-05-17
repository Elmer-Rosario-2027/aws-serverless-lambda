const Services = require('../service/services');
const listName = require('../libs/translate')

Object.prototype.renameProperty = function (name, newName) {
      // no hacer nada si los nombre son iguales
      if (name == newName) {
        return this;
      }
      // Verificar si ya existe la propiedad con el nombre nuevo y evitar errores.
      if (this.hasOwnProperty(name)) {
        this[newName] = this[name];
        delete this[name];
      }
      return this;
};


const services = new Services();
function Swapi(){}
Swapi.prototype.SwapiPlanetById = async (IdPlanet)=>{
      try{
            let response = await services.SwapiPlanetById(IdPlanet)
            let status = response.status === 200;

            var SwapiPlanet= {}
            if(status){
                  var swapiObj = response.data;
                  /** proceso que mapea las claves del objeto de ingles a español :  desde una lista simulada*/
                  Object.keys(swapiObj).forEach(item => {
                        listName.forEach(element => {
                              if( item === element.en)
                              swapiObj.renameProperty(item, element.es);
                        })
                  })
                  SwapiPlanet.status = 200;
                  SwapiPlanet.data = swapiObj;
            } else {
                  SwapiPlanet.status = 404;
                  returnSwapiPlanet.data = "no existe data";
            }
            return SwapiPlanet; 
      } catch (error){
            throw error;
      }
}

module.exports = Swapi;
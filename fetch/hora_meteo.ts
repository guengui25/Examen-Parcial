//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response


const hora_meteo = async (req: Request, res: Response,contacto) => {
// Llamadas a las APIS
    
try{
    
    //CONTINENTE
    const response_continente = await fetch( //Llamada a la API
    `https://restcountries.com/v3.1/alpha/${contacto.iso_code}`
    );

    if (response_continente.status !== 200) {  //Compruebo si la API ha respondido correctamente - El estado 200 es error
        res.status(500).send("Error continente");
        return;
    }

    const continente = (await response_continente.json())[0].continents;
    
    //HORA ACTUAL
    const response_hora = await fetch( //Llamada a la API
        `http://worldtimeapi.org/api/timezone/${continente}/${pais_ciudad.place_name}`
    );

    if (response_hora.status !== 200) {  //Compruebo si la API ha respondido correctamente - El estado 200 es error
        res.status(500).send("Error Hora");
        return;
    }

    const hora = (await response_hora.json()).datetime;

    //HORA ACTUAL
    const response_meteorologia = await fetch( //Llamada a la API
      `http://api.weatherapi.com/v1/current.json?key=edca534c431546568e7163709230510 &q=${pais_ciudad.place_name}&aqi=no`
    );

    if (response_meteorologia.status !== 200) {  //Compruebo si la API ha respondido correctamente - El estado 200 es error
      res.status(500).send("Error meteorologia");
      return;
    }

    const meteorologia = (await response_meteorologia.json()).current.condition.text;

    return {
        hora: hora ,
        meteorologia: meteorologia
    }

} catch (error) {

    res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

    return; // Corto la ejecucion de la funcion
}
}

export default hora_meteo; // Exporto la funcion

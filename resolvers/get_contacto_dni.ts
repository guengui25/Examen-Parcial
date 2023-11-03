//==================================================
// GET = Obtener X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"

import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import ContactoModel from "../db/contacto.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import
                                                
const get_contacto_dni = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
  
    try {
    const { dni } = req.params; // Obtengo el dni de los parametros de la peticion

    const contacto = await ContactoModel.findOne({ dni }).exec(); // Busco el dni de X en la base de datos

    if (!contacto) { // Si no existe X con ese dni, devuelvo un error

      res.status(404).send("Contacto not found"); // Devuelvo un error

      return; // Corto la ejecucion de la funcion
    }

    // Llamadas a las APIS
    
    //CIUDAD Y PAIS
    const response_pais_ciudad = await fetch( //Llamada a la API
        `https://zip-api.eu/api/v1/info/${contacto.iso_code}-${contacto.postal_code}`
    );

    if (response_pais_ciudad.status !== 200) {  //Compruebo si la API ha respondido correctamente - El estado 200 es error
        res.status(500).send("Error pais_ciudad");
        return;
    }

    const pais_ciudad = await response_pais_ciudad.json();
    
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

    

    // Devuelvo los datos del personaje y losnombres de los episodios

    res.status(200).send({ // Si existe X con ese dni, devuelvo X
      dni: contacto.dni,
      name_surname: contacto.name_surname,
      email: contacto.email,
      postal_code: contacto.postal_code,
      //id: contacto._id.toString()
      ciudad: pais_ciudad.place_name,
      pais: pais_ciudad.state ,
      hora: hora ,
      meteorologia: meteorologia,
    });

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default get_contacto_dni; // Exporto la funcion

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

import {contacto} from "../types.ts";  // Importo el modelo de la base de datos

const detalles_contacto = async (req: Request, res: Response,contacto:contacto) => {
// Llamadas a las APIS
    
try{
    //CIUDAD Y PAIS
    const response_pais_ciudad = await fetch( //Llamada a la API
        `https://zip-api.eu/api/v1/info/${contacto.iso_code}-${contacto.postal_code}`
    );

    if (response_pais_ciudad.status !== 200) {  //Compruebo si la API ha respondido correctamente - El estado 200 es error
        res.status(500).send("Error pais_ciudad");
        return;
    }

    const pais_ciudad = await response_pais_ciudad.json();

    return {      
        ciudad: pais_ciudad.place_name,
        pais: pais_ciudad.state
    }

} catch (error) {

    res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

    return; // Corto la ejecucion de la funcion
}
}

export default detalles_contacto; // Exporto la funcion

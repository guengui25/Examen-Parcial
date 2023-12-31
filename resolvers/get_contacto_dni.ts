//==================================================
// GET = Obtener X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"

import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

import hora_meteo from "../fetch/hora_meteo.ts";

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

    const hora = (await hora_meteo(req,res,contacto))?.hora;
    const meteorologia = (await hora_meteo(req,res,contacto))?.meteorologia;

    // Devuelvo los datos del personaje y losnombres de los episodios

    res.status(200).send({ // Si existe X con ese dni, devuelvo X
      dni: contacto.dni,
      name_surname: contacto.name_surname,
      email: contacto.email,
      postal_code: contacto.postal_code,
      //id: contacto._id.toString()
      ciudad: contacto.ciudad,
      pais: contacto.pais ,
      hora: contacto.hora ,
      meteorologia: meteorologia,
    });

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default get_contacto_dni; // Exporto la funcion

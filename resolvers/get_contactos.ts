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

const get_contactos = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
  
    try {
    const contactos = await ContactoModel.find().exec();

    if (!contactos) { // Si no existe X con ese dni, devuelvo un error

      res.status(404).send("Contactos not found - EMPTY"); // Devuelvo un error

      return; // Corto la ejecucion de la funcion
    }

    // Filtro la información
    const nombre_dni = contactos.map(elem => {
      return {nombre:elem.name_surname,dni:elem.dni};
    })

    res.status(200).send(nombre_dni); //Devuelvo el array

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default get_contactos; // Exporto la funcion

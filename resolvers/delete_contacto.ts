//==================================================
// DELETE = Borrar X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import ContactoModel from "../db/contacto.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import

const delete_contacto = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
  try {

    const { dni } = req.params; // Obtengo el dni de los parametros de la peticion

    const deleted = await ContactoModel.findOneAndDelete({ dni }).exec(); // Busco el dni de X en la base de datos

    if (!deleted) { // Si no existe X con ese dni, devuelvo un error

      res.status(404).send("Contacto not found"); // Devuelvo un error

      return; // Corto la ejecucion de la funcion
    }

    res.status(200).send("Contacto deleted"); // Si se ha borrado correctamente, devuelvo un mensaje de que se ha borrado correctamente

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default delete_contacto; // Exporto la funcion

//==================================================
// GET = Obtener X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"

import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import PlantillaModel from "../db/ejemplo.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import

const get_plantilla = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
  
    try {
    const { dni } = req.params; // Obtengo el dni de los parametros de la peticion

    const X = await PlantillaModel.findOne({ dni }).exec(); // Busco el dni de X en la base de datos

    if (!X) { // Si no existe X con ese dni, devuelvo un error

      res.status(404).send("X not found"); // Devuelvo un error

      return; // Corto la ejecucion de la funcion
    }

    res.status(200).send({ // Si existe X con ese dni, devuelvo X
      dni: X.dni,
      name: X.name,
      age: X.age,
      amigos: X.amigos,
      id: X._id.toString(),
    });

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default get_plantilla; // Exporto la funcion

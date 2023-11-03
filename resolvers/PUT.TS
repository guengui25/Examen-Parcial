//==================================================
// PUT = Actualizar X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import PlantillaModel from "../db/ejemplo.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import
const put_plantilla = async (req: Request, res: Response) => {

  try {
    const { dni } = req.params; // Obtengo el dni de los parametros de la peticion

    const { name, age, amigos } = req.body; // Obtengo los datos del body de la peticion

    if (!name || !age || !amigos) { // Si no estan todos los datos, devuelvo un error
      
        res.status(400).send("Name age and amigos are required"); // Devuelvo un error

        return; // Corto la ejecucion de la funcion
    }

    const updatedX = await PlantillaModel.findOneAndUpdate( // Actualizo la persona con el dni dado
      { dni }, // Busco la persona con el dni dado

      { name, age, amigos }, // Actualizo los datos de la persona con los datos del body de la peticion

      { new: true } // Con new: true, devuelvo la persona actualizada

    ).exec(); // Ejecuto la funcion

    if (!updatedX) { // Si no existe X con el dni dado, devuelvo un error

      res.status(404).send("X not found"); // Devuelvo un error

      return; // Corto la ejecucion de la funcion
    }

    res.status(200).send({  // Si existe X con el dni dado, devuelvo X
        name: updatedX.name,
        age: updatedX.age,
        dni: updatedX.dni,
        amigos: updatedX.amigos,
        id: updatedX._id.toString(),
    });

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default put_plantilla; // Exporto la funcion

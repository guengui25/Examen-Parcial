//==================================================
// PUT = Actualizar X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

import {contacto} from "../types.ts";

import detalles_contacto from "../fetch/detalles_contacto.ts";

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import ContactoModel from "../db/contacto.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import
const put_contacto = async (req: Request, res: Response) => {

  try {
    const { dni } = req.params; // Obtengo el dni de los parametros de la peticion

    const {name_surname, email , postal_code,iso_code } = req.body; // Obtengo los datos del body de la peticion
    if (!name_surname || !email || !postal_code|| !iso_code) { // Si no estan todos los datos, devuelvo un error
    
        res.status(500).send("name_surname,email,postal_code and iso_code are required"); // Devuelvo un error

        return; // Corto la ejecucion de la funcion
    }

    const contacto:contacto = {dni:dni,name_surname:name_surname,email:email,postal_code:postal_code,iso_code:iso_code};

    const detalles_ciudad = (await detalles_contacto(req,res,contacto))?.ciudad;
    const detalles_pais = (await detalles_contacto(req,res,contacto))?.pais;

    const updatedContacto = await ContactoModel.findOneAndUpdate( // Actualizo la persona con el dni dado
      { dni }, // Busco la persona con el dni dado

      { name_surname, email , postal_code,iso_code,detalles_ciudad,detalles_pais}, // Actualizo los datos de la persona con los datos del body de la peticion

      { new: true } // Con new: true, devuelvo la persona actualizada

    ).exec(); // Ejecuto la funcion

    if (!updatedContacto) { // Si no existe X con el dni dado, devuelvo un error

      res.status(404).send("Contacto not found"); // Devuelvo un error

      return; // Corto la ejecucion de la funcion
    }

    res.status(200).send({  // Si existe X con el dni dado, devuelvo X
      dni: updatedContacto.dni,
      name_surname: updatedContacto.name_surname,
      email: updatedContacto.email,
      postal_code: updatedContacto.postal_code,
      iso_code: updatedContacto.iso_code,
      //id: updatedContacto._id.toString()
    });

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default put_contacto; // Exporto la funcion

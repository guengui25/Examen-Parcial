//==================================================
// POST = Nuevo X
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

const post_contacto = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
    try {
        const { dni, name_surname, email , postal_code,iso_code } = req.body; // Obtengo los datos del body de la peticion
        if (!dni || !name_surname || !email || !postal_code|| !iso_code) { // Si no estan todos los datos, devuelvo un error
        
            res.status(500).send("dni,name_surname,email,postal_code and iso_code are required"); // Devuelvo un error

            return; // Corto la ejecucion de la funcion

        }
    
        const alreadyExists = await ContactoModel.findOne({ dni }).exec(); //Compruebo si ya existe una persona con ese dni

        if (alreadyExists) { // Si ya existe una persona con ese dni, devuelvo un error

            res.status(400).send("Person (DNI) already exists");

            return; // Corto la ejecucion de la funcion
        }
    
        const contacto:contacto = {dni:dni,name_surname:name_surname,email:email,postal_code:postal_code,iso_code:iso_code};

        const detalles_ciudad = (await detalles_contacto(req,res,contacto))?.ciudad;
        const detalles_pais = (await detalles_contacto(req,res,contacto))?.pais;

        const newContacto = new ContactoModel({ dni, name_surname, email , postal_code,iso_code,  detalles_ciudad,detalles_pais }); // Creo un nuevo X con los datos del body de la peticion
        //https://mongoosejs.com/docs/documents.html -> Utilizo documentos de Mongo para guardar el nuevo X en la base de datos

        await newContacto.save(); // Guardo el nuevo X en la base de datos
    
        res.status(200).send({
            dni: newContacto.dni,
            name_surname: newContacto.name_surname,
            email: newContacto.email,
            postal_code: newContacto.postal_code,
            iso_code: newContacto.iso_code,
            // id: newContacto._id.toString()
        });
    

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};
    
export default post_contacto; // Exporto la funcion

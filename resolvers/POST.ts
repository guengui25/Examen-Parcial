//==================================================
// POST = Nuevo X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import PlantillaModel from "../db/ejemplo.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import

const post_plantilla = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
    try {
        const { name, age, dni , amigos } = req.body; // Obtengo los datos del body de la peticion
        if (!name || !age || !dni || !amigos) { // Si no estan todos los datos, devuelvo un error
        
            res.status(400).send("Name, dni, age y amigos are required"); // Devuelvo un error

            return; // Corto la ejecucion de la funcion

        }
    
        const alreadyExists = await PlantillaModel.findOne({ dni }).exec(); //Compruebo si ya existe una persona con ese dni

        if (alreadyExists) { // Si ya existe una persona con ese dni, devuelvo un error

            res.status(400).send("Person already exists");

            return; // Corto la ejecucion de la funcion
        }
    
        const newPerson = new PlantillaModel({ name, age, dni,amigos }); // Creo un nuevo X con los datos del body de la peticion
        
        //https://mongoosejs.com/docs/documents.html -> Utilizo documentos de Mongo para guardar el nuevo X en la base de datos

        await newPerson.save(); // Guardo el nuevo X en la base de datos
    
        res.status(200).send({
        name: newPerson.name,
        age: newPerson.age,
        dni: newPerson.dni,
        id: newPerson._id.toString(),
        });

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};
    
export default post_plantilla; // Exporto la funcion

import mongoose from "npm:mongoose@7.6.3"; //Importo mongoose

import { contacto } from "../types.ts"; //Importo el tipo de dato que voy a usar

const Schema = mongoose.Schema; //Creo el esquema de datos

const ContactoSchema = new Schema(
  {
    dni: { type: String, required: true, unique: true },
    name_surname: { type: String, required: true },
    email: { type: String, required: true },
    postal_code: { type: Number, required: true },
    iso_code: { type: String, required: true },
    ciudad: { type: String, required: true },
    pais: { type: String, required: true }
  },
  { timestamps: true }
  //Agrega dos campos a cada documento: "createdAt" y "updatedAt". 
  //Estos campos registrarán la fecha y hora en que se creó el documento por primera vez y la fecha y hora de su última actualización.
);

// Defino un tipo TypeScript llamado "PlantillaModelType". Este tipo se utiliza para representar el modelo de datos de una persona en la base de datos.
export type ContactoModelType = mongoose.Document & Omit<contacto, "id">;
/*
mongoose.Document es una interfaz proporcionada por Mongoose que indica que este tipo es compatible con documentos MongoDB.

Omit<plantilla_tipo, "id"> se utiliza para crear un nuevo tipo que es una versión de "plantilla_tipo" sin el campo "id". 
En otras palabras, este tipo representa un documento de persona sin el campo "id".

En resumen, "PersonModelType" representa el modelo de datos de una persona en la base de datos, excluyendo el campo "id".
*/

export default mongoose.model<ContactoModelType>("Contactos", ContactoSchema); //Exporto el modelo de datos de la plantilla en la base de datos

//Se crea un modelo de datos llamado "plantilla_tipo" que está vinculado al esquema "plantillaSchema" y utiliza el tipo "PlantillaModelType" para definir la estructura de los documentos en la colección.
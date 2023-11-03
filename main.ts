/*=======================================================================================================
Deno deploy
https://docs.deno.com/deploy/manual

ENTREGA
- Enlace a una release de github

- Archivo comprimido generado en la release

- Enlace al despliegue de la aplicación en Deno Deploy.

=======================================================================================================*/

//=======================================================================================================
//  EXPRESS
//=======================================================================================================
//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"

import express from "npm:express@4.18.2"; //Importo express

const app = express();
app.use(express.json());

//=======================================================================================================
//  .ENV
//=======================================================================================================
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts"; //Importo para cargar los .env

//Usar .env
//https://docs.deno.com/runtime/manual/basics/env_variables

//Deno.env
//https://deno.land/api@v1.37.2?s=Deno.Env

const env = await load(); //Cargo los .env

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL"); //Contemplo que se ejecute en Deno Deploy

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}


//=======================================================================================================
//  MONGOOSE
//=======================================================================================================
import mongoose from "npm:mongoose@7.6.3"; //Importo mongoose

//Documentacion de mongoose
//https://www.npmjs.com/package/mongoose
//https://mongoosejs.com/docs/

/*
CUIDADO - LA URL DE MONGO ATLAS TIENE EN LA RUTA LA BASE DE DATOS A LA QUE CONECTARSE

MONGO_URL=mongodb+srv://<user>:<password>@cluster0.ioi135h.mongodb.net/

Nombre_Base_de_datos

?retryWrites=true&w=majority

Dentro de la base de datos, se crean las colecciones (tablas) que se necesiten, estas se corresponden con los modelos de mongoose
*/

//Intento la conexión a la base de datos AtlasMongoDB usando Mongoose
try {
    await mongoose.connect(MONGO_URL);
    console.log("Conexión exitosa a MongoDB");
} catch (error) {
    console.error("Error al conectar a MongoDB:", error);
}

//=======================================================================================================
//  IMPORT DE RESOLVERS
//=======================================================================================================

// import xxx from "./resolvers/xxx.ts";

import post_contacto from "./resolvers/post_contacto.ts";

import put_contacto from "./resolvers/put_contacto.ts";

import delete_contacto from "./resolvers/delete_contacto.ts";

import get_contactos from "./resolvers/get_contactos.ts";

import get_contacto_dni from "./resolvers/get_contacto_dni.ts";


//=======================================================================================================
//  ENDPOINTS
//=======================================================================================================

app

.post("/api/contactos", post_contacto) // POST = Nuevo X  -> POSTMAN -> Body -> raw -> JSON

.put("/api/contactos/:dni", put_contacto) // PUT = Actualizar X -> POSTMAN -> Body -> raw -> JSON

.delete("/api/contactos/:dni", delete_contacto) // DELETE = Borrar X -> Navegador/Postman

.get("/api/contactos", get_contactos) // GET = Obtener X  -> Navegador/Postman

.get("/api/contactos/:dni",get_contacto_dni); // GET = Obtener X  -> Navegador/Postman

//=======================================================================================================
//  SERVER LISTENING
//=======================================================================================================
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
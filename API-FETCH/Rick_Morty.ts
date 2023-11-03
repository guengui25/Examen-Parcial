//==================================================
// TIPOS DE DATOS -> Deberían estar en types.ts
//==================================================

type CharacterResponse = {
    name: string;
    episodes: string []; //Episodes names
}

type GetCharacterAPI = {
    name: string;
    episodes: string[]; //Episodes URL
}

type GetEpisodeAPI = {
    name:String;
}

//==================================================
// EJEMPLO DE API-FETCH -> OBTENER DATOS DE UNA API (En el ejemplo, la API de Rick and Morty)
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response


const getCharacter = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
  try {

    const id = req.params.id; // Obtengo el id de los parametros de la peticion

    const response = await fetch( //Llamada a la API - Obtengo los datos del personaje - Espero a que responda
        `https://rickandmortyapi.com/api/character/${id}`
    );

    if (response.status !== 200) {  //Compruebo si la API ha respondido correctamente - El estado 200 es error
        res.status(response.status).send(response.statusText);
        return;
    }

    const character: GetCharacterAPI = await response.json(); // Obtengo los datos del personaje - Espero a que se conviertan en JSON

    // Hago una segunda llamada a la API para obtener los datos de los episodios

    const episodes = await Promise.all( // Obtengo los datos de los episodios - Espero a que se conviertan en JSON
      character.episodes.map(async (episodes) => { // Transformo los datos de los episodios

        const response = await fetch(episodes); //Llamada a la API - Obtengo los datos del episodio - Espero a que responda

        if (response.status !== 200) { //Compruebo si la API ha respondido correctamente - El estado 200 es error
            throw new Error(`Episode ${episodes} not found`);
        }

        const episodeData = await response.json(); // Obtengo los datos del episodio - Espero a que se conviertan en JSON

        return episodeData.name; // Devuelvo el nombre del episodio - Es lo que agregará al array episodes -> Ya que es un map
      })
    );

    // Devuelvo los datos del personaje y losnombres de los episodios
    res.send({
      name: character.name,
      episodes,
    });


  } catch (error) { // Si hay un error, devuelvo un error 404 - Not found
    res.status(404).send(error.message);
    return;
  }
};

export default getCharacter;

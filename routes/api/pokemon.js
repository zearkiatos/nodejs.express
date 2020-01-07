const API_PATH = "/api";
const pokemons = require("../../resources/pokemon");
const {postPokemon, getPokemons, getPokemonByName, getPokemonByID} = require("../../db");
module.exports = (app) => {
  app.get(`${API_PATH}/pokemons`, async (request, response) => {
    const result = await getPokemons();
    return response.json(result);
  });

  app.get(`${API_PATH}/pokemon/:name`, async (request, response) => {
    const name = request.params.name;
    const result = await getPokemonByName(name);
    return response.json(result);
  });

  app.get(`${API_PATH}/pokemon/:id`, async (request, response) => {
    const id = request.params.id;
    const result = await getPokemonByID(id);
    return response.json(result);
  });

  app.post(`${API_PATH}/pokemon`, async (request, response) => {
    try{
        const pokemon = request.body;
        if (pokemon) {
            const result = await postPokemon(pokemon);
            return response.json(result);
        }
        response.status(400).send({reason: "No pokemon sent."})
    }
    catch(err){
        console.log(err);
    }
  });
};

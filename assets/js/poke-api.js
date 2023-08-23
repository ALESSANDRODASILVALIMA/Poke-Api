

const pokeApi = {};
function convertPokemonApiDetailPokemon(pokeDetail){
    const pokemom = new Pokemon();
    pokemom.numero = pokeDetail.order;
    pokemom.nome = pokeDetail.nome;
    pokemom.type = pokeDetail.types.map((typeSlot)=>typeSlot.type.name);
    pokemom.type = pokemom.types.get(0);
    pokemom.photo = pokemom.sprites.other.dream_world.front_default
}

pokeApi.getPokemonDetail = (pokemon)=>{
    return fetch(pokemon.url).then((response)=> response.json())
}
pokeApi.getPokemons = (offset=0, limit=10) => {
    const URl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(URl)
    .then((response) => response.json())
    .then((responseBody) => responseBody.results) 
    .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests)=> Promise.all(detailRequests))
    .then((pokemonDetails)=>{
        return pokemonDetails;
        console.log(pokemonDetails)
    })   
}
 const loadMoreButton = document.getElementById("loadMoreButton");
 
 const offset = 0;
 const limit = 6;
 let offset_novo=0;
 let limit_novo= 0;

 var link_detalhe;
 

// const URl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
function convertPokemonTypeToLi(pokemonTypes){
    return pokemonTypes.map((typesSlot)=>`<li>${typesSlot.type.name}</li>`)
}

function convertPokemonType(pokemonTypes){
    return pokemonTypes.map((typesSlot)=>`${typesSlot.type.name}`)
}

function ConvertPokemonEmListLi(pokemon) {

    return `<li class="pokemon ${convertPokemonType(pokemon.types).join('')}" id="${pokemon.name}">
    <span class="numero">#${pokemon.id}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detalhes">
        <ol class="types">
            ${convertPokemonTypeToLi(pokemon.types).join('')}
        </ol>
        <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}" srcset="">
    </div>
</li>`

}

function addClickListenersToPokemonList() {
    const pokemonListItems = document.querySelectorAll('.pokemon');
    pokemonListItems.forEach((pokemonItem) => {
      // Obtenha o identificador único do elemento
      const uniqueId = pokemonItem.id;
  
      // Adicione um event listener de clique que chama a função desejada
      pokemonItem.addEventListener('click', () => {
        // Execute a função desejada aqui com base no identificador único (uniqueId)
        console.log(`Você clicou no Pokémon com identificador único: ${uniqueId}`);
        
        var nomePokemon = `${uniqueId}`;

        // Construa a URL com os dados como query parameters
        var url = new URL("detalhes.html", window.location.href);
        url.searchParams.append("nome", nomePokemon);

        // Navegue para a página de detalhes com os parâmetros
        window.location.href = url;

      });
    });
  }

var lista = document.getElementById("pokemons_list");

function loadPokemonItens(offset, limit){

pokeApi.getPokemons(offset, limit).then((listaPokemon = []) => {
   
       const listaHtml = [];
        for ( i=0; i< listaPokemon.length; i++) {
            const pokemon = listaPokemon[i];
            
            listaHtml.push(ConvertPokemonEmListLi(pokemon))         
        }
        // const novaLista = listaPokemon.map((pokemon) =>{
        //     return ConvertPokemonEmListLi(pokemon); 
        // })
        
        console.log(listaHtml)
        const listaHtmlnova = listaHtml.join(' ')
        lista.innerHTML += listaHtmlnova;
        return listaPokemon;
    }).then(()=>{addClickListenersToPokemonList()})

}
loadMoreButton.addEventListener('click', ()=>{

    if(offset_novo < 120){
        offset_novo  = offset_novo + limit;
        limit_novo =+  6;
        loadPokemonItens(offset_novo, limit_novo);
        console.log(offset_novo);
        console.log(limit_novo);
        
    }else{
        loadMoreButton.style.display='none';
    }
  })


loadPokemonItens(offset, limit)


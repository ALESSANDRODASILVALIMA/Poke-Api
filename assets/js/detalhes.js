// Recupere o nome do Pokémon da URL
var parametros = new URLSearchParams(window.location.search);
var nome = parametros.get("nome");

const URls = `https://pokeapi.co/api/v2/pokemon/${nome}`;

function getPokemonDetalhes(){
return fetch(URls).then((resposta)=> resposta.json())
            .then((detalhe)=>detalhe)

}

getPokemonDetalhes().then((pokemonData)=>{
    console.log(pokemonData)
    const nome = pokemonData.name;
    const img = pokemonData.sprites.other.dream_world.front_default;
    const abilities = pokemonData.abilities;
    const exp = pokemonData.base_experience;
    const stats = pokemonData.stats[0].base_stat;
    const tipo = pokemonData.types[0].type.name;
    const weights = pokemonData.weight;
    console.log(weights)
    

    const abilitiesListElement = document.getElementById("abilitiesList");
    abilities.forEach((abilityObj) => {
        var abilityName = abilityObj.ability.name;    
    
                
        console.log(`Nome da habilidade: ${abilityName}`);
        abilitiesListElement.innerHTML = `<div class="nome">${nome}</div><img src="${img}" alt="${pokemonData.name}" srcset="">
                                          <div class="habilidades">
                                                      <div class="hab"><span>Habilidade: </span> ${abilityName}</div>
                                                      <div class="hab"><span>Tipo: </span> ${tipo}</div>
                                                      <div class="hab"><span>weight: </span> ${weights}</div>
                                                      
                                                      <div class="prog">
                                                        <div>Exp:<progress value="${exp}" max="300"></progress></div>                                                      
                                                        <div>Stat:<progress value="${stats}" max="300"></progress></div>   
                                                     <div>                            
                                          </div>`


      })


      
})

btnVoltar = document.getElementById("btn_voltar");

btnVoltar.addEventListener('click', () => {
  window.history.back();
})
'use strict';


let listPokemons="";
let pokeapi="";
let modalHTM;

const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const pokemonPromises = [];
for (let i=1; i <= 151; i++){
    pokemonPromises.push(
        fetch(getPokemonUrl(i)).then((response) => response.json())
    );
}

const publishHTML = listPokemons => {
    const ul = document.querySelector('[data="pokedex"]');
    ul.innerHTML = listPokemons;
};

const switchModal = (id) => {
	const modal = document.querySelector('.modal');
  const p = document.querySelector('[data="dataPokemon"]');
  p.innerHTML = id;
	const actualStyle = modal.style.display;
	if(actualStyle == 'block') {
	  modal.style.display = 'none';
	} else {
	  modal.style.display = 'block';
	};
};

const createHTMLLi = () => {
    let testepoke;
    Promise.all(pokemonPromises)
    .then((pokemons) => {
        pokeapi = pokemons;
        return listPokemons = pokeapi.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
            accumulator += `
                            <li onclick="createHTMLModal(${pokemon.id})" class = "card ${types[0]}">
                            <img class = "card-image" alt="${pokemon.name}"
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ pokemon.id }.png">
                            <h2 class = "card-title">${pokemon.id}. ${pokemon.name}</h2>
                            <p class = "card-subtitle"> ${types.join(" | ")} </p>
                            </li>`;
            return accumulator;
        },"");
    })
    .then(publishHTML)
};

function createHTMLModal(podeId){
    const modalHTML = pokeapi.reduce((accumulator, pokemon) => {
    const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
    const ability1 = pokemon.abilities.map((abilityInfo) => abilityInfo.ability.name);
    const skill = pokemon.stats.map((skillInfo) => [skillInfo.stat.name, skillInfo.base_stat] );
    if (pokemon.id == podeId) {
      modalHTM = `
        <header class="modal-header">
          <h3 class = "modal-title">${pokemon.id}. ${pokemon.name}</h3>
          <figure class= "modal-figure">
            <img class = "modal-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ pokemon.id }.png">
          </figure>
        </header>
        <h3 class = "modal-title">Type</h3>        
        <p class = "modal-subtitle"> ${types.join(" | ")} </p>
        <h3 class = "modal-title">Characteristcs</h3>
        <p class = "modal-subtitle">height ${(pokemon.height/10)} m | weight ${(pokemon.weight/10)} kg | ${skill.join(" | ").replace(/,/gi, " ")} </p>
        <h3 class = "modal-title">Abilities</h3>
        <p class = "modal-subtitle"> ${ability1.join(" | ")} </p>
        <footer id="modal-footer">
          <p id = "modal-msg">to exit - click out of box</p>
        </footer>  
        `
    }},"");
  switchModal(modalHTM);
};

createHTMLLi();

window.onclick = function(event) {
	const modal = document.querySelector('.modal');
  if ( event.target == modal ) {
    switchModal('');
  };
};


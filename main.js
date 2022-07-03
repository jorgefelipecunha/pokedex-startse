const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`; 
const spinner = document.querySelector("#spinner");

const fetchPokemon = () => {
  const flipcard = document.createElement('div'); // acho q é id
  flipcard.classList.add("flip-card");

  const cardContainer = document.createElement('div'); // mudar cardContainer
  cardContainer.classList.add("card-container");

  flipcard.appendChild(cardContainer)


  const pokemonPromises = [];

  for (let i = 1; i <= 151; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then((response) => response.json())
    );
    spinner.getElementsByClassName.display = "none"; // novo
  }

  Promise.all(pokemonPromises).then((pokemons) => {
    const listPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
      
      accumulator += `
                      <li class="card ${types[0]}">
                      <img class="card-image" alt="${pokemon.name}"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                      <h2 class="card-title">${pokemon.id}.${pokemon.name}</h2>
                      <p class="card-subtitle"> ${types.join(" | ")} </p>
                      </li>`;
      return accumulator;                    
    },
    "");

    const ul = document.querySelector('[data="pokedex"]');
    ul.innerHTML = listPokemons;

  });
};

fetchPokemon();

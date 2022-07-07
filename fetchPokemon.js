import { pokemonPromises } from './pokemonPromises.js'

export const fetchPokemon = () => {
  pokemonPromises
  Promise.all(pokemonPromises).then(pokemons => {
    const listPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)

      accumulator += `
                      <li class="card ${types[0]}">
                      <img class="card-image" alt="${
                        pokemon.name
                      }" src="https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/${
        pokemon.id
      }.png">
                      <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                      <p class="card-subtitle">${types.join(' | ')} </p>
                      </li>`
      return accumulator
    }, '')
    const ul = document.querySelector('[data="pokedex"]')
    ul.innerHTML = listPokemons
  })
}

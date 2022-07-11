import { pokemonPromises } from './pokemonPromises.js'

export const fetchPokemon = () => {
  pokemonPromises
  Promise.all(pokemonPromises).then(pokemons => {
    const listPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)

      accumulator += `
                      <li class="card ${types[0]}">
                      <a class="clickDetail" href=detalhes.html?id=${
                        pokemon.id
                      }>
                      <p class="card-id"><strong>#${pokemon.id}</strong> </p>
                      <div class="card-title-image">
                       <h2 class="card-title">${pokemon.name}</h2>
                      <img class="card-image" alt="${
                        pokemon.name
                      }" src="https://professorlotus.com/Sprites/${
        pokemon.name
      }.gif">
      
                      </div
                      <div>
                      <p class="card-subtitle">${types.join(' | ')} </p>
                      </div>
                      </a>
                      </li>`
      return accumulator
    }, '')
    const ul = document.querySelector('[data="pokedex"]')
    ul.innerHTML = listPokemons
  })
}

import { getPokemonUrl } from './getPokemonUrl.js'

export const pokemonPromises = []

for (let index = 1; index < 151; index++) {
  pokemonPromises.push(
    fetch(getPokemonUrl(index)).then(response => response.json())
  )
}

import { getPokemonUrl } from './getPokemonUrl.js'

export const pokemonDetailPromises = id => {
  return fetch(getPokemonUrl(id)).then(response => response.json())
}

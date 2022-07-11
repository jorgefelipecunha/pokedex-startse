import { pokemonDetailPromises } from './pokemonDetailPromises.js'

export const detailPokemon = async () => {
  const query = window.location.search
  const urlParams = new URLSearchParams(query)
  const pokemonID = urlParams.get('id')
  const pokemon = await pokemonDetailPromises(pokemonID)
  console.log(pokemon)

  const namePokemon = document.getElementById('name-pokemon')
  namePokemon.innerHTML = pokemon.name

  document.getElementById(
    'gif'
  ).src = `https://professorlotus.com/Sprites/${pokemon.name}.gif`

  const poderes = pokemon.stats.reduce((previousValue, currentValue) => {
    previousValue += `<strong>${currentValue.stat.name}:</strong> ${currentValue.base_stat}<br>`
    return previousValue
  }, '')
  const poder = document.getElementById('stat')
  poder.innerHTML = poderes

  const tipos = pokemon.types.reduce((previousValue, currentValue) => {
    previousValue += `${currentValue.type.name}<br>`
    return previousValue
  }, '')
  const tipo = document.getElementById('type')
  tipo.innerHTML = tipos

  const ataques = pokemon.moves
    .slice(0, 5)
    .reduce((previousValue, currentValue) => {
      previousValue += `${currentValue.move.name}<br>`
      return previousValue
    }, '')
  const ataque = document.getElementById('moves')
  ataque.innerHTML = ataques
}
detailPokemon()

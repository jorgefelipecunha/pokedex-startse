const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const pokemonPromises = [];
for (let i=1; i <= 151; i++){
    pokemonPromises.push(
        fetch(getPokemonUrl(i)).then((response) => response.json())
    );
}

const publicaHtml = listPokemons => {
    const ul = document.querySelector('[data="pokedex"]');
    ul.innerHTML = listPokemons;
};

const geraHtmlLi = () => {

    Promise.all(pokemonPromises)
    .then((pokemons) => {
        return listPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map((typeInfo) => typeInfo.type.name);


            accumulator += `
                            <li class = "card ${types[0]}">
                            <img class = "card-image" alt="${pokemon.name}"
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ pokemon.id }.png">
                            <h2 class = "card-title">${pokemon.id}. ${pokemon.name}</h2>
                            <p class = "card-subtitle"> ${types.join(" | ")} </p>
                            </li>`;
            return accumulator;
        },
        "");

    })
    .then(publicaHtml)
};

geraHtmlLi();
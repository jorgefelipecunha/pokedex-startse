const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(151).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then((response) => response.json()));

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types, stats }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);
    const elementStats = stats.map((statsInfo) => statsInfo.stat.name);
    const valueStats = stats.map((statsInfo) => statsInfo.base_stat);

    accumulator += `
                    <div class="grid card ${elementTypes[0]}">
                    <div class="pokemon-title card-title"><h2>${name}</h2><h2 class="id">#${id}/151</h2></div>
                    <div class="pokemon-hp" title="${elementStats[0].toUpperCase()}"><span class="hp">❤</span> ${valueStats[0]}</div>
                    <div class="pokemon-img"><img class="card-image" alt="${name}"
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"></div>
                    <div class="pokemon-stats"><ul>
                    <li><span class="stats">${elementStats[1][0].toUpperCase() + elementStats[1].substring(1)}:</span> ${valueStats[1]}</li>
                    <li><span class="stats">${elementStats[2][0].toUpperCase() + elementStats[2].substring(1)}:</span> ${valueStats[2]}</li>
                    <li><span class="stats">${elementStats[3][0].toUpperCase() + elementStats[3].substring(1)}:</span> ${valueStats[3]}</li>
                    <li><span class="stats">${elementStats[4][0].toUpperCase() + elementStats[4].substring(1)}:</span> ${valueStats[4]}</li>
                    <li><span class="stats">${elementStats[5][0].toUpperCase() + elementStats[5].substring(1)}:</span> ${valueStats[5]}</li>
                    </ul>
                    </div>
                    <div class="pokemon-logo"><p class="card-subtitle"> ${elementTypes.join(" | ").toUpperCase()} </p><img alt="Logo Pokemon"
                    src="./img/pokemon-logo.png"></div>
                    </div>
                    </div>     
                    `;
    return accumulator;
}, "");

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data="pokedex-front"]');
    
    ul.innerHTML = pokemons;
    
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage);
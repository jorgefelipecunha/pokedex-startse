// Vamos lá!

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const pokemonPromisses = () => Array(151).fill().map((_, i) =>
fetch(getPokemonUrl(i + 1)).then(response => response.json()));

const listPokemons = pokemons => pokemons.reduce((accumulator, { name, id, types, stats }) => {
    const type = types.map((typeInfo) => typeInfo.type.name);
    const statName = stats.map((statsInfo) => statsInfo.stat.name);
    const baseStat = stats.map((statsInfo) => statsInfo.base_stat);
    accumulator +=`
        <article class="article">
          <li class = "card ${type[0]}">
              <img class = "card-image" alt = "${name}" 
              src="https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/${id}.png">
              <h4 class="card-title"> ${id}. ${name}</h4>
              <p class="card-subtitle"> ${type.join(" and ")}</p>
              <div class="info">
                  <h3>Statistics</h3>
                  <p class = "stat-name"> ${statName[0]}:</p><input type="range" class="hp" value="${baseStat[0]}" disabled 
                  style="background: linear-gradient(to right, #f2ff00 ${baseStat[0]}%, #ffffff ${baseStat[0]}%)"><p class="stat-data">${baseStat[0]}</p>
                  <p class = "stat-name"> ${statName[1]}:</p><input type="range" class="atk" value="${baseStat[1]}" disabled 
                  style="background: linear-gradient(to right, #fe5555 ${baseStat[1]}%, #ffffff ${baseStat[1]}%)"><p class="stat-data">${baseStat[1]}</p>
                  <p class = "stat-name"> ${statName[2]}:</p><input type="range" class="def" value="${baseStat[2]}" disabled 
                  style="background: linear-gradient(to right, #2373fd ${baseStat[2]}%, #ffffff ${baseStat[2]}%)"><p class="stat-data">${baseStat[2]}</p>
                  <p class = "stat-name"> ${statName[3]}:</p><input type="range" class="s-atk" value="${baseStat[3]}" disabled 
                  style="background: linear-gradient(to right, #ff0000 ${baseStat[3]}%, #ffffff ${baseStat[3]}%)"><p class="stat-data">${baseStat[3]}</p>
                  <p class = "stat-name"> ${statName[4]}:</p><input type="range" class="s-def" value="${baseStat[4]}" disabled 
                  style="background: linear-gradient(to right, #560eac ${baseStat[4]}%, #ffffff ${baseStat[4]}%)"><p class="stat-data">${baseStat[4]}</p>
                  <p class = "stat-name"> ${statName[5]}:</p><input type="range" class="speed" value="${baseStat[5]}" disabled 
                  style="background: linear-gradient(to right, #5eff00 ${baseStat[5]}%, #ffffff ${baseStat[5]}%)"><p class="stat-data">${baseStat[5]}</p>
              </div>
          </li>
        </article>`;

        setTimeout(() => { //só se aplica ao primeiro card && adicionar o atributo hidden na linha 19 depois que conseguir resolver isso
          
            const card = document.querySelector(".article");
            const info = document.querySelector(".info");

            card.addEventListener('mouseenter', function () {
                info.hidden = ``;
            });
            card.addEventListener('mouseleave', function () {
                info.hidden = `hidden`;
            });

        }, 0);

    return accumulator;
},"");

const buildList = pokemons => {
    const ul = document.querySelector('[data="pokedex"]');
    ul.innerHTML = pokemons;
}

const pokemonPromises = pokemonPromisses();

Promise.all(pokemonPromises).then(listPokemons).then(buildList);
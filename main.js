// Vamos lá!

const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const fetchPokemon = () => {
    const pokemonPromises = [];

    for (let i = 1; i <= 151; i++) {
        pokemonPromises.push(
            fetch(getPokemonUrl(i)).then((response) => response.json())
        );
    }

    Promise.all(pokemonPromises).then((pokemons) => {
        const listPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
            const elStats = pokemon.stats.map((statsInfo) => statsInfo.stat.name);
            const elBaseStats = pokemon.stats.map((statsInfo) => statsInfo.base_stat);

            accumulator += `
                            <article class="article">
                                <li class = "card ${types[0]}">
                                    <img class = "card-image" alt = "${pokemon.name}" 
                                    src="https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/${pokemon.id}.png">
                                    <h4 class="card-title"> ${pokemon.id}. ${pokemon.name}</h4>
                                    <p class="card-subtitle"> ${types.join(" and ")}</p>
                                    <div class="info" hidden>
                                        <h3>Statistics</h3>
                                        <p class = "card-stat"> ${elStats[0]}:</p><input type="range" class="hp" value="${elBaseStats[0]}" disabled><p class="number-stat">${elBaseStats[0]}</p>
                                        <p class = "card-stat"> ${elStats[1]}:</p><input type="range" class="atk" value="${elBaseStats[1]}" disabled><p class="number-stat">${elBaseStats[1]}</p>
                                        <p class = "card-stat"> ${elStats[2]}:</p><input type="range" class="def" value="${elBaseStats[2]}" disabled><p class="number-stat">${elBaseStats[2]}</p>
                                        <p class = "card-stat"> ${elStats[3]}:</p><input type="range" class="s-atk" value="${elBaseStats[3]}" disabled><p class="number-stat">${elBaseStats[3]}</p>
                                        <p class = "card-stat"> ${elStats[4]}:</p><input type="range" class="s-def" value="${elBaseStats[4]}" disabled><p class="number-stat">${elBaseStats[4]}</p>
                                        <p class = "card-stat"> ${elStats[5]}:</p><input type="range" class="speed" value="${elBaseStats[5]}" disabled><p class="number-stat">${elBaseStats[5]}</p>
                                    </div>
                                </li>
                            </article>`;

                            setTimeout(() => { //só se aplica ao primeiro card && não recebe ${elBaseStats}
                                const hp = document.querySelector(".hp");
                                const atk = document.querySelector(".atk");
                                const def = document.querySelector(".def");
                                const sAtk = document.querySelector(".s-atk");
                                const sDef = document.querySelector(".s-def");
                                const speed = document.querySelector(".speed");
                                const card = document.querySelector(".article");
                                const info = document.querySelector(".info");
                                
                                hp.style.setProperty('background', ` linear-gradient(to right, #f2ff00 45%, #ffffff 45%)`);
                                atk.style.setProperty('background', ` linear-gradient(to right, #fe5555 49%, #ffffff 49%)`);
                                def.style.setProperty('background', ` linear-gradient(to right, #2373fd 49%, #ffffff 49%)`);
                                sAtk.style.setProperty('background', ` linear-gradient(to right, #ff0000 65%, #ffffff 65%)`);
                                sDef.style.setProperty('background', ` linear-gradient(to right, #560eac 65%, #ffffff 65%)`);
                                speed.style.setProperty('background', ` linear-gradient(to right, #5eff00 45%, #ffffff 45%)`);

                                /*hp.style.setProperty('background', ` linear-gradient(to right, #f2ff00 ${elBaseStats[0]}%, #ffffff ${elBaseStats[0]}%)`);
                                atk.style.setProperty('background', ` linear-gradient(to right, #fe5555 ${elBaseStats[1]}%, #ffffff ${elBaseStats[1]}%)`);
                                def.style.setProperty('background', ` linear-gradient(to right, #2373fd ${elBaseStats[2]}%, #ffffff ${elBaseStats[2]}%)`);
                                sAtk.style.setProperty('background', ` linear-gradient(to right, #ff0000 ${elBaseStats[3]}%, #ffffff ${elBaseStats[3]}%)`);
                                sDef.style.setProperty('background', ` linear-gradient(to right, #560eac ${elBaseStats[4]}%, #ffffff ${elBaseStats[4]}%)`);
                                speed.style.setProperty('background', ` linear-gradient(to right, #5eff00 ${elBaseStats[5]}%, #ffffff ${elBaseStats[5]}%)`);*/
                                
                                card.addEventListener('mouseenter', function(){
                                    info.hidden=``;
                                });
                                card.addEventListener('mouseleave', function(){
                                    info.hidden=`hidden`;
                                });

                            }, 0);

            return accumulator;

        },"");

        const ul = document.querySelector('[data="pokedex"]');
        ul.innerHTML = listPokemons;

    });

};

fetchPokemon();
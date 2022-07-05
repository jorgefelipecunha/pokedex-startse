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

                            /*$input.bind("input"), function(e) {
                                $input.attr('value', this.value);
                            $input.css( 'background', `linear-gradient(to right, red ${elBaseStats[5]}%, transparent ${elBaseStats[5]}%;`);
                            if ($.isFunction(callback) {
                                callback(this);
                            });*/
                            

                            //document.getSelection(".hp::-webkit-slider-runnable-track").css=`background: linear-gradient(to right, red ${elBaseStats[5]}%, transparent ${elBaseStats[5]}%)`;
                            
                            //document.getElementsByClassName("hp").style.background= ` linear-gradient(to right, red ${hp.value}%, transparent ${value}%)`;;

                            //const hp = document.getElementsByClassName("hp");
                            /*const atk = document.querySelector(".atk");
                            const def = document.querySelector(".def");
                            const sAtk = document.querySelector(".s-atk");
                            const sDef = document.querySelector(".s-def");
                            const speed = document.querySelector(".speed");
                            hp.style.background = "green";*/

                            //
                            /*atk.style.background= ` linear-gradient(to right, red ${elBaseStats[1]}%, transparent ${elBaseStats[1]}%)`;
                            def.style.background= ` linear-gradient(to right, red ${elBaseStats[2]}%, transparent ${elBaseStats[2]}%)`;
                            sAtk.style.background= ` linear-gradient(to right, red ${elBaseStats[3]}%, transparent ${elBaseStats[3]}%)`;
                            sDef.style.background= ` linear-gradient(to right, red ${elBaseStats[4]}%, transparent ${elBaseStats[4]}%)`;
                            speed.style.background= ` linear-gradient(to right, red ${elBaseStats[5]}%, transparent ${elBaseStats[5]}%)`;*/
                            //console.log(hp);
                            //let style = $("<style>");
                            //style.append(".hp::-webkit-slider-runnable-track{background:linear-gradient(to right, white "+` ${elBaseStats[0]}`+"%, #bbb "+` ${elBaseStats[0]}`+"%);}");
                            /*elBaseStats = $('.hp').val();
                            style.text('.hp::-webkit-slider-runnable-track{background:linear-gradient(to right, #ff7e20 '+elBaseStats+'%, #fff '+elBaseStats+'%, #fff '+val+'%, #bbb '+val+'%);}');
                            let style = $("<style>", {type:"text/css"}).appendTo("head");*/
            return accumulator;
            
        },
        "");

        const ul = document.querySelector('[data="pokedex"]');
        ul.innerHTML = listPokemons;

        const card = document.querySelector(".article");
        const info = document.querySelector(".info");

        setTimeout(() => {
            card.addEventListener('mouseenter', function(){
                info.hidden=``;
            });
            card.addEventListener('mouseleave', function(){
                info.hidden=`hidden`;
            });
        },0);
        

    });

};

fetchPokemon();
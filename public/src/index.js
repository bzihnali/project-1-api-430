const createElementWithClassName = (elType, className) => {
    let el = document.createElement(elType);
    el.className = className;
    return el;
}

// This function displays the pokedex (with filters if the filters are filled out)
const displayDex = () => {
    dataContainer.innerHTML = "";
    let urlToFetch = "./dex";

    if (typeFilter.value.length > 0) {
        console.log(typeFilter.value)
        urlToFetch += `?types=${typeFilter.value}`
    }

    fetch(urlToFetch)
        .then(res => res.json())
        .then(pokedex => {
            // This builds a whole bunch of pokemon divs which are stylized
            // The text fields are mostly inputs to allow for easy editing
            for (const pokemon of pokedex) {
                let pokemonDiv = createElementWithClassName("div", "pokemon");
                let pokemonBody = createElementWithClassName("div", "pokebody");
                let pokemonStats = createElementWithClassName("div", "pokestats");

                let pokemonImage = createElementWithClassName("img", "pokeimage");
                pokemonImage.src = pokemon.img

                pokemonBody.appendChild(pokemonImage);

                let pokemonNameCard = createElementWithClassName("div", "pokenamecard");

                let pokemonNum = createElementWithClassName("input", "pokenum");
                pokemonNum.value = pokemon.num;
                pokemonNum.readOnly = true;

                pokemonNum.addEventListener("dblclick", (e) => {
                    if (e.target.readOnly) {
                        e.target.readOnly = false;
                        e.target.classList.add("editmode")
                    }
                })

                pokemonNum.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" && !(e.target.readOnly)) {
                        fetch(`./api/id/${pokemon.id}/set?num=${e.target.value}`);
                        e.target.classList.remove("editmode")
                        e.target.readOnly = true;
                    }
                });

                pokemonNameCard.appendChild(pokemonNum);

                let pokemonName = createElementWithClassName("input", "pokename");
                pokemonName.value = pokemon.name;
                pokemonName.readOnly = true;

                pokemonName.addEventListener("dblclick", (e) => {
                    if (e.target.readOnly) {
                        e.target.readOnly = false;
                        e.target.classList.add("editmode")
                    }
                })

                pokemonName.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" && !(e.target.readOnly)) {
                        fetch(`./api/id/${pokemon.id}/set?name=${e.target.value}`);
                        e.target.classList.remove("editmode")
                        e.target.readOnly = true;
                    }
                });

                pokemonNameCard.appendChild(pokemonName);

                pokemonDiv.appendChild(pokemonNameCard);

                let pokemonTypes = createElementWithClassName("div", "poketypings");

                for (const poketype of pokemon.type) {
                    let pokemonType = createElementWithClassName("img", "poketype");
                    pokemonType.src = `https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${poketype.toLowerCase()}.png`;
                    pokemonTypes.appendChild(pokemonType);
                }

                pokemonStats.append(pokemonTypes);

                let pokemonMeasurements = createElementWithClassName("div", "pokemeasurements");

                let pokemonWeight = createElementWithClassName("input", "pokeweight");
                pokemonWeight.value = pokemon.weight;
                pokemonWeight.readOnly = true;

                pokemonWeight.addEventListener("dblclick", (e) => {
                    if (e.target.readOnly) {
                        e.target.readOnly = false;
                        e.target.classList.add("editmode")
                    }
                })

                pokemonWeight.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" && !(e.target.readOnly)) {
                        fetch(`./api/id/${pokemon.id}/set?weight=${e.target.value}`);
                        e.target.classList.remove("editmode")
                        e.target.readOnly = true;
                    }
                });

                let pokemonHeight = createElementWithClassName("input", "pokeheight");
                pokemonHeight.value = pokemon.height;
                pokemonHeight.readOnly = true;

                pokemonHeight.addEventListener("dblclick", (e) => {
                    if (e.target.readOnly) {
                        e.target.readOnly = false;
                        e.target.classList.add("editmode")
                    }
                })

                pokemonHeight.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" && !(e.target.readOnly)) {
                        fetch(`./api/id/${pokemon.id}/set?height=${e.target.value}`);
                        e.target.classList.remove("editmode")
                        e.target.readOnly = true;
                    }
                });
                pokemonMeasurements.appendChild(pokemonWeight);
                pokemonMeasurements.appendChild(pokemonHeight);

                pokemonStats.appendChild(pokemonMeasurements);

                pokemonBody.appendChild(pokemonStats);
                pokemonDiv.append(pokemonBody);

                dataContainer.appendChild(pokemonDiv);
            }
        })
}

let dataButton = document.getElementById("request-data");
let typeFilter = document.getElementById("type-filter");
let dataContainer = document.getElementById("data-container");

// will display the pokedex if the button is clicked or enter is pressed in the filter area
dataButton.addEventListener("click", displayDex)
typeFilter.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        displayDex();
    }
});
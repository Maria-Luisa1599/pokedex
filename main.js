const pokemonList = document.getElementById('pokemonList')
const pokeContent = document.querySelector(".pokeContent");
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
       <li class="pokemon ${pokemon.type}" onclick='pokeModalShow(${JSON.stringify(pokemon)})'">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonToModal(pokemon) {
  return `
      <div class="pokeTop ${pokemon.type}">
        <img onclick="pokeModalHide()" src="./assets/img/x.png" alt="Fechar">
        <div class="pokeInfo">
          <div class="pokeBasicInfo">
            <span>${pokemon.name}</span>
            <span>#${pokemon.number}</span>
          </div>
            <ol>
             ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>
        <img src="${pokemon.photo}" alt="${pokemon.name}"/>
      </div>
      <div class="pokeBottom">
        <div class="pokeDetails">
          <div class="detailsTop">
            <div>
              <span>Specie</span>
              <span>Height</span>
              <span>Weight</span>
              <span>Abilities</span>
            </div>
            <div style="margin-left: 35px;">
              <span>${pokemon.specie}</span>
              <span>${pokemon.height}</span>
              <span>${pokemon.weight}</span>
              <span>
              <ol>
              ${pokemon.abilities.map((ability) => `<li class=" ${ability}">${ability}</li>`).join('')}
              </ol>
            </div>
          </div>
          <strong>Breeding</strong>
          <div class="detailsBottom">
            <div>
              <span>Shape</span>
              <span>Egg Group</span>
              <span>Grupo de Ciclo</span>
              </span>
            </div>
            <strong> </strong>
            <div style="margin-left: -100px;">
              <span>${pokemon.shape}</span>
              <span>${pokemon.egg_group}</span>
              <span>${pokemon.habitat}</span>
            </div>
          </div>
        </div>
      </div>
  `;
}


function pokeModalShow(pokemon) {
  pokeContent.classList.remove("AnimacaoSai");
  pokeContent.classList.add("AnimacaoEntra");
  pokeContent.style.pointerEvents = "all";
  pokeContent.innerHTML = convertPokemonToModal(pokemon);
}

function pokeModalHide() {
  pokeContent.classList.remove("AnimacaoEntra");
  pokeContent.classList.add("AnimacaoSai");
  pokeContent.style.pointerEvents = "none";
}



function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML += newHtml
  })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit)
  }
})

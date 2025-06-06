const pokeApi = {}

async function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.specie = pokeDetail.species.name;
    pokemon.height = pokeDetail.height / 10;
    pokemon.weight = pokeDetail.weight / 10;
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities;
    pokemon.abilities = abilities;
    pokemon.ability = ability;

    const moreDetails = await pokeApi.getPokemonMoreDetails(pokeDetail);
    console.log(moreDetails)

    pokemon.egg_group = moreDetails.group;
    pokemon.group = moreDetails.group[0];

    pokemon.habitat = moreDetails.habitat;
    pokemon.shape = moreDetails.shape;
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonMoreDetails = (pokemon) => {
    return fetch(pokemon.species.url)
    .then((response) => response.json())
    .then(data => {
        return {
            group: data.egg_groups.map(g => g.name),
            habitat: data.habitat.name,
            shape: data.shape.name
        };
    });
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

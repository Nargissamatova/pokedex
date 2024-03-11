const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");

/*
const fetchData = async () => {
  try {
    const pokemonData = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0" //how many and where it starts from -> offset=0
    );
    if (!pokemonData.ok) {
      throw new Error(`Error status ${pokemonData.status}`);
    }
    const data = await pokemonData.json();
    displayData(data);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
*/

let pokemons = [];
const fetchData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=500&offset=0")
    .then((response) => response.json())
    .then((json) => {
      pokemons = json.results;
      displayData(pokemons);
    });
};

fetchData();

const displayData = (data) => {
  const container = document.querySelector(".data");
  container.innerHTML = "";

  data.forEach((pokemon) => {
    const pokemonCard = document.createElement("div");
    pokemonCard.innerHTML = `<h2>${pokemon.name}</h2>`;
    container.appendChild(pokemonCard);
  });
};

const searchPokemons = (whatever) => {
  const filteredData = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(whatever.toLowerCase())
  );
  displayData(filteredData);
};

// Search function
const searchNames = (e) => {
  console.log(e.target.value);
};

searchInput.addEventListener("input", searchNames); // or console.log(e.target.values)

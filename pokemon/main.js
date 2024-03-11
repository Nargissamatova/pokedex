/*
ASYNC VERSION
let pokemons = []
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0" //how many and where it starts from -> offset=0
    );
    if (!response.ok) {
      throw new Error(`Error status ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    pokemons = data.results;
    displayData(pokemons);

  } catch (error) {
    console.error(error);
  }
};
*/

// PROMISE VERSION
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

// Search function

const searchPokemons = (wateeveeee) => {
  const filteredData = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(wateeveeee.toLowerCase())
  );
  displayData(filteredData);
};

// searchInput.addEventListener("input", searchNames); or console.log(e.target.values) OR
document.querySelector("#search").addEventListener("input", (e) => {
  searchPokemons(e.target.value);
});

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
/*
const pokemon = []
const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => displayData(json));
}
*/

fetchData();

const displayData = (data) => {
  const container = document.querySelector("#container");
  data.results.forEach((pokemon) => {
    const pokemonElement = document.createElement("div");
    pokemonElement.innerHTML = `
    <h2>${pokemon.name}</h2>
    
    `;
    container.appendChild(pokemonElement);
  });
};

// Search function
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");

const searchPokemon = () => {
  console.log(searchInput.value);
};

searchInput.addEventListener("input", searchPokemon);

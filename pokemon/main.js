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
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
    .then((response) => response.json())
    .then((json) => {
      const fetches = json.results.map((item) => {
        return fetch(item.url).then((res) => res.json());
      });

      Promise.all(fetches).then((data) => {
        pokemons = data;
        displayData(pokemons);
        console.log(pokemons);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
};

fetchData();

const displayData = (data) => {
  const container = document.querySelector(".data");
  container.innerHTML = "";

  data.forEach((pokemon) => {
    const pokemonCard = document.createElement("div");
    const imageUrl =
      pokemon.sprites.other.dream_world.front_default ??
      pokemon.sprites.other["official-artwork"].front_default ??
      "assets/sadpokemon.jpeg";

    const isFavorite = localStorage.getItem(pokemon.name) === "true";
    const favoriteText = isFavorite ? "Unmark favorite" : "Mark favorite";

    pokemonCard.innerHTML = `<h2>${pokemon.name}</h2>
    <img src="${imageUrl}"/>
    <div class="card">
      <p>Weight: ${pokemon.weight / 10} kg</p>
      <p>Height: ${pokemon.height / 10} m</p>
      <button id="favButton" data-name=${pokemon.name}> ${favoriteText}</button>
    </div>
    `;
    container.appendChild(pokemonCard);
  });
  addFavorites();
};

const toggleFavorite = (e) => {
  const pokemonName = e.target.getAttribute("data-name");
  const isFavorite = localStorage.getItem(pokemonName) === "true";
  localStorage.setItem(pokemonName, !isFavorite);
};

const addFavorites = () => {
  document
    .querySelectorAll("#favButton")
    .forEach((button) => button.addEventListener("click", toggleFavorite));
};

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const searchPokemons = debounce((searchInput) => {
  console.log("search triggered");
  const filteredData = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  displayData(filteredData);
}, 300);

document.querySelector("#search").addEventListener("input", (e) => {
  searchPokemons(e.target.value);
});

// Show favorites
const displayfavorites = () => {
  console.log();
};
document
  .querySelector("#showFavorites")
  .addEventListener("click", displayfavorites);

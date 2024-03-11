const fetchData = async () => {
  try {
    const pokemonData = await fetch("https://pokeapi.co/api/v2/pokemon");
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

/*
const displayData = (data) => {
  const container = document.querySelector("#container");
  data.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
    `;
    container.appendChild(postElement);
  });
};

*/

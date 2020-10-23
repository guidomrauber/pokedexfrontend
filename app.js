const retrievePokemon = async () => {
    const name = document.getElementById('pokemon-name').value.toLowerCase().trim('');
    console.time('callPokemon');
    let rawData = {};

    if (name) {
        try {
            rawData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            console.log(rawData.data);
            displayImage(rawData.data.sprites.front_default);
        } catch (error) {
            console.error(error)
        }
    }

}
	console.timeEnd('callPokemon');

const showStats = stats => {

}

const displayImage = url => {
    // crear nodo tipo img
    const imgElement = document.createElement('img');
    // agregar atributos
    imgElement.setAttribute('src', url);
    imgElement.setAttribute('width', '200');
    imgElement.setAttribute('height', '200');
    // obtener elemento del DOM
    const divImg= document.getElementById('img-pokemon');
    // agregar el nodo imagen a el div
    divImg.appendChild(imgElement);
}

window.onload = () => {
    document.getElementById('get-pokemons').addEventListener('click', retrievePokemon);
}

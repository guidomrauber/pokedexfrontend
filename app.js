const URL_POKEAPI = "https://pokeapi.co/api/v2/";

// Lista de pokemones consultados
const requestedPokemons = [];

document.getElementById('username').onkeyup = function() {

}


function formData(event) {
  cleanList();
  event.preventDefault();
  let username = document.getElementById('username').value;
  displayInfo(username);
  cleanForm();
}

function cleanForm() {
  document.getElementById('username').value = '';
}

function cleanList() {
  const list = document.getElementById('pokemon-list');
  if (list.childNodes.length > 0) {
    list.removeChild(list.childNodes[0])
  }
  const errorDiv = document.getElementById('error-message');
  errorDiv.style.display = "none";
}

// muestra info específica de cada pokemon
function displayInfo(data) {
  getPokemonData(data);
  const p = document.createElement('p');
  const textValue = document.createTextNode(data.firstToUpperCase());
  p.appendChild(textValue);
  document.getElementById('pokemon-list').appendChild(p);
}

// obtiene los datos de pokemones
function getPokemonData(name, index) {
  document.getElementById('error-message').style.display = "none";
  if (!requestedPokemons.includes(name)) {
    axios.get(URL_POKEAPI + 'pokemon/' + name).then(resp => {
      requestedPokemons.push(resp.data.name);
      displayPokemonInfo(resp.data, index);
    }).catch(error => {
      console.error(error);
      showErrorMessage(error);
    });
  }
}



// Crear elementos de lista y muestra el nombre junto a la imagen
function displayPokemonInfo(data, index = 0) {
  const tableList = document.getElementById('pokemon-list').getElementsByTagName('tbody')[0];
  const row = tableList.insertRow();
  
  const cellID = row.insertCell();
  const cellName = row.insertCell();
  const cellImage = row.insertCell();
  const cellAbilities = row.insertCell();
  const cellTypes = row.insertCell();

  const abilitiesList = document.createElement('ul');

  data.abilities.reverse().map(attack => {
    const liAbility = document.createElement('li');
    liAbility.innerHTML = attack.ability.name.firstToUpperCase();
    abilitiesList.appendChild(liAbility);
  });
  cellAbilities.append(abilitiesList);

  const typesList = document.createElement('ul');
  data.types.map(types => {
    const typeLi = document.createElement('li');
    typeLi.innerHTML = types.type.name.firstToUpperCase();
    typesList.appendChild(typeLi);
  });
  cellTypes.append(typesList);

  
  
}

let i = 1;

function getFirstTen() {
  const ii = i + 5;
  for (i; i < ii; i++) {
    getPokemonData(i, i);
  }
}

String.prototype.firstToUpperCase = function firstToUpperCase() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
// Agrega el boton para añadir pokemon al equipo
const agregarBoton = (data, botonera) => {
    let pokemon = {
        id: data.id,
        tipos: cellTypes,
        nombre: data.name.toUpperCase(),
        imagen: data.sprites.front_default,
		habilidad: cellAbilities
    }
    botonera.style.display = "flex"
    botonera.innerHTML = `<button id="" onclick='agregarEquipo(${JSON.stringify(pokemon)})' class='agregar-pokemon'>Agregar ${data.name} a equipo</button>`
}


// Muestro  el mesaje que no hay resultado y oculto la imagen por si tiene algo y despues de 3 segundo limpio el mensaje
const showError = () => {
    // selecciono la image
    let imgElement = document.getElementById("img")
    // Le pongo display none para ocultar
    imgElement.style.display = "none";
    // Creo el mensaje de error
    document.getElementById("msj").innerText = "No se encuentra el resultado"
    // Despues de tres segundo borro el mensaje
    setTimeout(() => {
        document.getElementById("msj").innerText = ""
    }, 3000);
}

window.onload = () => {
    document.getElementById('get-pokemons').addEventListener('click', retrievePokemon);
    /*
    1- Selecciono el input no el boton
    2- Con el addListener keyup toma el valor por cada tecla que apretamos
    3- el keycode es el valor de la tecla , el enter es el valor trece
    4- si apretan enter ejecuta la funcion para buscar el pokemon
    */
    document.getElementById('username').addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            retrievePokemon()
        }
    });
}

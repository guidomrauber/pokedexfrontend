const retrievePokemon = async () => {
    const name = document.getElementById('pokemon-name').value.toLowerCase().trim('');
    
    let rawData = {};

    if (name) {
        try {
            rawData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            displayCard(rawData.data.sprites.front_default, rawData.data.order, rawData.data.name, 
                        rawData.data.base_experience,rawData.data.types[0].type.name);
        } catch (error) {
            // Si hay error ejecuto la funcion de error
            showError()
            console.error(error)
        }
    }

}



    
const displayCard = (url, attibuteOrder, attibuteName, attibuteExperience, attibuteType) => {
    // Selecciono el elemento de la image y le seteo el valor al src para que lo dibuje, asi evito que cree muchas imagenes
    
	let card = document.createElement('div');
    card.className = 'card container';
    card.id = 'card-' ;
    const mainBody = document.getElementById('container-card');
    mainBody.appendChild(card);

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.id = 'card-body-' ;
    const mainCard = document.getElementById('card-' );
    mainCard.appendChild(cardBody);

    // crear nodo tipo img
    const imgElement = document.createElement('img');
    // agregar atributos
    imgElement.className = 'img-pokemon';
    imgElement.id = 'img-pokemon-' ;
    imgElement.setAttribute('src', url);
    
    const orderPokemon = document.createElement('h5');
    orderPokemon.innerHTML = 'Order: ' + attibuteOrder;
    orderPokemon.id = 'order-pokemon-';

    const title = document.createElement('h4');
    title.innerHTML = 'Name: ' + attibuteName;
    title.id = 'title' ;

    const textExperience = document.createElement('p');
    textExperience.innerHTML = 'Base Experience: ' + attibuteExperience;
    textExperience.id = 'text-experience-' ;

    const textOrder = document.createElement('p');
    textOrder.innerHTML = 'Order: ' + attibuteOrder;
    textOrder.id = 'text-order-' ;

    const textType = document.createElement('p');
    textType.innerHTML = 'Type: ' + attibuteType;
    textType.id = 'text-type-' ; 
    textType.className = 'text-type'; 

    const addPokemon = document.createElement('a');
    addPokemon.innerHTML = 'Add to Pokedex';
    addPokemon.id = 'add-pokemon-' ; 
    addPokemon.className = 'add-pokemon'; 
    addPokemon.setAttribute('href', '*');

    // obtener elemento del DOM
    const divBody = document.getElementById('card-body-' + count);
    // agregar el nodo al div
    divBody.appendChild(imgElement);
    divBody.appendChild(orderPokemon);
    divBody.appendChild(title);
    divBody.appendChild(textExperience);
    divBody.appendChild(textType);
    divBody.appendChild(addPokemon);

     

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
    document.getElementById('pokemon-name').addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            retrievePokemon()
        }
    });
}

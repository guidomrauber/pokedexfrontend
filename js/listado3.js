const poke_container = document.getElementById('poke_container');
const pokemons_num = 5; // 5 pokemon in 1st generation
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_types = Object.keys(colors);


//const fetch_pokemon = async() =>{
//   for(let i=1; i<=pokemons_num; i++){
//     await get_pokemon(i);
//  }
	
//}


// this functions calls the pokemon API 
var id =1;
//do {
const requestURL1 = "http://localhost:8080/api/pokedexs/1";
//const requestURL = "http://localhost:8080/api/pokedexs/${i}";
const request1 = new XMLHttpRequest();
request1.open('GET', requestURL1);
request1.responseType = 'json';
request1.send();
request1.onload = function() {
  const pokemon = request1.response;
  create_pokemon_card(pokemon);
}
//i++;
//}while(i<=5);

const requestURL2 = "http://localhost:8080/api/pokedexs/2";
const request2 = new XMLHttpRequest();
request2.open('GET', requestURL2);
request2.responseType = 'json';
request2.send();
request2.onload = function() {
  const pokemon2 = request2.response;
  create_pokemon_card(pokemon2);
}
const requestURL3 = "http://localhost:8080/api/pokedexs/3";
const request3 = new XMLHttpRequest();
request3.open('GET', requestURL3);
request3.responseType = 'json';
request3.send();
request3.onload = function() {
  const pokemon3 = request3.response;
  create_pokemon_card(pokemon3);
}
const requestURL4 = "http://localhost:8080/api/pokedexs/4";
const request4 = new XMLHttpRequest();
request4.open('GET', requestURL4);
request4.responseType = 'json';
request4.send();
request4.onload = function() {
  const pokemon4 = request4.response;
  create_pokemon_card(pokemon4);
}
const requestURL5 = "http://localhost:8080/api/pokedexs/5";
const request5 = new XMLHttpRequest();
request5.open('GET', requestURL5);
request5.responseType = 'json';
request5.send();
request5.onload = function() {
  const pokemon5 = request5.response;
  create_pokemon_card(pokemon5);
}
//var requestOptions = {
//  method: 'GET',
//  redirect: 'follow'
//};

//fetch("http://localhost:8080/api/pokedexs/1", requestOptions)
 // .then(response => response.json())
 // .then(result => console.log(result))
 // .catch(error => console.log('error', error));



function create_pokemon_card(Pokemon){
    const pokemon_el = document.createElement('div');
    pokemon_el.classList.add('pokemon');
//const poke_type = pokemon.type.map(el => el.type.name);
const  pokemon = Pokemon;

	
	const type = pokemon.type;
	const order = pokemon.order;
    const name = pokemon.name;
	const id = pokemon.order;
    const color = colors[type];

    pokemon_el.style.backgroundColor = color;

    const pokemon_inner_html = `
        <div class="img_container"> 
            <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
        </div>
        <div class="info">
            <span class="number">${pokemon.order}</span>
            <h3 class = "name">${name}</h3>
            <small class ="type">Type: <span>${type}</span></small>  
        </div>
        
    `;

    pokemon_el.innerHTML = pokemon_inner_html;

    poke_container.appendChild(pokemon_el);
}

//fetch_pokemon();

const busqueda = document.getElementById("btnbusqueda")
const fragment = document.createDocumentFragment();
const template__pokemon = document.getElementById("template__pokemon").content
const container = document.querySelectorAll(".card_container");


const obtenerPokemon = (numero) => {
 
    const url = "https://pokeapi.co/api/v2/pokemon/" + numero
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuesta => mostrarPokemon(respuesta))
}

const mostrarPokemon =  data=> {
    console.log(data)
    container[0].innerHTML = ''
    template__pokemon.querySelector('.title').textContent = data.name
    template__pokemon.querySelector('img').setAttribute("src", data.sprites.front_default)
    
    const clone = template__pokemon.cloneNode(true)
    fragment.appendChild(clone)
    container[0].appendChild(fragment)
}

busqueda.addEventListener('click', () =>{
    let numero = document.getElementById('busqueda').value
    if(isNaN(numero)){
        alert("ingresa un numero")
    }else{
        obtenerPokemon(numero)
    }

})


const form = document.getElementById('form-task')
const titulo = document.getElementById('title')
const descripcion = document.getElementById('descripcion')
const templateCard = document.getElementById("template-card").content
const fragment = document.createDocumentFragment()
const vistaTareas = document.querySelector('#vistaTareas')
let cards = []

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('cards')!==null){
        mostrarTareas()
    }
})


form.addEventListener('submit', e => {
    crearTarea(e)
})

const crearTarea = (e) => {
    e.preventDefault()
        let fecha = new Date()
       let [hora,minuto,segundo] = [fecha.getHours(), fecha.getMinutes(), fecha.getSeconds()]
        const card = {
            id: `${hora}${minuto}${segundo}`,
            titulo:titulo.value,
            descripcion:descripcion.value
        }
        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards))
        mostrarTareas()
        form.reset()
}


const mostrarTareas = () =>{

    cards = JSON.parse(localStorage.getItem('cards'))
    vistaTareas.innerHTML=''
    cards.map(objeto => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector('p').textContent = `${objeto.titulo} - ${objeto.descripcion}`
        clone.querySelector('a').dataset.id = objeto.id
        fragment.appendChild(clone)
       
    })
    vistaTareas.appendChild(fragment)

}

vistaTareas.addEventListener('click', e =>{
    if(e.target.classList.contains('btn-danger')){
        eliminartarea(e)
    }
    e.stopPropagation()
})


const eliminartarea  = e =>{
    let id = e.target.dataset.id
    cards.map((card, index) => {
      if(card.id==id){
        cards.splice(index, 1)
        console.log("se elimino")
      }
    })
    localStorage.setItem('cards', JSON.stringify(cards))
    mostrarTareas()
}
const form = document.getElementById('form-task')
const vistaTareas = document.getElementById('vistaTareas')
let tareas = []

document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.getItem('tareas') !== null){
        mostrarTarea()
    }
})

form.addEventListener('submit', (e) => {
    crearTarea(e)
})

const crearTarea = (e) => {
    console.log(e.target)
    let title = document.getElementById('title').value 
    let descripcion = document.getElementById('descripcion').value
    const fecha = new Date()
    let [mes, dia, anio, hora, minutos, segundos, milisegundos] = [fecha.getMonth(), fecha.getDay(), fecha.getFullYear(), fecha.getHours(), fecha.getMinutes(), fecha.getSeconds(), fecha.getMilliseconds()]
    let id = `${anio}${mes}${dia}${hora}${minutos}${segundos}${milisegundos}`
   
    const tarea = {
        id,
        title,
        descripcion
    }

    if(localStorage.getItem('tareas') === null){
        tareas.push(tarea)
        localStorage.setItem('tareas', JSON.stringify(tareas))
    }else{
        tareas = JSON.parse(localStorage.getItem('tareas'))
        tareas.push(tarea)
        localStorage.setItem('tareas', JSON.stringify(tareas))
    }

    form.reset()
    mostrarTarea()
    e.preventDefault()
}

const mostrarTarea = () =>{
    tareas = JSON.parse(localStorage.getItem('tareas'))
    vistaTareas.innerHTML = ''

    tareas.map(tarea => {

        let id= tarea.id
        let title = tarea.title
        let descripcion = tarea.descripcion

        vistaTareas.innerHTML += `<div class="card mt-3">
            <div class="card-body">
            <p>${title} - ${descripcion}</p>
            <a class="btn btn-danger" onclick="eliminarTarea('${id}')">Eliminar<a>
            </div>
            </div>
        `
    })
}

const eliminarTarea = id =>{
    tareas = JSON.parse(localStorage.getItem('tareas'))
    tareas.map((tarea, indice) => {
        if(tarea.id == id){
            tareas.splice(indice, 1)
        }
    })

    localStorage.setItem("tareas", JSON.stringify(tareas))
    mostrarTarea()
}




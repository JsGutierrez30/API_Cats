let contenedor = document.querySelector(".contenedorDatos");
let buscador = document.querySelector("#buscador");
let btnBuscar = document.querySelector("#btn");
let nombreBusqueda = "";

setTimeout(() => {
    obtenerDatos()
},1000);

const obtenerDatos = () => {
    fetch("https://api.thecatapi.com/v1/breeds")
    .then(respuesta => respuesta.json())
    .then(datos => mostrarDatos(datos))
    .catch(err => {
        console.error("ERROR: " + err.message)
    });
}

const mostrarDatos = (datos) => {
    let gato = "";
    
    datos.forEach(dato => { 
        const {name,origin,description} = dato;

        gato += `<section class="tarjeta">
                    <h2 class="tituloTarjeta">${name}</h2>
                    <p class="origen">origen: <span>${origin}</span></p>
                    <p class="descripcion">${description}</p>
                </section>`
    })
    contenedor.innerHTML = gato;
}


buscador.addEventListener("keyup", function(e){
    nombreBusqueda = e.target.value;
})


const buscar = () => {
    fetch(`https://api.thecatapi.com/v1/breeds/search?q=${nombreBusqueda}`)
    .then(res => res.json())
    .then(raza => {
        let gato = "";

        if (raza.length === 0) {
            console.log("no hay resultados")
        } else {
            raza.forEach(gatoBusqueda => {
                gato += `<section class="tarjeta">
                <h2 class="tituloTarjeta">${gatoBusqueda.name}</h2>
                <p class="origen">origen: ${gatoBusqueda.origin}</p>
                <p class="descripcion">${gatoBusqueda.description}</p>
                </section>`
            })
        }
        contenedor.innerHTML = gato;
    })
    .catch(err => console.log(err))
}

btnBuscar.addEventListener("click", buscar);
let botonRegistrar = document.getElementById("botonregistrar")
let products = document.getElementById("Lista-de-productos");

let productos = [];

class CargarProductos {
    static id=0
    constructor(nombre,material,precio,estado) {
        this.id = ++CargarProductos.id,
        this.nombre =nombre,
        this.material = material,
        this.precio = precio,
        this.estado = estado
    }

    


}

function eliminarProducto(elemento) {
    const idAEliminar = parseInt(elemento.target.getAttribute("producto-id"));
    
    
    productos = productos.filter(producto => producto.id !== idAEliminar);
  
   
    localStorage.setItem("productos", JSON.stringify(productos));
  
   
    mostrarListaDeProductos();
  }


function mostrarListaDeProductos(){
products.innerHTML = ""; 
productos.forEach(producto =>{
    let contenedor = document.createElement("div")
    contenedor.className="card"
    contenedor.innerHTML=`<div >
                        <h3>Nombre: ${producto.nombre}</h3>
                        <p>Material:${producto.material}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p>Estado: ${producto.estado}</p>
                        </div>
                        <a class="boton-de-eliminar" producto-id="${producto.id}">Eliminar</a>

    
    `
    products.appendChild(contenedor)

})

// boton para eliminar
const botonesDeEliminar = document.querySelectorAll(".boton-de-eliminar");
botonesDeEliminar.forEach(boton => {
  boton.addEventListener("click", eliminarProducto);
});

}








const registrarDato = () =>{
    
    
    let datoNombre = document.getElementById("nombre").value;
    let datoMaterial = document.getElementById("material").value;
    let datoPrecio = parseInt(document.getElementById("precio").value);
    let datoestado = document.getElementById("estado").value;

    const nuevoProducto = new CargarProductos(datoNombre,datoMaterial,datoPrecio,datoestado);   
    
    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));
 
    mostrarListaDeProductos(); 
}



botonRegistrar.addEventListener("click",registrarDato)

const productosGuardados = localStorage.getItem("productos");

if (productosGuardados) {
  productos = JSON.parse(productosGuardados); 
  mostrarListaDeProductos(); 
}






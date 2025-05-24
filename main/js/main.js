let botonRegistrar = document.getElementById("botonregistrar")
let products = document.getElementById("Lista-de-productos");

let productos = [];

class Producto {
    static id=0
    constructor(nombre,material,precio,estado) {
        this.id = ++Producto.id,
        this.nombre =nombre,
        this.material = material,
        this.precio = precio,
        this.estado = estado
    }

    


}

function eliminarProducto(elemento) {
    const idAEliminar = parseInt(elemento.target.getAttribute("producto-id"));
    
    Swal.fire({
    title: '¿Estás seguro?',
    text: 'Este producto se eliminará permanentemente.',
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: 'SEGURO???',
    cancelButtonText: 'Cancelar'
  }).then((eliminar)=>{

    if (eliminar.isConfirmed){
      productos = productos.filter(producto => producto.id !== idAEliminar);
      
      localStorage.setItem("productos", JSON.stringify(productos));

      Toastify({
      text: "Se han eliminado correctamente los datos",
      duration: 1500,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "right", 
      stopOnFocus: true, 
      style: {
        background: "#98ce3b",
      },
      onClick: function(){} // 
    }).showToast();
    mostrarListaDeProductos();
  }
  })
   
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

    if (!datoNombre || !datoMaterial || !datoestado || isNaN(datoPrecio) || datoPrecio <= 0) {

    Swal.fire({
  title: "PRIMERO LOS DATOS",
  text: "Deben ingresar datos para cargar",
  icon: "warning"
});
    return;
  }
    const nuevoProducto = new Producto(datoNombre,datoMaterial,datoPrecio,datoestado);   
    
    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));
    
    Toastify({
      text: "Los datos se han cargado correctamente!!!!!",
      duration: 1500,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "right", 
      stopOnFocus: true, 
      style: {
        background: "linear-gradient(to right,rgb(152, 206, 59)),rgb(152, 206, 59))",
      },
      onClick: function(){} 
    }).showToast();
 
    mostrarListaDeProductos(); 
}



botonRegistrar.addEventListener("click",registrarDato)

const productosGuardados = localStorage.getItem("productos");

if (productosGuardados) {
  productos = JSON.parse(productosGuardados); 
  mostrarListaDeProductos(); 
}
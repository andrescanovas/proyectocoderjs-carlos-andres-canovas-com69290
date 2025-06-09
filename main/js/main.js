let botonRegistrar = document.getElementById("botonregistrar");
let products = document.getElementById("Lista-de-productos");

let productos = [];
let editandoProductoId = null;

class Producto {
  static id = 0;
  constructor(nombre, material, precio, estado) {
    this.id = ++Producto.id;
    this.nombre = nombre;
    this.material = material;
    this.precio = precio;
    this.estado = estado;
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
  }).then((eliminar) => {
    if (eliminar.isConfirmed) {
      productos = productos.filter(producto => producto.id !== idAEliminar);

      localStorage.setItem("productos", JSON.stringify(productos));

      Toastify({
        text: "Se han eliminado correctamente los datos",
        duration: 1500,
        gravity: "top",
        position: "right",
        style: { background: "#E62117" }
      }).showToast();
      mostrarListaDeProductos();
    }
  });
}

function editarProducto(id) {
  const producto = productos.find(producto => producto.id === id);
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("material").value = producto.material;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("estado").value = producto.estado;

  editandoProductoId = id;
  botonRegistrar.textContent = "Guardar Modificaciones";
}

function mostrarListaDeProductos(productosFiltrados = productos) {
  products.innerHTML = "";
  productosFiltrados.forEach(producto => {
    let contenedor = document.createElement("div");
    contenedor.className = "card";
    contenedor.innerHTML = 
    `
      <div>
        <h3>Nombre: ${producto.nombre}</h3>
        <p>Material: ${producto.material}</p>
        <p>Precio: ${producto.precio}</p>
        <p>Estado: ${producto.estado}</p>
      </div>
      <a class="boton-de-eliminar" producto-id="${producto.id}">Eliminar</a>
      <a class="boton-de-editar" producto-id="${producto.id}">Editar</a>
    `;
    products.appendChild(contenedor);
  });

  document.querySelectorAll(".boton-de-eliminar").forEach(boton => {
    boton.addEventListener("click", eliminarProducto);
  });

  document.querySelectorAll(".boton-de-editar").forEach(boton => {
    boton.addEventListener("click", (elemento) => editarProducto(parseInt(elemento.target.getAttribute("producto-id"))));
  });
}

document.getElementById("ordenar-nombre")?.addEventListener("click", () => {
  const ordenados = [...productos].sort((a, b) => a.nombre.localeCompare(b.nombre));
    
  mostrarListaDeProductos(ordenados);
});

document.getElementById("ordenar-precio")?.addEventListener("click", () => {
  const ordenados = [...productos].sort((a, b) => a.precio - b.precio);

  mostrarListaDeProductos(ordenados);


});

document.getElementById("ordenar-estado")?.addEventListener("click", () => {
      const ordenados = [...productos].sort((a, b) => a.estado.localeCompare(b.estado));

      mostrarListaDeProductos(ordenados);
});


const registrarDato = () => {
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

  const productorepetido = productos.find(produ => produ.nombre === datoNombre && produ.material === datoMaterial && editandoProductoId === null);
  if (productorepetido) {
    Swal.fire({
      title: "Producto REPETIDO",
      text: "Este producto ya existe, crea uno nuevo ",
      icon: "warning"
    });
    return;
  }

  if (editandoProductoId !== null) {
    const producto = productos.find(prod => prod.id === editandoProductoId);
    producto.nombre = datoNombre;
    producto.material = datoMaterial;
    producto.precio = datoPrecio;
    producto.estado = datoestado;

    Toastify({
      text: "El producto editado correctamente",
      duration: 1500,
      gravity: "top",
      position: "right",
      style: { background: "#00b09b" }
    }).showToast();

    editandoProductoId = null;
    botonRegistrar.textContent = "Agregar";

  } else {
    const nuevoProducto = new Producto(datoNombre, datoMaterial, datoPrecio, datoestado);
    productos.push(nuevoProducto);

    Toastify({
      text: "Los datos se han guardado correctamente!",
      duration: 1500,
      gravity: "top",
      position: "right",
      style: { background: "#98CE3B" }
    }).showToast();
  }

  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarListaDeProductos();
  document.getElementById('form-producto').reset();
};

botonRegistrar.addEventListener("click", registrarDato);

const productosGuardados = localStorage.getItem("productos");

if (productosGuardados) {
  productos = JSON.parse(productosGuardados);
  productos.forEach(prod => { if (!productos.find(b => b.id > prod.id)) Producto.id = prod.id });
  mostrarListaDeProductos();
}

const filtroBusqueda = document.getElementById("filtro-busqueda");

if (filtroBusqueda) {
  filtroBusqueda.addEventListener("keyup", (evento) => {
    const texto = evento.target.value.toLowerCase();
    const resultados = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.material.toLowerCase().includes(texto) ||
      p.estado.toLowerCase().includes(texto)
    );
    mostrarListaDeProductos(resultados);
  });
}



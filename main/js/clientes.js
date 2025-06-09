let clientes = []
let editandoClientexId = null

const obtenerClientes = async () => {
    const URL = "https://jsonplaceholder.typicode.com/users"
    const usersError = "<span> No se han encontrado los usuarios, favor recargue la pagina</span>"
    let rederizado = ``

    try {
        let solicitud = await fetch(URL)
        let respuesta = await solicitud.json()

        clientes = respuesta.map(user => ({

            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            company: { name: user.company.name }
        }))
        localStorage.setItem("clientes", JSON.stringify(clientes))

        renderizarClientes()
    } catch (err) {
        console.error("ERROR: ", err)

        document.getElementById("lista-de-clientes").innerHTML = usersError
    }
}

function eliminarCliente(id) {
    clientes = clientes.filter(c => c.id !== id)
    localStorage.setItem("clientes", JSON.stringify(clientes))
    renderizarClientes()
}

function editarCliente(id) {
    const cliente = clientes.find(c => c.id === id)
    if (!cliente) return
    document.getElementById("nuevo-nombre").value = cliente.name
    document.getElementById("nuevo-email").value = cliente.email
    document.getElementById("nuevo-telefono").value = cliente.phone
    document.getElementById("nuevo-compania").value = cliente.company.name
    editandoClientexId = id
}

function vaciarClientes() {
    clientes = []
    localStorage.removeItem("clientes")
    renderizarClientes()
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("boton-vaciar-clientes")?.addEventListener("click", vaciarClientes)
    document.getElementById("form-clientes")?.addEventListener("submit", agregarCliente)
    obtenerClientes()
})

function agregarCliente(e) {
    e.preventDefault()
    const nombre = document.getElementById("nuevo-nombre").value.trim()
    const email = document.getElementById("nuevo-email").value.trim()
    const telefono = document.getElementById("nuevo-telefono").value.trim()
    const compania = document.getElementById("nuevo-compania").value.trim()

    if (!nombre || !email || !telefono || !compania) return

    if (editandoClientexId !== null) {
        const cliente = clientes.find(c => c.id === editandoClientexId)
        if (cliente) {
            cliente.name = nombre
            cliente.email = email
            cliente.phone = telefono
            cliente.company.name = compania
        }
        editandoClientexId = null
    } else {
        const nuevoCliente = {
            id: Date.now(),
            name: nombre,
            email: email,
            phone: telefono,
            company: { name: compania }
        }
        clientes.push(nuevoCliente)
    }

    localStorage.setItem("clientes", JSON.stringify(clientes))
    document.getElementById("form-clientes").reset()
    renderizarClientes()
}

function renderizarClientes() {
    let rederizado = ``
    
    
    clientes.forEach(user => {
        rederizado += 
        ` 
            <div class="tarjeta-cliente">
                <h3>Nombre: ${user.name}</h3>
                <p>phone: ${user.phone}</p>
                <p>Email: ${user.email}</p>
                <p>Compania: ${user.company.name}</p>
                <button onclick="eliminarCliente(${user.id})">Eliminar</button>
                <button onclick="editarCliente(${user.id})">Editar</button>
            </div>
        `
    })
    document.getElementById("lista-de-clientes").innerHTML = rederizado
}

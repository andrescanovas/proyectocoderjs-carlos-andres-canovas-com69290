
const obtenerClientes = async () => {
    const URL = "https://jsonplaceholder.typicode.com/users"
    const usersError = "<span> No se han encontrado los usuarios, favor recargue la pagina</span>"
    let rederizado = ``

    try {
        let solicitud = await fetch(URL)
        let respuesta = await solicitud.json()

        respuesta.forEach(user => {
            
            rederizado += ` 
                            <div class="tarjeta-cliente">
                            <h3>Nombre: ${user.name}</h3>
                            <p>phone: ${user.phone}</p>
                            <p>Email: ${user.email}</p>
                            <p>Compania: ${user.company.name}</p>
                            </div>
                
                `
        });
    } catch (err) {
        console.error("ERROR: ", err)
        rederizado = usersError

    } finally {
        document.getElementById("lista-de-clientes").innerHTML = rederizado

    }
}

obtenerClientes()
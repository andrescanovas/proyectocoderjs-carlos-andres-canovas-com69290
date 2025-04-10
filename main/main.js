const productos = ["espada","escudo","casco","collar"]


let ingresarOpcion = parseInt(prompt('Ingresa tu opcion: 1) Registrar producto, 2) Eliminar ULTIMO producto 3) Mostrar productos 4) Modificar productos 5) Salir'))



function eliminarProducto() {
    let eliminar = prompt('Se eliminara el ultimo producto agregado ¿ESTA TOTALMENTE SEGURO? escriba SI para confirmar No para cancelar la accion').toLowerCase();
    if (eliminar == "si") {
        let productoEliminado = productos.pop();
        alert('El producto '+ productoEliminado +' ha sido elimnado');
        console.log(productos.join(' - '));
    } else {
        alert('NO SE HA ELIMINADO NADA');
    }
}

function mostrarProducto (){
    console.log(" ")
    let idProducto = 0
    
    for(const producto of productos){
        console.log(idProducto +' - '+ producto)
        idProducto ++
    }
    console.log(" ")     

}

function agregarProducto(){
    let ingresarProducto = prompt('Hola, ingresa tu producto')
            productos.push(ingresarProducto)
            console.log(productos.join(' - '))
}

function modificarProducto(){
        alert('Para modificar, escribi el numero de su posición en la lista.(El primer elemento es la posicion 0, PUEDES VERLO EN LA OPCION 3)Luego ingresar el nuevo nombre.')
        let idProducto = parseInt(prompt('Ingresa el numero de la posicion'))
    
        let modificarNombreProducto = prompt('Ingresa el nuevo nombre del producto')
        productos.splice(idProducto,1,modificarNombreProducto)
        console.log(productos.join(' - ')) 


}


while(ingresarOpcion !==5){

    switch(ingresarOpcion){

        case 1 :

            agregarProducto()
            break

        case 2: 
        
            eliminarProducto()
            break
        case 3:
            mostrarProducto()
            break
        
        case 4: 
            modificarProducto() 
            break   
        default:
            console.log('La opcion seleccionada es incorrecta, porfavor seleccione una opcion valida')

    }

    ingresarOpcion = parseInt(prompt('Ingresa tu opcion: 1) Registrar producto, 2) Eliminar ULTIMO producto 3) Mostrar productos 4) Modificar productos 5) Salir'))
}


  






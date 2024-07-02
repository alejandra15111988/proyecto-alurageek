async function listarProductos(){
    const conexion = await fetch("http://localhost:3000/productos");

    const conexionConvertida = conexion.json();

    //console.log(conexionConvertida);
    return conexionConvertida
}

async function crearProductos(nombre,precio,imagen){
    const conexion = await fetch("http://localhost:3000/productos",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            nombre:nombre,
            precio:precio,
            imagen:imagen
        })
    })

    const conexionConvertida = conexion.json();

    return conexionConvertida;
}

async function eliminarProductos(id) {
    const conexion = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if (!conexion.ok) {
        throw new Error(`Error al eliminar el producto con ID ${id}`);
    }

    const conexionConvertida = await conexion.json();
    return conexionConvertida;
}



export const conexionAPI={
    listarProductos,
    crearProductos,
    eliminarProductos,
}

//listarProducts();
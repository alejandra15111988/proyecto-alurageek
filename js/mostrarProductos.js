import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function crearCard({ nombre, precio, imagen, id }) {
    const productCard = document.createElement("div");
    productCard.className = "card";
    productCard.innerHTML = `
    <div class="img-container">
        <img src="${imagen}" alt="${nombre}">
    </div>

    <div class="card-container--info">
        <p>${nombre}</p>
    </div>
    
    <div class="card-container--value">
        <p>${precio}</p>
        <button class="delete-button" data-id="${id}">
            <img src="./img/icons8-trash-48.png" alt="Eliminar">
        </button>
    </div>`;

    productCard.querySelector(".delete-button").addEventListener("click", () => eliminarProductos(id, productCard));
    return productCard;
}

async function listarProductos() {
    try {
        const listaAPI = await conexionAPI.listarProductos();

        listaAPI.forEach(productos => {
            const { nombre, precio, imagen, id } = productos;
            lista.appendChild(crearCard({ nombre, precio, imagen, id }));
        });
    } catch (error) {
        console.error('Error al listar productos:', error);
    }
}

async function eliminarProductos(id, productos) {
    try {
        await conexionAPI.eliminarProductos(id);
        lista.removeChild(productos);
        console.log(`Producto con id ${id} eliminado`);
    } catch (error) {
        console.error(`Error al eliminar producto con id ${id}:`, error);
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    try {
        const nuevoProducto = await conexionAPI.crearProductos(nombre, precio, imagen);
        lista.appendChild(crearCard(nuevoProducto));
        console.log('Producto creado:', nuevoProducto);

        // Limpiar los campos del formulario
        document.querySelector("[data-nombre]").value = '';
        document.querySelector("[data-precio]").value = '';
        document.querySelector("[data-imagen]").value = '';
    } catch (error) {
        console.error('Error al crear producto:', error);
    }
});

listarProductos();

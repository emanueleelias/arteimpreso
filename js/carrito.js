/* CARRITO DE COMPRAS */

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCuadros = document.querySelector('#lista-cuadros');

cargarEventListeners();

function cargarEventListeners() {
  //Agrega cuadro cuando se presiona en agregar al carrito.
  listaCuadros.addEventListener('click', agregarCuadro);

  //Elimina cuadros del carrito
  carrito.addEventListener('click', eliminarCuadro);

  //Vaciar carrito completo
  vaciarCarritoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    articulosCarrito = [];
    limpiarHTML();
  })
}


//Funciones

function agregarCuadro(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const cuadroSeleccionado = e.target.parentElement.parentElement.parentElement;
    leerDatosCuadro(cuadroSeleccionado);
  }
}

//Eliminar cuadro de carrito
function eliminarCuadro(e) {
  e.preventDefault();
  if ( e.target.classList.contains('borrar-cuadro')) {
    const cuadroId = e.target.getAttribute('data-id');
    //Elimina del arreglo por el data-id
    articulosCarrito = articulosCarrito.filter( cuadro => cuadro.id !== cuadroId );
    carritoHTML();
  }
}

//Leer los datos de cada cuadro
function leerDatosCuadro(cuadro) {

  //Crea un arreglo con el contenido del cuadro actual
  const infoCuadro = {
    imagen: cuadro.querySelector('img').src,
    titulo: cuadro.querySelector('h4').textContent,
    precio: cuadro.querySelector('.precio mark').textContent,
    id: cuadro.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some( cuadro => cuadro.id === infoCuadro.id );
  if (existe) {
    //solamente se actualiza la cantidad
    const cuadros = articulosCarrito.map( cuadro => {
      if ( cuadro.id === infoCuadro.id) {
        cuadro.cantidad++;
        return cuadro; //retorna el objeto actualizado
      } else {
        return cuadro; //retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...cuadros];
  } else {
    //Se agrega el cuadro al carrito
     //Agregando cuadros al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCuadro];
  }

  carritoHTML()
}

//Muestra el carrito de compras en el html
function carritoHTML() {
  //Limpiar html
  limpiarHTML();

  articulosCarrito.forEach( cuadro => {
    const { imagen, titulo, precio, cantidad, id } = cuadro;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-cuadro" data-id="${id}"> X </a></td>
    `
    contenedorCarrito.appendChild(row);
  })
}

//ELimina elementos del html del carrito
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
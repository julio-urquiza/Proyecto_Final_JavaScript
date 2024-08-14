import { users,bajaUsuario,encontrarUsuarioPorId,modificarUsuario } from './datos.js';

const usuario = JSON.parse(localStorage.getItem('usuario-activo'));
const mensaje = document.getElementById('mensaje');
mensaje.innerText = 'Bienvenido ' + usuario.nombre; 

const tabla = document.getElementById('tabla')

const rellenarTabla = function()
{
    tabla.innerHTML = '';
    const primeraFila = document.createElement('tr')
    primeraFila.innerHTML =    `<td>&nbsp;</td>
                                <td>Nombre</td>
                                <td>DNI</td>
                                <td>Edad</td>
                                <td>Usuario</td>
                                <td>Tipo</td>`
    tabla.appendChild(primeraFila)
    users.forEach(user => 
    {
        if(user.activo == true)
        {
            const fila = document.createElement('tr')
            fila.innerHTML =   `<td>${user.id}</td>
                                <td>${user.nombre}</td>
                                <td>${user.dni}</td>
                                <td>${user.edad}</td>
                                <td>${user.usuario}</td>
                                <td>${user.tipo}</td>
                                <td><button id='${user.id}' class='btnModificar'>Modificar</button></td>
                                <td><button id='${user.id}' class='btnEliminar'>Eliminar</button></td>`
            tabla.appendChild(fila)
        }
        
    });

    const ultimaFila = document.createElement('tr')
    ultimaFila.innerHTML =     `<td>&nbsp;</td>
                                <td><input id="nombre" type="text"></td>
                                <td><input id="dni" type="text"></td>
                                <td><input id="edad" type="text"></td>
                                <td><input id="nombreUser" type="text"></td>
                                <td><input id="tipo" type="text"></td>
                                <td><button id='ingresar'>Modificar</button></td>`

    tabla.appendChild(ultimaFila)

    const inputNombre = document.getElementById('nombre');
    const inputDni = document.getElementById('dni');
    const inputEdad = document.getElementById('edad');
    const inputNombreUser = document.getElementById('nombreUser');
    const inputTipo = document.getElementById('tipo');
    const inputIngresar = document.getElementById('ingresar');

    const btnsEliminar = document.querySelectorAll('.btnEliminar');
    btnsEliminar.forEach(btn => 
    {
        btn.addEventListener('click', function() 
        {
            bajaUsuario(btn.id);
            rellenarTabla();
        });
    });

    const btnsModificar = document.querySelectorAll('.btnModificar');
    btnsModificar.forEach(btn => 
    {
        btn.addEventListener('click', function()
        {
            const usuarioAux = encontrarUsuarioPorId(btn.id);
            // console.log(usuarioAux)
            inputNombre.value=usuarioAux.nombre;
            inputDni.value=usuarioAux.dni;
            inputEdad.value=usuarioAux.edad;
            inputNombreUser.value=usuarioAux.usuario;
            inputTipo.value=usuarioAux.tipo;
            inputIngresar.addEventListener('click',function()
            {
                const usuarioModicado = usuarioAux;
                usuarioModicado.nombre = inputNombre.value;
                usuarioModicado.dni = inputDni.value;
                usuarioModicado.edad = inputEdad.value;
                usuarioModicado.usuario = inputNombreUser.value;
                usuarioModicado.tipo = inputTipo.value;
                modificarUsuario(usuarioModicado);
                rellenarTabla();
            });
        });   
    });
}

rellenarTabla();






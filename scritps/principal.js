import { bajaUsuario,modificarUsuario,agregarUsuario,agregarCurso,crearListaNombres,modificarCurso } from './datos.js';

const usuario = JSON.parse(localStorage.getItem('usuario-activo'))
const mensaje = document.getElementById('mensaje')
const tabla = document.getElementById('tabla')
const cursos = document.getElementById('cursos')
const btnMostrarUsuarios = document.getElementById('btn-mostrar-Usuarios')
const btnMostrarCursos = document.getElementById('btn-mostrar-Cursos')
const contendorUsuarios = document.getElementById('contenedor-Usuarios')
const contendorCursos = document.getElementById('contenedor-Cursos')
const btnCrearCurso = document.getElementById('btn-crear-curso')

localStorage.setItem('listaCursos',JSON.stringify([]))

contendorCursos.style.display = 'none'
contendorUsuarios.style.display = 'none'

btnMostrarUsuarios.onclick = function()
{
    contendorCursos.style.display= 'none'
    rellenarTabla()
    contendorUsuarios.style.display= ''
}

btnMostrarCursos.onclick = function()
{
    contendorUsuarios.style.display= 'none'
    rellenarCursos()
    contendorCursos.style.display= ''
}

btnCrearCurso.onclick = async function()
{
    const { value: nombreCurso } = await Swal.fire(
    {
        title: "Ingrese el nombre del curso",
        input: "text",
        inputLabel: "Nombre del curso",
        inputPlaceholder: "Nombre del curso"
    });
    
    if (nombreCurso) 
    {
        Swal.fire(`Nombre ingresado: ${nombreCurso}`);
        const cursoNuevo = 
        {
            nombre : nombreCurso,
            integrantes : []
        }
        const lista = JSON.parse(localStorage.getItem('listaCursos'))
        localStorage.setItem('listaCursos',JSON.stringify(agregarCurso(lista,cursoNuevo)))
    }
    rellenarCursos()
}

const crearLi = function(curso)
{
    let retorno = ''
    curso.integrantes.forEach(nombre=>
    {   
        retorno = retorno + `<li>${nombre}</li>`
    })
    return retorno
}

const crearListaCursos = function(lista)
{
    cursos.innerHTML = '';
    lista.forEach(curso =>
    {
        const cartas = document.createElement('div')
        cartas.className = 'w-25 d-flex flex-column border'
        cartas.innerHTML = `<h2>${curso.nombre}</h2>
                            <ul>${crearLi(curso)}</ul>
                            <button id="btnAgregarUsuario${curso.id}" class="btn btn-success">Agregar usuario</button>`
        cursos.appendChild(cartas)

        const btnAgregarUsuario = document.getElementById(`btnAgregarUsuario${curso.id}`)

        btnAgregarUsuario.onclick = async function()
        {
            const lisatUsuarios = JSON.parse(localStorage.getItem('usuarios'))
            const { value: usuarioNombre } = await Swal.fire(
            {
                title: "Selecciona un Usuario",
                input: "select",
                inputOptions: crearListaNombres(lisatUsuarios),
                inputPlaceholder: "Selecciona un usuario",
                showCancelButton: true,
            });
            if (usuarioNombre) 
            {
                Swal.fire(`seleccionaste: ${usuarioNombre}`)

                const listaCursos = JSON.parse(localStorage.getItem('listaCursos'))
                curso.integrantes.push(usuarioNombre)
                localStorage.setItem('listaCursos',JSON.stringify(modificarCurso(listaCursos,curso)))
            }
            rellenarCursos()
        }
    })
}

const rellenarCursos = function()
{
    crearListaCursos(JSON.parse(localStorage.getItem('listaCursos')))
}


mensaje.innerText = 'Bienvenido ' + usuario.nombre; 

const crearPrimeraFila = function()
{
    tabla.innerHTML = '';
    const primeraFila = document.createElement('tr')
    primeraFila.innerHTML =    `<td class="bg-secondary text-light">&nbsp;</td>
                                <td class="bg-secondary text-light">Nombre</td>
                                <td class="bg-secondary text-light">DNI</td>
                                <td class="bg-secondary text-light">Edad</td>
                                <td class="bg-secondary text-light">Usuario</td>
                                <td class="bg-secondary text-light">Tipo</td>
                                <td class="bg-secondary text-light">&nbsp;</td>
                                <td class="bg-secondary text-light">&nbsp;</td>`
    tabla.appendChild(primeraFila)
}

const crearUltimaFila = function()
{
    const ultimaFila = document.createElement('tr')
    ultimaFila.innerHTML =     `<td>&nbsp;</td>
                                <td><input id="nombre" type="text"></td>
                                <td><input id="dni" type="text"></td>
                                <td><input id="edad" type="text"></td>
                                <td><input id="nombreUser" type="text"></td>
                                <td><input id="tipo" type="text"></td>
                                <td><button id='btnIngresar' class="btn bg-success text-light">Ingresar</button></td>`
    tabla.appendChild(ultimaFila)


    const btnIngresar = document.getElementById(`btnIngresar`);
    btnIngresar.onclick = function()
    {
        let user = {}
        user.id= undefined
        user.nombre = document.getElementById('nombre').value
        user.dni = document.getElementById('dni').value
        user.activo = true
        user.edad = parseInt(document.getElementById('edad').value)
        user.usuario = document.getElementById('nombreUser').value
        user.contrasenia = '123456'
        user.tipo = document.getElementById(`tipo`).value

        const lista = JSON.parse(localStorage.getItem('usuarios'))
        const listaModificada = agregarUsuario(lista,user)
        localStorage.setItem('usuarios',JSON.stringify(listaModificada))

        rellenarTabla();
    }
}

const crearFilaEditable = function(user)
{
    const filaEditable = document.createElement('tr')
    filaEditable.innerHTML =   `<td>&nbsp;</td>
                                <td><input id="input-nombre${user.id}" type="text" value="${user.nombre}"></td>
                                <td><input id="input-dni${user.id}" type="text" value="${user.dni}"></td>
                                <td><input id="input-edad${user.id}" type="text" value="${user.edad}"></td>
                                <td><input id="input-nombreUser${user.id}" type="text" value="${user.usuario}"></td>
                                <td><input id="input-tipo${user.id}" type="text" value="${user.tipo}"></td>
                                <td><button id="btnModificarEdit${user.id}" class="btn bg-primary text-light">Modificar</button></td>
                                <td><button id="btnEliminar${user.id}" class="btn bg-danger text-light">Eliminar</button></td>`
    tabla.appendChild(filaEditable)

    const btnModificarEdit= document.getElementById(`btnModificarEdit${user.id}`);
    btnModificarEdit.onclick = function()
    {
        user.nombre = document.getElementById(`input-nombre${user.id}`).value
        user.dni = document.getElementById(`input-dni${user.id}`).value
        user.edad = document.getElementById(`input-edad${user.id}`).value
        user.nombreUser = document.getElementById(`input-nombreUser${user.id}`).value
        user.tipo = document.getElementById(`input-tipo${user.id}`).value

        const lista = JSON.parse(localStorage.getItem('usuarios'))
        const listaModificada = modificarUsuario(lista,user)
        localStorage.setItem('usuarios',JSON.stringify(listaModificada))

        rellenarTabla();
    }

    const btnEliminar = document.getElementById(`btnEliminar${user.id}`);
    btnEliminar.onclick = function()
    {
        const lista = JSON.parse(localStorage.getItem('usuarios'))
        const listaModificada = bajaUsuario(lista,user.id)
        localStorage.setItem('usuarios',JSON.stringify(listaModificada))

        rellenarTabla();
    }
}

const crearFilaContenido = function(user)
{
    const fila = document.createElement('tr')
    fila.innerHTML =   `<td>${user.id}</td>
                        <td>${user.nombre}</td>
                        <td>${user.dni}</td>
                        <td>${user.edad}</td>
                        <td>${user.usuario}</td>
                        <td>${user.tipo}</td>
                        <td><button id='btnModificar${user.id}' class="btn bg-primary text-light">Modificar</button></td>
                        <td><button id='btnEliminar${user.id}' class="btn bg-danger text-light">Eliminar</button></td>`
    tabla.appendChild(fila)

    const btnModificar= document.getElementById(`btnModificar${user.id}`);
    btnModificar.onclick = function()
    {
        rellenarTablaEditable(user.id)
    }

    const btnEliminar = document.getElementById(`btnEliminar${user.id}`);
    btnEliminar.onclick = function()
    {
        const lista = JSON.parse(localStorage.getItem('usuarios'))
        const listaModificada = bajaUsuario(lista,user.id)
        localStorage.setItem('usuarios',JSON.stringify(listaModificada))

        rellenarTabla();
    }
}

const crearContenido = function(users)
{
    users.forEach(user => 
    {
        if(user.activo == true)
        {
            crearFilaContenido(user)
        }
    })
}

const crearContenidoEditable = function(users,id)
{
    users.forEach(user => 
    {
        if(user.activo == true && user.id != id)
        {
            crearFilaContenido(user)
        }
        else if(user.activo == true && user.id == id)
        {
            crearFilaEditable(user)
        }
    })
}

const rellenarTabla = function()
{
    crearPrimeraFila()
    crearContenido(JSON.parse(localStorage.getItem('usuarios')))
    crearUltimaFila()
}

const rellenarTablaEditable = function(id)
{
    crearPrimeraFila()
    crearContenidoEditable(JSON.parse(localStorage.getItem('usuarios')),id)
    crearUltimaFila()
}







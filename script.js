import {encontrarUsuario} from './datos.js';

const btnIngresar = document.getElementById('btnIngresar');
const usuario = document.getElementById('usuario');
const contrasenia = document.getElementById('contrasenia');

const btnIngresarClick = function()
{
    const cuentaActiva = encontrarUsuario(usuario.value,contrasenia.value);
    if(cuentaActiva == undefined) 
    {
        const mensajeError = document.getElementById('mensajeError')
        mensajeError.innerText = 'usuario o contrasenia incorrectas'
        return false;
    }
    localStorage.setItem('usuario-activo',JSON.stringify(cuentaActiva))
    window.location.href = './principal.html';
}

btnIngresar.addEventListener('click',btnIngresarClick);


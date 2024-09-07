import { encontrarUsuarioPorUserYContra } from "./datos.js";

const btnIngresar = document.getElementById('btnIngresar');
const usuario = document.getElementById('usuario');
const contrasenia = document.getElementById('contrasenia');


const btnIngresarClick = function()
{
    fetch('./json/data.json')
    .then(response => response.json())
    .then(usuarios =>
    {
        const cuentaActiva = encontrarUsuarioPorUserYContra(usuarios,usuario.value,contrasenia.value)
        if(cuentaActiva == undefined) 
        {
            const mensajeError = document.getElementById('mensajeError')
            mensajeError.innerText = 'usuario o contrasenia incorrectas'
            return false;
        }
        localStorage.setItem('usuario-activo',JSON.stringify(cuentaActiva))
        localStorage.setItem('usuarios',JSON.stringify(usuarios))
        window.location.href = './html/principal.html';
    })
}

btnIngresar.addEventListener('click',btnIngresarClick);


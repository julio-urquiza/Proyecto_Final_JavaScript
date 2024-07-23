const users = 
[
    {id: 0, nombre:'Julio Urquiza', dni: '12345678', activo: true, edad: 23, usuario: 'julio123', contrasenia: 'julio123', tipo:"alumno"},
    {id: 1, nombre:'Pepe Perez', dni: '34567812', activo: true, edad: 21, usuario: 'pepe123', contrasenia: 'pepe123', tipo:"alumno"},
    {id: 2, nombre:'Vanesa Vaez', dni: '45678123', activo: true, edad: 22, usuario: 'vane123', contrasenia: 'vane123', tipo:"alumno"},
    {id: 3, nombre:'Juan Juanes', dni: '56781234', activo: false, edad: 29, usuario: 'juan123', contrasenia: 'juan123', tipo:"alumno"},
    {id: 4, nombre:'Tomas Tomez', dni: '67812345', activo: true, edad: 20,  usuario: 'tomas123', contrasenia: 'tomas123', tipo:"alumno"},
    {id: 5, nombre:'Esteban Estebanez', dni: '81234123', activo: true, edad: 40, usuario: 'este123', contrasenia: 'este123', tipo:"profesor"},
    {id: 6, nombre:'Rosa Ramirez', dni: '34567812', activo: true, edad: 30, usuario: 'rosa123', contrasenia: 'rosa123', tipo:"profesor"},
    {id: 7, nombre:'Max Power', dni: '56781454', activo: true, edad: 39, usuario: 'max123', contrasenia: 'max123', tipo:"administrador"}
]

const encontrarUsuario = function(usuario,contrasenia)
{
    for(const user of users)
    {
        if(user.contrasenia == contrasenia && user.usuario == usuario && user.activo == true)
        {
            return user;
        }
    }
    return false;
}

const encotrarUsuarioPorId = function(id)
{
    for(let i = 0; i < users.length; i++)
        {
            if(id == users[i].id)
            {
                return i;
            }
        }
        return -1;    
}

const modificarUsuario = function(usuario)
{
    let posicion = encotrarUsuarioPorId(usuario.id);
    if(posicion != -1)
    {
        users[posicion] = usuario;
        return true;
    }
    return false;
}

const bajaUsuario = function(id)
{
    let posicion = encotrarUsuarioPorId(id);
    if(posicion != -1)
    {
        users[posicion].activo = false;
        return true;
    }
    return false;
}


alert('bienvenido a la plataforma online de cursos');


do{
    // pedir los datos 
    let usuario = prompt('ingrese su usuario').toLowerCase();
    let contrasenia = prompt('ingrese su contrasenia').toLowerCase();
    
    
    // comprobar esos datos
    let cuentaActiva = encontrarUsuario(usuario,contrasenia);

    // dar el mensaje correspondiente el usuario
    if(cuentaActiva == false) 
    {
        alert('el usuario o contrasenia no corresponden con una cuenta activa en nuestra plataforma');    
        continue;
    }
    alert('bienvenido ' + cuentaActiva.tipo + ': ' + cuentaActiva.nombre);
    alert('ingresaste a la plataforma');
    
    do{
        let opcion = parseInt(prompt('que deasea hacer(1-eliminar su usuario / 2-modificar su usuario / 3-salir'));
        
        if(opcion == 1)
        {
            bajaUsuario(cuentaActiva.id);
            alert('usuario dado de baja, volviendo a la pantalla de logeo');
            break;
        }
        else if(opcion == 2)
        {
            let usuarioModificado = prompt('ingrese su nueva usuario').toLowerCase();
            let contraseniaModificado = prompt('ingrese su nueva contrasenia').toLowerCase();
            cuentaActiva.usuario = usuarioModificado;
            cuentaActiva.contrasenia = contraseniaModificado;
            modificarUsuario(cuentaActiva);
            console.log(cuentaActiva);
        }
        else if(opcion == 3)
        {
            alert('saliendo de la plataforma');
            break;
        }
        else
        {
            alert('opcion incorrecta');
        }

    }while(true)

}while(true)





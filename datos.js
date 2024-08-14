export const users = 
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

export const encontrarUsuario = function(usuario,contrasenia)
{
    return users.find(user =>   user.contrasenia == contrasenia && 
                                user.usuario == usuario && 
                                user.activo == true)
}

export const encontrarIndexPorId = function(id)
{
    return users.findIndex(user => user.id == id);
}

export const encontrarUsuarioPorId = function(id)
{
    return users.find(user => user.id == id);
}

export const modificarUsuario = function(usuario)
{
    const i = encontrarIndexPorId(usuario.id);
    if(i != -1)
    {
        users[i] = usuario;
        return true;
    }
    return false;
}

export const bajaUsuario = function(id)
{
    const i = encontrarIndexPorId(id);
    if(i != -1)
    {
        users[i].activo = false;
        return true;
    }
    return false;
}



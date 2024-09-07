
export const encontrarUsuarioPorUserYContra = function(users,usuario,contrasenia)
{
    return users.find(user =>   user.contrasenia == contrasenia && 
                                user.usuario == usuario && 
                                user.activo == true)
}

export const encontrarIndexPorId = function(users,id)
{
    return users.findIndex(user => user.id == id);
}

export const encontrarUsuarioPorId = function(users,id)
{
    return users.find(user => user.id == id);
}

export const modificarUsuario = function(users,usuario)
{
    const i = encontrarIndexPorId(users,usuario.id);
    if(i != -1)
    {
        users[i] = usuario;
    }
    return users;
}

export const bajaUsuario = function(users,id)
{
    const i = encontrarIndexPorId(users,id);
    if(i != -1)
    {
        users[i].activo = false;
    }
    return users;
}

export const sacarIdMasAlto = function(users)
{
    let maximo = 0
    users.forEach(element => 
    {
        if(element.id > maximo)
        {
            maximo = element.id
        }
    })
    return maximo+=1
}

export const agregarUsuario = function(users,usuario)
{
    usuario.id = sacarIdMasAlto(users)
    users.push(usuario)
    return users
}

export const agregarCurso = function(cursos,curso)
{
    curso.id = sacarIdMasAlto(cursos)
    cursos.push(curso)
    return cursos
}

export const crearListaNombres = function(lista)
{
    let objeto = {}
    lista.forEach(element=>
    {
        objeto[element.nombre] = element.nombre
    })
    return objeto
}


export const modificarCurso = function(cursos,curso)
{
    const i = encontrarIndexPorId(cursos,curso.id);
    if(i != -1)
    {
        cursos[i] = curso;
    }
    return cursos;
}

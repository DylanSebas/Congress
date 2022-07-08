
/*
> A) Crear el archivo main
> B) POR CONSOLA: MOSTRAR UN LISTADO (O TABLA) DE TODOS LOS MIEMBROS DE LA CÁMARA CORRESPONDIENTE (house, o senate)
> C) POR CONSOLA: MOSTRAR UN LISTADO (O TABLA) DE TODOS LOS ESTADOS, ORDENADOS ALFABETICAMENTE Y SIN REPETIR
> D) GENERAR UNA FUNCION QUE ME PERMITA MOSTRAR SÓLO LOS MIEMBROS DE UN DETERMINADO PARTIDO 
> E) GENERAR UNA FUNCION QUE ME PERMITA MOSTRAR SÓLO LOS MIEMBROS DE UN DETERMINADO ESTADO
*/

const members=(objeto)=>{
    objeto.results[0].members.forEach(element => {
        console.log(element.first_name);  
    });
}

members(data);

const states=(objeto)=>{
    let array=[];
    objeto.results[0].members.forEach(elemnet =>{
        if(!array.includes(elemnet.state)){
            array.push(elemnet.state)
        }
    });
   console.table(array.sort())
}

states(data)

const party=(objeto,param1)=>{
    let array=objeto.results[0].members.filter(miembro=>miembro.party==param1)
    
    array.forEach(member=>{
        console.log(member.first_name+" "+member.last_name+" - "+param1)
    })
}
party(data, "R");


const stateFilter=(objeto,param1)=>{
    let array=objeto.results[0].members.filter(miembro=>miembro.state==param1)
    
    array.forEach(member=>{
        console.log(member.first_name+" "+member.last_name+" - "+param1)
    })
}
stateFilter(data, "NC");



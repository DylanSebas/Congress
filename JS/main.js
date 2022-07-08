const miembros = data.results[0].members;


var form = document.querySelector("form");
var select = document.getElementById("select");
var checkbox = form.querySelectorAll('input[type="checkbox"]');
var arrays = Array.from(checkbox);


const nombres = (objeto) => {
    let aux = "";
    objeto.forEach(element => {
        aux += "<tr><td class=`suValor`> <a href=´" + element.url + "´>" + element.first_name + " " + (element.middle_name || " ") + " " + element.last_name + "</a></td>";
        aux += "<td class=" + `"${element.party}"` + ">" + element.party + "</td>";
        aux += "<td class=" + `"${element.state}"` + ">" + element.state + "</td>";
        aux += "<td class=`suValor`>" + element.seniority + "</td>";
        aux += "<td class=`suValor`>%" + element.votes_with_party_pct + "</td></tr>";
    });
    return aux
}


document.querySelector("#cuerpoDeTabla").innerHTML = nombres(miembros);


const opciones = () => {

    //quita los estados repetidos
    var result = [];
    miembros.forEach((item) => {
        if (!result.includes(item.state)) {
            result.push(item.state);
        }
    })

    //construye las opciones del select. results es un array con los estados filtrados
    let aux = '<option value="All" selected>All</option>';
    result.forEach(element => {
        aux += '<option value="' + element + '">' + element + '</option>';
    })
    return aux;
}

select.innerHTML = opciones();

//FILTRACION DE PARTY

function filtracionDePartido(array) {
    var ischecked = arrays.filter(e => e.checked == true).map(e => e.value);
    var aux = [];
  
    if (ischecked.length != 0) {
        array.forEach(miembro => ischecked.forEach(valor => miembro.party == valor ? aux.push(miembro) : ""));
    } else {
        aux = array
    }

    return aux;

}

//FILTRACION DE STATE

function filtracionDeEstado(array, seleccionado) {

    let filtro=[];

    if (seleccionado == "All") {
        filtro = array
    }else{

    filtro = array.filter(miembro => miembro.state == seleccionado);
  }
    return filtro;
}
//evento

form.addEventListener("change", () => {

    var funcionFiltradoPartido =filtracionDePartido(miembros);
     var funcionDobleFiltrado= filtracionDeEstado(funcionFiltradoPartido,select.value);

     document.querySelector("#cuerpoDeTabla").innerHTML = nombres(funcionFiltradoPartido);
     document.querySelector("#cuerpoDeTabla").innerHTML = nombres(funcionDobleFiltrado);
     
    })
    
    
    


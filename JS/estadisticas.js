const miembros = data.results[0].members;
var estadisticas = {
    "numeroDeDemocratas": 0,
    "numeroDeRepublicanos": 0,
    "numeroDeIndependientes": 0,
    "porcentajeDemocrata": 0,
    "porcentajeIndependiente": 0,
    "porcentajeRepublicano": 0,
    "masComprometidos": 0,
    "menosComprometidos": 0,
    "masLeales": 0,
    "menosLeales": 0,
}


var CarpetasDecratas = miembros.filter(function (buscaDemocratas) {
    return buscaDemocratas.party == "D"
});
var CarpetasIndependientes = miembros.filter(function (buscaIndependientes) {
    return buscaIndependientes.party == "ID"
});
var CarpetasRepublicanos = miembros.filter(function (buscaRepublicanos) {
    return buscaRepublicanos.party == "R"
});

var miembrosTotales = miembros.length;
var diezPrc = miembrosTotales * 10 / 100;

estadisticas.numeroDeDemocratas = CarpetasDecratas.length;
estadisticas.numeroDeIndependientes = CarpetasIndependientes.length;
estadisticas.numeroDeRepublicanos = CarpetasRepublicanos.length;


estadisticas.porcentajeIndependiente = porcentaje(CarpetasIndependientes, estadisticas.numeroDeIndependientes).toFixed(2);
estadisticas.porcentajeRepublicano = porcentaje(CarpetasRepublicanos, estadisticas.numeroDeRepublicanos).toFixed(2);
estadisticas.porcentajeDemocrata = porcentaje(CarpetasDecratas, estadisticas.numeroDeDemocratas).toFixed(2);
estadisticas.menosComprometidos = leastEngaged(miembros, diezPrc);
estadisticas.masComprometidos = mostEngaged(miembros, diezPrc);
estadisticas.masLeales = mostLoyal(miembros, diezPrc);
estadisticas.menosLeales = leastLoyal(miembros, diezPrc);


function porcentaje(prcdeTodos, unidad) {
    var representantes =  prcdeTodos.map((partidos) => {
        return partidos.votes_with_party_pct;}).reduce((acc, item) => {
        return acc = acc + item;
    }, 0);
    
   if(unidad==0){
       return 0
   }else{
       return (representantes/ unidad)
   }
}


function leastEngaged(objeto, diezPrc) {
    let noComprometidos = objeto.sort((a, b) => { return b.missed_votes_pct - a.missed_votes_pct }).splice(0, diezPrc);
    return noComprometidos
};

function mostEngaged(objeto, diezPrc) {
    var comprometidos = objeto.sort((a, b) => { return a.missed_votes_pct - b.missed_votes_pct });
    return comprometidos.splice(0, diezPrc)
};

function leastLoyal(objeto, diezPrc) {
    var infieles = objeto.sort((a, b) => { return b.votes_against_party_pct - a.votes_against_party_pct });
    return infieles.splice(0, diezPrc);
};

function mostLoyal(objeto, diezPrc) {
    var leales = objeto.sort((a, b) => { return a.votes_against_party_pct - b.votes_against_party_pct });

    return leales.splice(0, diezPrc)
};



const partidos = (objeto) => {
    let aux = "";

    aux += "<tr><td>Democrats</td>";
    aux += "<td>" + objeto.numeroDeDemocratas + "</td>";
    aux += "<td>%" + objeto.porcentajeDemocrata + "</td></tr>";
    aux += "<tr><td>Replublicans</td>";
    aux += "<td>" + objeto.numeroDeRepublicanos + "</td>";
    aux += "<td>%" + objeto.porcentajeRepublicano + "</td></tr>";
    aux += "<tr><td>Independents</td>";
    aux += "<td>" + objeto.numeroDeIndependientes + "</td>";
    aux += "<td>%" + objeto.porcentajeIndependiente + "</td></tr>";


    return aux
}


document.querySelector("#cuerpoDeTabla").innerHTML = partidos(estadisticas);

const compromisoYNoCompromiso = (objeto) => {
    let aux = "";
    objeto.forEach(element => {
        aux += "<tr><td>" + element.first_name + "</td>";
        aux += "<td>" + element.missed_votes + "</td>";
        aux += "<td>%" + element.missed_votes_pct + "</td></tr>";
    });
    return aux
}

document.querySelector("#masComprometidos").innerHTML = compromisoYNoCompromiso(estadisticas.masComprometidos);
document.querySelector("#noComprometidos").innerHTML = compromisoYNoCompromiso(estadisticas.menosComprometidos);


const lealesYNoLeales = (objeto) => {
    let aux = "";
    objeto.forEach(element => {
        aux += "<tr><td>" + element.first_name + "</td>";
        aux += "<td>" + element.total_votes + "</td>";
        aux += "<td>%" + element.votes_with_party_pct + "</td></tr>";
    });
    return aux
}

document.querySelector("#masLeales").innerHTML = lealesYNoLeales(estadisticas.masLeales);
document.querySelector("#menosLeales").innerHTML = lealesYNoLeales(estadisticas.menosLeales);




const partidosHouse = (objeto) => {
    let aux = "";

    aux += "<tr><td>Democrats</td>";
    aux += "<td>" + objeto.numeroDeDemocratas + "</td>";
    aux += "<td>%" + objeto.porcentajeDemocrata + "</td></tr>";
    aux += "<tr><td>Replublicans</td>";
    aux += "<td>" + objeto.numeroDeRepublicanos + "</td>";
    aux += "<td>%" + objeto.porcentajeRepublicano + "</td></tr>";
    aux += "<tr><td>Independents</td>";
    aux += "<td>" + 0 + "</td>";
    aux += "<td>%" + 0 + "</td></tr>";


    return aux
}


document.querySelector(".cuerpoDeTablaHouse").innerHTML = partidosHouse(estadisticas);
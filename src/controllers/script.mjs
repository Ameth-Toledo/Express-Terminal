import Graph from "../models/Graph.mjs";

const graph = new Graph();

let btnAgregarDestino = document.getElementById("AgregarDestino");
let btnAgregarConexion = document.getElementById("AgregarRutaB");
let btnRecorridoProfundidad = document.getElementById("buttonProfundidad");
let btnRecorridoAnchura = document.getElementById("buttonAnchura")
let imprimir = document.getElementById("MostrarRecorridos")
let imprimir2 = document.getElementById("MostrarRecorridosAn")
let btnDijstra = document.getElementById("rutaMasCorta")
let imprimir3 = document.getElementById("mostrarRutaCorta")

btnAgregarDestino.addEventListener("click", () => {
    let terminal = document.getElementById("destinos").value;
    
    if (graph.addVertex(terminal)) {
        Swal.fire("Se registro", terminal, "success");
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se registro",
        });
    }
});

btnAgregarConexion.addEventListener("click", () => {
    let terminal = document.getElementById("terminalInicio").value;
    let destino = document.getElementById("destino").value;
    let peso = parseInt(document.getElementById("peso").value);
    
    if (graph.addC(terminal, destino, peso)) {
        Swal.fire({
            icon: "success",
            title: "Exito...",
            text: "Ruta agregada exitosamente",
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo agregar la ruta",
        });
    }
});

btnRecorridoProfundidad.addEventListener("click", () => {
    imprimir.innerHTML='';
    const vertices=[...graph.getVertices()][0]
    graph.dfs(vertices,(vertex) => {
        imprimir.innerHTML += `${vertex} `
        console.log(vertex)
    });
    Swal.fire({
        icon: "success",
        title: "Exito...",
        text: "Rutas encontradas por recorrido de profundidad",
    });
});
document.addEventListener('DOMContentLoaded',()=> {
    btnRecorridoAnchura.addEventListener("click", () => {
        imprimir2.innerHTML='';
        const vertices=[...graph.getVertices()][0]
        graph.bfs(vertices,(vertex) => {
            imprimir2.innerHTML += `${vertex} `
            console.log(vertex)
        });
        Swal.fire({
            icon: "success",
            title: "Exito...",
            text: "Rutas encontradas por recorrido de anchura",
        });
    });
});

btnDijstra.addEventListener("click", ()  => {
    let origen =document.getElementById("verticeInicio").value.trim();
    let destino = document.getElementById("verticeFinal").value.trim();
    if (origen === '' || destino === '') {
        mostrarError("Debes ingresar nodos válidos para calcular el camino más corto.");
        return;
    }
    const distance = graph.dijkstra(origen,destino)
    if (distance === 1000000) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontro ningun camino",
        });
    } else {
        imprimir3.innerHTML = ` La ruta mas corta es ${distance} ` ;
        Swal.fire({
            icon: "success",
            title: "Exito...",
            text: "Ruta mas corta encontrada exitosamente",
        });
    }
});
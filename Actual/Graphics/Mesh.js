export class Mesh {
    constructor() {
        this.vertices = [];
        this.aristas = [];
        this.triangulos = [];
    }
    
    agregarVertice(vertice) {
        this.vertices.push(vertice);
    }
    agregarArista(arista) {
        this.aristas.push(arista);
    }
    agregarTriangulo(triangulo) {
        this.triangulos.push(triangulo);
    }
    
    mostrar() {

        for (const vertice of this.vertices) {
            console.log(vertice.toString());
        }
        for (const arista of this.aristas) {
            console.log(arista);
        }
    }

}
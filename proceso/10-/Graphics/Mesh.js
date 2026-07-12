import { Vector3 } from "../Math/Vector3D.js";

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

    center() {
        let x_min = Infinity;
        let x_max = -Infinity;
        let y_min = Infinity;
        let y_max = -Infinity;
        let z_min = Infinity;
        let z_max = -Infinity;
        for (const vertice of this.vertices) {
            if (vertice.x < x_min) x_min = vertice.x;
            if (vertice.x > x_max) x_max = vertice.x;
            if (vertice.y < y_min) y_min = vertice.y;
            if (vertice.y > y_max) y_max = vertice.y;
            if (vertice.z < z_min) z_min = vertice.z;
            if (vertice.z > z_max) z_max = vertice.z;
        }
        let center = new Vector3((x_min + x_max) / 2, (y_min + y_max) / 2, (z_min + z_max) / 2);
        for(let i = 0; i < this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].subtract(center);
        }
        return this;
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
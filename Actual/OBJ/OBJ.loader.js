import { Vector3 } from "../Math/Vector3D.js";
import { Mesh } from "../Graphics/Mesh.js";
import { Triangulo } from "../Graphics/Triangulo.js";

export class OBJLoader {

    async load_User(archivo) {
        const texto = await archivo.text();
        return this.leer(texto);
    }

    async load_Local(archivo) {
        const respuesta = await fetch(archivo);
        const texto = await respuesta.text();
        return this.leer(texto);
    }

    leer(texto) {
        let objeto = new Mesh();
        let vertices = [];
        let triangulos = [];
        let lineas = texto.split(/\r?\n/);
        for (const linea of lineas) {
            if (linea == "" || linea.startsWith("#"))
            {
                continue;
            }
            if(linea.startsWith("v ")) {
                let partes = linea.trim().split(/\s+/);
                let x = parseFloat(partes[1]);
                let y = parseFloat(partes[2]);
                let z = parseFloat(partes[3]);
                objeto.agregarVertice(new Vector3(x, y, z));
            }
            else if(linea.startsWith("f ")) {
                let partes = linea.trim().split(/\s+/);
                for (let i = 1; i < partes.length - 2; i++) {
                    let v1 = parseInt(partes[1].split("/")[0]) - 1;
                    let v2 = parseInt(partes[i+1].split("/")[0]) - 1;
                    let v3 = parseInt(partes[i+2].split("/")[0]) - 1;
                    objeto.agregarTriangulo(new Triangulo(v1, v2, v3));
                }
            }
        }
        console.log("OBJETO CARGADO: ", objeto);
        return objeto;
    }

}
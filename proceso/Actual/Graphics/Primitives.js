import { Mesh } from "./Mesh.js";
import { Vector3 } from "../Math/Vector3D.js";
import { Triangulo } from "./Triangulo.js";

export class Primitivas{
    cubo(tamaño){
        const size = tamaño/2;
        let mesh = new Mesh();

        for (let x = -1; x <= 1; x+= 2)
        {
            for (let y = -1; y <= 1; y+= 2)
            {
                for (let z = -1; z <= 1; z+= 2)
                {
                    mesh.agregarVertice(new Vector3(x * size, y * size, z * size));
                }
            }
        }

        for (let i = 0; i < 8; i++)
        {
            for(let l = i+1; l < 8; l++)
            {
                let dif = 0;
                if (mesh.vertices[i].x != mesh.vertices[l].x)
                {
                    dif++;
                }
                if (mesh.vertices[i].y != mesh.vertices[l].y)
                {
                    dif++;
                }
                if (mesh.vertices[i].z != mesh.vertices[l].z)
                {
                    dif++;
                }
                if(dif == 1)
                {
                    mesh.agregarArista([i, l]);
                }
            }
        }
        
        {//triangulos
            mesh.agregarTriangulo(new Triangulo(2, 6, 4));
            mesh.agregarTriangulo(new Triangulo(2, 4, 0));
            mesh.agregarTriangulo(new Triangulo(3, 7, 6));
            mesh.agregarTriangulo(new Triangulo(3, 6, 2));
            mesh.agregarTriangulo(new Triangulo(6, 7, 5));
            mesh.agregarTriangulo(new Triangulo(6, 5, 4));
            mesh.agregarTriangulo(new Triangulo(7, 3, 1));
            mesh.agregarTriangulo(new Triangulo(7, 1, 5));
            mesh.agregarTriangulo(new Triangulo(3, 2, 0));
            mesh.agregarTriangulo(new Triangulo(3, 0, 1));
            mesh.agregarTriangulo(new Triangulo(0, 4, 5));
            mesh.agregarTriangulo(new Triangulo(0, 5, 1));
        }
    //                 3 -------- 7
    //               /|         /|
    //              / |        / |
    //             2 -------- 6  |
    //             |  |       |  |
    //             |  1 ------|--5
    //             | /        | /
    //             |/         |/
    //             0 -------- 4
        return mesh;
    }
    tetraedro(tamaño){
        const size = tamaño/2;
        let mesh = new Mesh();

        mesh.agregarVertice(new Vector3(-1 * size, -1 * size, 1 * size));
        mesh.agregarVertice(new Vector3(1 * size, -1 * size, 1 * size));
        mesh.agregarVertice(new Vector3(0, -1 * size, -1 * size));
        mesh.agregarVertice(new Vector3(0, 1 * size, 0));
        /*
        -1, -1, 1  // izquierda, abajo , lejos
        1, -1, 1   // derecha  , abajo , lejos
        0, -1, -1  // centro   , abajo , cerca
        0, 1, 0    // centro   , arriba, medio
        */
        mesh.agregarArista([0, 1]);
        mesh.agregarArista([0, 2]);
        mesh.agregarArista([0, 3]);
        mesh.agregarArista([1, 2]);
        mesh.agregarArista([1, 3]);
        mesh.agregarArista([2, 3]);
    
        mesh.agregarTriangulo(new Triangulo(3, 2, 0));
        mesh.agregarTriangulo(new Triangulo(3, 1, 2));
        mesh.agregarTriangulo(new Triangulo(3, 0, 1));
        mesh.agregarTriangulo(new Triangulo(2, 1, 0));
        return mesh;
    }
    piramide(tamaño){
        const size = tamaño/2;
        let mesh = new Mesh();
        
        mesh.agregarVertice(new Vector3(-1 * size, -1 * size, -1 * size));
        mesh.agregarVertice(new Vector3(-1 * size, -1 * size, 1 * size));
        mesh.agregarVertice(new Vector3(1 * size, -1 * size, -1 * size));
        mesh.agregarVertice(new Vector3(1 * size, -1 * size, 1 * size));
        mesh.agregarVertice(new Vector3(0, 1 * size, 0));
        /*
        -1, -1, -1   // izquierda, abajo , cerca   0
        -1, -1,  1   // izquierda, abajo , lejos   1
            1, -1, -1   // derecha  , abajo , cerca   2
            1, -1,  1   // derecha  , abajo , lejos   3
            0,  1,  0   // centro   , centro, medio   4
        */
        mesh.agregarArista([4, 0]);
        mesh.agregarArista([4, 1]);
        mesh.agregarArista([4, 2]);
        mesh.agregarArista([4, 3]);
        mesh.agregarArista([0, 1]);
        mesh.agregarArista([0, 2]);
        mesh.agregarArista([1, 3]);
        mesh.agregarArista([2, 3]);
        
        mesh.agregarTriangulo(new Triangulo(4, 2, 0));
        mesh.agregarTriangulo(new Triangulo(4, 3, 2));
        mesh.agregarTriangulo(new Triangulo(4, 1, 3));
        mesh.agregarTriangulo(new Triangulo(4, 0, 1));
        mesh.agregarTriangulo(new Triangulo(0, 2, 3));
        mesh.agregarTriangulo(new Triangulo(0, 3, 1));
        return mesh;
    }
    prisma_rectangular(xt, yt, zt){
        let mesh = new Mesh();

        for (let x = -1; x <= 1; x+= 2)
        {
            for (let y = -1; y <= 1; y+= 2)
            {
                for (let z = -1; z <= 1; z+= 2)
                {
                    mesh.agregarVertice(new Vector3(x * xt/2, y * yt/2, z * zt/2));
                }
            }
        }

        for (let i = 0; i < 8; i++)
        {
            for(let l = i+1; l < 8; l++)
            {
                let dif = 0;
                if (mesh.vertices[i].x != mesh.vertices[l].x)
                {
                    dif++;
                }
                if (mesh.vertices[i].y != mesh.vertices[l].y)
                {
                    dif++;
                }
                if (mesh.vertices[i].z != mesh.vertices[l].z)
                {
                    dif++;
                }
                if(dif == 1)
                {
                    mesh.agregarArista([i, l]);
                }
            }
        }
        
        {//triangulos
            mesh.agregarTriangulo(new Triangulo(2, 6, 4));
            mesh.agregarTriangulo(new Triangulo(2, 4, 0));
            mesh.agregarTriangulo(new Triangulo(3, 7, 6));
            mesh.agregarTriangulo(new Triangulo(3, 6, 2));
            mesh.agregarTriangulo(new Triangulo(6, 7, 5));
            mesh.agregarTriangulo(new Triangulo(6, 5, 4));
            mesh.agregarTriangulo(new Triangulo(7, 3, 1));
            mesh.agregarTriangulo(new Triangulo(7, 1, 5));
            mesh.agregarTriangulo(new Triangulo(3, 2, 0));
            mesh.agregarTriangulo(new Triangulo(3, 0, 1));
            mesh.agregarTriangulo(new Triangulo(0, 4, 5));
            mesh.agregarTriangulo(new Triangulo(0, 5, 1));
        }
    //                 3 -------- 7
    //               /|         /|
    //              / |        / |
    //             2 -------- 6  |
    //             |  |       |  |
    //             |  1 ------|--5
    //             | /        | /
    //             |/         |/
    //             0 -------- 4
        return mesh;
    }
    prisma_triangular(xt, yt, zt){
        let mesh = new Mesh();

        for (let x = -1; x <= 1; x+= 1)
        {
            let y = 1;
            if(x == -1 || x == 1) y = -1;
            for (let z = -1; z <= 1; z+= 2)
            {
                mesh.agregarVertice(new Vector3(x * xt/2, y * yt/2, z * zt/2));
            }
        }
        /*
        -1 | -1 | -1 ||  izquierda, abajo , cerca  ||  0
        -1 | -1 |  1 ||  izquierda, abajo , lejos  ||  1
            0 |  1 | -1 ||  centro   , arriba, cerca  ||  2
            0 |  1 |  1 ||  centro   , arriba, lejos  ||  3
            1 | -1 | -1 ||  derecha  , abajo , cerca  ||  4
            1 | -1 |  1 ||  derecha  , abajo , lejos  ||  5
        */

        mesh.agregarArista([0, 2]);
        mesh.agregarArista([0, 1]);
        mesh.agregarArista([0, 4]);
        mesh.agregarArista([1, 3]);
        mesh.agregarArista([1, 5]);
        mesh.agregarArista([2, 3]);
        mesh.agregarArista([2, 4]);
        mesh.agregarArista([3, 4]);
        
        mesh.agregarTriangulo(new Triangulo(2, 4, 0));
        mesh.agregarTriangulo(new Triangulo(3, 1, 5));
        mesh.agregarTriangulo(new Triangulo(2, 3, 5));
        mesh.agregarTriangulo(new Triangulo(2, 5, 4));
        mesh.agregarTriangulo(new Triangulo(3, 2, 0));
        mesh.agregarTriangulo(new Triangulo(3, 0, 1));
        mesh.agregarTriangulo(new Triangulo(0, 4, 5));
        mesh.agregarTriangulo(new Triangulo(0, 5, 1));
    //                 3 ------- 7
    //               /|         /|
    //              / |        / |
    //             2 -------- 6  |
    //             |  |       |  |
    //             |  1 ------|--5
    //             | /        | /
    //             |/         |/
    //             0 -------- 4
        return mesh;
    }
    octaedro (xt, yt, zt){
        let mesh = new Mesh();
        
        for (let x = -1; x <= 1; x+= 1)
        {
            if(x == 0)
            {
                for (let y = -1; y <= 1; y+= 2)
                {
                    mesh.agregarVertice(new Vector3(0, y * yt/2, 0));
                }
            }
            else
            {
                for (let z = -1; z <= 1; z+= 2)
                {
                    mesh.agregarVertice(new Vector3(x * xt/2, 0, z * zt/2));
                }
            }
        }
        /*
        -1,  0, -1   // izquierda, centro, cerca   0
        -1,  0,  1   // izquierda, centro, lejos   1
            0, -1,  0   // centro   , abajo , medio   2
            0,  1,  0   // centro   , arriba, medio   3
            1,  0, -1   // derecha  , centro, cerca   4
            1,  0,  1   // derecha  , centro, lejos   5
        */
        mesh.agregarArista([2, 0]);
        mesh.agregarArista([2, 1]);
        mesh.agregarArista([2, 4]);
        mesh.agregarArista([2, 5]);
        mesh.agregarArista([3, 0]);
        mesh.agregarArista([3, 1]);
        mesh.agregarArista([3, 4]);
        mesh.agregarArista([3, 5]);
        mesh.agregarArista([0, 1]);
        mesh.agregarArista([1, 4]);
        mesh.agregarArista([4, 5]);
        mesh.agregarArista([5, 0]);
        
        mesh.agregarTriangulo(new Triangulo(2, 4, 0));
        mesh.agregarTriangulo(new Triangulo(2, 5, 4));
        mesh.agregarTriangulo(new Triangulo(2, 1, 5));
        mesh.agregarTriangulo(new Triangulo(2, 0, 1));
        mesh.agregarTriangulo(new Triangulo(0, 4, 3));
        mesh.agregarTriangulo(new Triangulo(1, 0, 3));
        mesh.agregarTriangulo(new Triangulo(4, 5, 3));
        mesh.agregarTriangulo(new Triangulo(5, 1, 3));
        return mesh;
    }
    
    
}

import { Triangulo } from "../Graphics/Triangulo.js";
import { Vector2 } from "../Math/Vector2D.js";
import { Vector3 } from "../Math/Vector3D.js";
import { Rasterizer } from "./Rasterizer.js";
import { framebuffer } from "./Framebuffer.js";
import { Color } from "../Math/Color.js";

export class Render{
    constructor(canvas, Framebuffer = new framebuffer(canvas.width, canvas.height))
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.framebuffer = Framebuffer;
        this.Rasterizer = new Rasterizer(canvas);
    }
    
    render(escena)
    {
        this.framebuffer.limpiar();
        this.escena = escena;
        let triangulos = [];
        this.limpiar();

        escena.objetos.forEach(objeto => {
            triangulos = this.renderObjeto(objeto, triangulos);
        });
        triangulos.sort((a, b) => b.profundidad - a.profundidad);
        triangulos.forEach(triangulo =>{
            this.Rasterizer.rasterizar(triangulo, this.framebuffer);
            //this.dibujarTriangulos(triangulo);
        })
        this.ctx.putImageData(this.framebuffer.imageData, 0, 0);
        //console.log("------------------------------------------------------------");
    }
    renderObjeto(objeto, tr)
    {
        let vertices = [];
        let verticesMundo =[];
        let verticesCamara =[];
        for(let i = 0; i < objeto.mesh.vertices.length; i++)
        {
            verticesMundo.push(this.toWorldSpace(objeto.mesh.vertices[i], objeto.transform));
            verticesCamara.push(this.toCameraSpace(verticesMundo[i]));
            vertices.push(this.project(verticesCamara[i]));
            //console.log(vertices[i]);
        }
        //this.dibujarAristas(vertices, objeto.mesh.aristas);
        //let triangulos = 
        let normales = this.normales(verticesCamara, objeto.mesh.triangulos);
        let centros = this.getCenter(verticesCamara, objeto.mesh.triangulos);
        /*let centros_normales = [];
        centros.forEach(centro => {
            centros_normales.push(centro.normalize());
        });
        */let triangulos = this.Backface_Culling(centros, normales, objeto.mesh.triangulos); 
        //triangulos.forEach(t => {
        for(let i = 0; i < triangulos.length; i++)
        {
            if(triangulos[i] == null)
            {
                continue;
            }
            let triangulo = new TrianguloRender();
            triangulo.centro = triangulos[i][1];
            triangulo.profundidad = triangulos[i][1].z;
            triangulo.material = objeto.material;
            triangulo.vertices = new Triangulo(vertices[triangulos[i][0].A], vertices[triangulos[i][0].B], vertices[triangulos[i][0].C]);
            triangulo.normal = triangulos[i][2];
            tr.push(triangulo);
        }
        return tr;
    }
    
    toWorldSpace(vertice, transform)
    {
        let v = vertice.multiply(transform.scale);

        v = v.rotateX(transform.rotation.x * Math.PI/180);
        v = v.rotateY(transform.rotation.y * Math.PI/180);
        v = v.rotateZ(transform.rotation.z * Math.PI/180);

        v = v.add(transform.position);

        return v;
    }
    toCameraSpace(vertice)
    {
        let v = vertice.subtract(this.escena.camara.transform.position);

        v = v.rotateX(-this.escena.camara.transform.rotation.x * Math.PI / 180);
        v = v.rotateY(-this.escena.camara.transform.rotation.y * Math.PI / 180);
        v = v.rotateZ(-this.escena.camara.transform.rotation.z * Math.PI / 180);
        
        if (v.z <= this.escena.camara.near || v.z >= this.escena.camara.far) {
            return null;
        }
        
        //console.log(vertice);

        return v;
    }
    project(vertice)
    {
        if (vertice == null) return null;
        //console.log(vertice.toString());
        let x = vertice.x*this.escena.camara.focal/vertice.z;
        let y = vertice.y*this.escena.camara.focal/vertice.z;

        return new Vector3(x, y, vertice.z);
    }
    getCenter(vertices, t){
        let centros = [];
        for(let i = 0; i < t.length; i++)
        {
            if(vertices[t[i].A] == null || vertices[t[i].B] == null || vertices[t[i].C] == null)
            {
                centros.push(null);
                continue;
            }
            let centro = vertices[t[i].A].add(vertices[t[i].B])
            centro = centro.add(vertices[t[i].C]);
            centro = centro.multiply(new Vector3(1/3, 1/3, 1/3));
            centros.push(centro);
        }
        return centros
    }
    normales(vertices, triangulos)
    {
        let n = [];
        for (const t of triangulos)
        {
            n.push(this.getNormal(vertices, t))
        }
        return n;
    }
    getNormal(vertices, t)
    {
        if(vertices[t.A] == null || vertices[t.B] == null || vertices[t.C] == null)
        {
            return null;
        }
        let A = vertices[t.A];
        let B = vertices[t.B];
        let C = vertices[t.C];
        let normal = B.subtract(A).cross(C.subtract(A))

        return normal/*.normalize()*/;
    }
    Backface_Culling(centros, normales, t)
    {
        let triangulos = [];
        for(let i = 0; i < normales.length; i++)
        {
            if(normales[i] == null || centros[i] == null)
            {
                triangulos.push(null);
                continue;
            }
            //console.log(/*"triangulo: " + i +*/ "-----normal: " + normales[i].toString()/* + "----------vector centro-camara" + centros[i].multiply(new Vector3(-1, -1, -1)) + "-------------dot producto:" + normales[i].dot(centros[i].multiply(new Vector3(-1, -1, -1)))*/)
            //console.log("centro: ", centros[i].toString());
            //console.log("centro-camara: ", centros[i].multiply(new Vector3(-1, -1, -1)).toString());
            

            if(normales[i].dot(centros[i].multiply(new Vector3(-1, -1, -1))) > 0)
            {
                /* console.log(
                    i,
                    normales[i].toString(),
                    centros[i].multiply(new Vector3(-1, -1, -1)).toString(),
                    normales[i].dot(centros[i].multiply(new Vector3(-1, -1, -1)))
                );*/
                triangulos.push([t[i], centros[i], normales[i]]);
            }
        }
        return triangulos;
    }
    iluminacion(centro, luces, normal){
        let intensidad = 0;
        luces.forEach(luz => {
            intensidad += this.getIntensidad(centro, luz, normal);
        });
        return intensidad;
    }
    getIntensidad(centro, luz, normal){
        return Math.max(0, normal.normalize().dot(luz.transform.position.subtract(centro).normalize()));
    }

    limpiar()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    dibujarAristas(vertices, aristas)
    {
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 5;
        aristas.forEach(arista => {
            if (vertices[arista[0]] != null && vertices[arista[1]] != null)
            {
                this.ctx.beginPath();
                this.ctx.moveTo(
                    vertices[arista[0]].x + this.canvas.width/2  ,
                    -vertices[arista[0]].y + this.canvas.height/2
                );
                this.ctx.lineTo(
                    vertices[arista[1]].x + this.canvas.width/2,
                    -vertices[arista[1]].y + this.canvas.height/2
                );
                this.ctx.stroke();
            }
        });
    }
    dibujarTriangulos(triangulo, framebuffer = this.framebuffer)
    {
        //console.log(triangulo.centro);
        let luces = this.iluminacion(triangulo.centro, this.escena.luces, triangulo.normal);
        let intensidad = this.escena.ambiente + luces;
        this.ctx.fillStyle = "rgb(255, 0, 0)";
        //console.log(this.ctx.fillStyle);
        this.ctx.fillStyle = triangulo.material.color.multiply(intensidad).toString();
        /*console.log(intensidad);
        console.log(triangulo.material.color.multiply(intensidad).toString());
        console.log(this.ctx.fillStyle);
        console.log("------------------------------------------");*/
        let A = triangulo.vertices.A;
        let B = triangulo.vertices.B;
        let C = triangulo.vertices.C;
        this.ctx.beginPath();
        this.ctx.moveTo(
                A.x + this.canvas.width/2  ,
            -A.y + this.canvas.height/2
        );
        this.ctx.lineTo(
                B.x + this.canvas.width/2,
            -B.y + this.canvas.height/2
        );
        this.ctx.lineTo(
                C.x + this.canvas.width/2,
            -C.y + this.canvas.height/2
        );
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        /*triangulos.forEach(triangulo => {
            if (vertices[triangulo.A] != null && vertices[triangulo.B] != null && vertices[triangulo.C] != null)
            {
                //console.log(triangulo);
                
            }
        });*/
    }
}

class TrianguloRender{
    constructor(){
        this.vertices = [];
        this.profundidad = 0;
        this.material = null;
        this.normal = null;
        this.centro = null;
    }
}

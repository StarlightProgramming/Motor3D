import { Vector3 } from "../Math/Vector3D.js";
import { Render } from "./Renderer.js";
import { Color } from "../Math/Color.js";

export class Rasterizer{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    rasterizar(triangulo, framebuffer)
    {
        let vertices = triangulo.vertices;
        let minX = Math.floor(Math.min(vertices.A.x, vertices.B.x, vertices.C.x));
        let maxX = Math.ceil(Math.max(vertices.A.x, vertices.B.x, vertices.C.x));
        let minY = Math.floor(Math.min(vertices.A.y, vertices.B.y, vertices.C.y));
        let maxY = Math.ceil(Math.max(vertices.A.y, vertices.B.y, vertices.C.y));

        minX = Math.max(minX, -framebuffer.halfWidth);
        maxX = Math.min(maxX, framebuffer.halfWidth - 1);
        minY = Math.max(minY, -framebuffer.halfHeight);
        maxY = Math.min(maxY, framebuffer.halfHeight - 1);

        let a = vertices.A;
        let b = vertices.B;
        let c = vertices.C;

        let ab = b.subtract(a);
        let bc = c.subtract(b);
        let ca = a.subtract(c);
        let ap = new Vector3(minX, minY, 0).subtract(a);
        let bp = new Vector3(minX, minY, 0).subtract(b);
        let cp = new Vector3(minX, minY, 0).subtract(c);

        let ab_p_row = ab.cross2D(ap);
        let bc_p_row = bc.cross2D(bp);
        let ca_p_row = ca.cross2D(cp);

        let abc = ab.cross2D(c.subtract(a));

        //let aux_color = triangulo.material.color;
        for( let y = minY; y <= maxY; y++)
        {
            let ab_p = ab_p_row; //peso c
            let bc_p = bc_p_row; //peso a
            let ca_p = ca_p_row; //peso b
            for( let x = minX; x <= maxX; x++)
            {
                if(this.InsideTriangle(ab_p, bc_p, ca_p))
                {
                    let bary = this.barycentric(ab_p, bc_p, ca_p, abc);
                    let z = this.P_z(a, b, c, bary.alpha, bary.beta, bary.gamma);

                    let x_buffer = x + framebuffer.halfWidth;
                    let y_buffer = -y + framebuffer.halfHeight;

                    if(this.z_buffer(z, framebuffer.profundidad, x_buffer, y_buffer))
                    {
                        //let aux_color = interpolateColor(colores.A, colores.B, colores.C, bary.alpha, bary.beta, bary.gamma);
                        framebuffer.setPixel(
                            x_buffer,
                            y_buffer,
                            triangulo.material.color,
                            z
                        );
                    }
                }
                ab_p -= ab.y;
                bc_p -= bc.y;
                ca_p -= ca.y;
            }
            ab_p_row += ab.x;
            bc_p_row += bc.x;
            ca_p_row += ca.x;
        }
    }

    barycentric(ABP, BCP, CAP, ABC)
    {
        return {alpha : BCP / ABC, //peso de A
                beta : CAP / ABC,  //peso de B
                gamma : ABP / ABC};//peso de C
    }
    P_z(a, b, c, alpha, beta, gamma)
    {
        let z = alpha * a.z + beta * b.z + gamma * c.z;
        return z;
    }
    interpolarcolor(a, b, c, alpha, beta, gamma)
    {
        let color = {
            r: Math.floor(a.r * alpha + b.r * beta + c.r * gamma),
            g: Math.floor(a.g * alpha + b.g * beta + c.g * gamma),
            b: Math.floor(a.b * alpha + b.b * beta + c.b * gamma),
            a: 255
        };
        return color;
    }

    InsideTriangle(AB_P, BC_P, CA_P)
    {
        return (AB_P >= 0 && BC_P >= 0 && CA_P >= 0) || (AB_P <= 0 && BC_P <= 0 && CA_P <= 0);
    }

    z_buffer(z, profundidad, x, y)
    {
        let index = y * this.canvas.width + x;
        //console.log("z: " + z + " profundidad: " + profundidad[index]);
        if(z < profundidad[index])
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
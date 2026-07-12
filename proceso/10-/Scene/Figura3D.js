import { Material } from "../Graphics/Material.js";
import { Transform } from "./Transform.js";

export class Figura3D{
    constructor(figura)
    {
        this.mesh = figura;
        this.material = new Material();
        this.transform = new Transform();
    }
}
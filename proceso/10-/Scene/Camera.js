import { Transform } from "./Transform.js";


export class Camara{
    constructor(x = 0, y = 0, z = 0, focal = 100) {
        /*this.position = new Vector3(x, y, z);
        this.rotation = new Vector3(0, 0, 0);*/
        this.transform = new Transform(x, y, z);
        this.focal = focal;

        this.near = 0.1;
        this.far = 1000;
    }
}

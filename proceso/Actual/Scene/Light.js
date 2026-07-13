import { Transform } from "./Transform.js";

export class Ligth{
    constructor(){
        this.transform = new Transform();
        this.color = { r: 255, g: 255, b: 255 };
        this.intensidad = 1;
    }
}
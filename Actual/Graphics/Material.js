import { Color } from "../Math/Color.js";
export class Material{
    constructor(color = new Color()) {
        this.color = color;
    }

    changeColor(color){
        this.color = color;
    }
}

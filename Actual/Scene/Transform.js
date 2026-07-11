import { Vector3 } from "../Math/Vector3D.js";

export class Transform{
    constructor(x = 0, y = 0, z = 0){
        this.position = new Vector3(x, y, z);
        this.rotation = new Vector3(0, 0, 0);
        this.scale    = new Vector3(1, 1, 1);
    }

    moveby(vec)
    {
        this.position = this.position.add(vec);
    }
    moveto(vec)
    {
        this.position = vec;
    }

    rotateBy(vec)
    {
        this.rotation = this.rotation.add(vec);
    }
    rotateTo(vec)
    {
        this.rotation = vec;
    }

    scaleby(vec)
    {
        this.scale = this.scale.multiply(vec);
    }
    scaleTo(vec)
    {
        this.scale = vec;
    }
}

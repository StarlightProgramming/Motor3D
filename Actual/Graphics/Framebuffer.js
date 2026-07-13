export class framebuffer{
    constructor(width, height)
    {
        this.imageData = new ImageData(width, height);
        this.profundidad = new Float32Array(width * height);
        this.halfWidth = Math.floor(width / 2);
        this.halfHeight = Math.floor(height / 2);
    }

    setPixel(x, y, color, z)
    {
        let index = (y * this.imageData.width + x) << 2;
        let index_z = y * this.imageData.width + x;
        if(index < 0 || index >= this.imageData.data.length)
        {
            //console.error("Invalid pixel coordinates");
            return;
        }
        this.imageData.data[index] = color.r;
        this.imageData.data[index + 1] = color.g;
        this.imageData.data[index + 2] = color.b;
        this.imageData.data[index + 3] = color.a;
        this.profundidad[index_z] = z;
    }

    limpiar()
    {
        for (let i = 0; i < this.imageData.data.length; i += 4) {
            this.imageData.data[i] = 255;     // R
            this.imageData.data[i + 1] = 255; // G
            this.imageData.data[i + 2] = 255; // B
            this.imageData.data[i + 3] = 255; // A
        }
        for(let i = 0; i < this.profundidad.length; i++)
        {
            this.profundidad[i] = Infinity;
        }
    }
}
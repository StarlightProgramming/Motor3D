export class Color{
    constructor(r = 255, g = 0, b = 0)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    multiply(valor) {
        return new Color(
            Math.min(255, Math.max(0, this.r * valor)),
            Math.min(255, Math.max(0, this.g * valor)),
            Math.min(255, Math.max(0, this.b * valor))
        );
    }

    toString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}

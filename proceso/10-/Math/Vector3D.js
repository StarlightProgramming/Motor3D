export class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    add(vector) {
        return new Vector3(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
        );
    }
    subtract(vector) {
        return new Vector3(
            this.x - vector.x,
            this.y - vector.y,
            this.z - vector.z
        );
    }
    multiply(vector) {
        return new Vector3(
            this.x * vector.x,
            this.y * vector.y,
            this.z * vector.z
        );
    }
    
    rotateX(rad) {
        return new Vector3(
            this.x,
            this.y * Math.cos(rad) - this.z * Math.sin(rad),
            this.y * Math.sin(rad) + this.z * Math.cos(rad)
        );
    }
    rotateY(rad) {
        return new Vector3(
            this.x * Math.cos(rad) + this.z * Math.sin(rad),
            this.y,
            -this.x * Math.sin(rad) + this.z * Math.cos(rad)
        );
    }
    rotateZ(rad) {
        return new Vector3(
            this.x * Math.cos(rad) - this.y * Math.sin(rad),
            this.x * Math.sin(rad) + this.y * Math.cos(rad),
            this.z
        );
    }
    
    dot(vec){
        return this.x * vec.x +
            this.y * vec.y +
            this.z * vec.z;
    }
    cross(vec){
        return new Vector3(
            this.y * vec.z - this.z * vec.y,
            this.z * vec.x - this.x * vec.z,
            this.x * vec.y - this.y * vec.x
        );
    }
    normalize() {
        const length = this.length();

        if (length === 0)
        {   
            return new Vector3();
        }
        return new Vector3(
            this.x / length,
            this.y / length,
            this.z / length
        );
    }
    
    length() {
        return Math.sqrt(
            this.x ** 2 +
            this.y ** 2 +
            this.z ** 2
        );
    }
    toString() {
        return `(${this.x.toFixed(6)}, ${this.y.toFixed(6)}, ${this.z.toFixed(6)})`;
    }
}

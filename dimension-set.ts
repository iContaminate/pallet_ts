export class DimensionSet {
    x: number;
    y: number;
    z: number;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(other: DimensionSet): DimensionSet {
        let result = this.copy();

        result.x += other.x;
        result.y += other.y;
        result.z += other.y;

        return result;
    }

    divide_by(other: DimensionSet): DimensionSet {
        let result = this.copy();

        result.x = result.x / other.x;
        result.y = result.y / other.y;
        result.z = result.z / other.z;

        return result;
    }

    apply(fn: (n: number) => number) {
        let result = this.copy();

        result.x = fn(result.x);
        result.y = fn(result.y);
        result.z = fn(result.z);

        return result;
    }

    copy(): DimensionSet { return new DimensionSet(this.x, this.y, this.z); }

    toString(): string { return `${this.x}x${this.y}x${this.z}` }
}
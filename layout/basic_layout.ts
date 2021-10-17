import { DimensionSet } from "../dimension-set.js";
import { ILayout } from "./layout.js"

class BasicLayout implements ILayout {
	description: string;
	cpt: number;
	tpp: number;

	#box: DimensionSet;
	#pallet: DimensionSet;

	constructor(pallet: DimensionSet, box: DimensionSet) {
		this.description = `BasicLayout with ${box.x}" side of box along ${pallet.x}" side of pallet`;

		this.#box = box.copy();
		this.#pallet = pallet.copy();

		[this.cpt, this.tpp] = this.#calculate();
	}

	#calculate(): Array<number> {
		let counts = this.#pallet.divide_by(this.#box).apply(Math.floor);

		return [counts.x * counts.y, counts.z];
	}
}

export { ILayout, BasicLayout };
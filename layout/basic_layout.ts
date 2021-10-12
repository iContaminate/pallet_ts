import { V3 } from "../v3.js";
import { ILayout } from "./layout.js"

class BasicLayout implements ILayout {
	description: string;
	cpt: number;
	tpp: number;

	#box: V3;
	#pallet: V3;

	constructor(pallet: V3, box: V3) {
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
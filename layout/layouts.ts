import { DimensionSet } from "../dimension-set.js";

import { ILayout } from "./layout.js";
import { BasicLayout } from "./basic_layout.js";

let LAYOUTS = [BasicLayout];

function findBestLayout(pallet: DimensionSet, box: DimensionSet): ILayout {
	let results: Array<ILayout> = [];

	let boxTurned = box.copy();
	[box.x, box.y] = [box.y, box.x];

	for (let i = 0, Layout; i < LAYOUTS.length; ++i) {
		Layout = LAYOUTS[i];

		results.push(new Layout(pallet, box)); // regular
		results.push(new Layout(pallet, boxTurned)); // flip len and wid
	}

	console.log(results)
	return results.sort((a, b) => -((a.cpt * a.tpp) - (b.cpt * b.tpp)))[0];
}

export { ILayout, BasicLayout, findBestLayout };
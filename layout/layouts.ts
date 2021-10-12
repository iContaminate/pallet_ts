import { V3 } from "../v3.js";

import { ILayout } from "./layout.js";
import { BasicLayout } from "./basic_layout.js";

let LAYOUTS = [BasicLayout];

function findBestLayout(pallet: V3, box: V3): ILayout {
	let results: Array<ILayout> = [];

	let boxTurned = box.copy();
	[box.x, box.y] = [box.y, box.x];

	for (let i = 0, Layout; i < LAYOUTS.length; ++i) {
		Layout = LAYOUTS[i];

		results.push(new Layout(pallet, box)); // regular
		results.push(new Layout(pallet, boxTurned)); // flip len and wid
	}

	return results.sort((a, b) => (a.cpt * a.tpp) - (b.cpt * b.tpp))[0];
}

export { ILayout, BasicLayout, findBestLayout };
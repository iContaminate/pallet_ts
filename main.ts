import * as readline from "readline";

import { V3 } from "./v3.js";

import { ILayout, BasicLayout, findBestLayout } from "./layout/layouts.js";

function setup_rl(): { (prompt: string): Promise<string>; done(): void; } {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	function ask(prompt: string): Promise<string> {
		return new Promise((resolve, reject) => {
			rl.question(prompt, function (response: string) {
				resolve(response);
			});
		});
	}

	ask.done = () => rl.close();

	return ask;
}

async function main(): Promise<void> {
	const dimsPattern = /(?<len>[0-9]+)x(?<wid>[0-9]+)x(?<hgt>[0-9]+)/;
	const ask = setup_rl();

	let palletDimStr: string, boxDimStr: string;
	let palletDims: V3, boxDims: V3;

	try {
		while (true) {
			palletDimStr = await ask("Enter pallet dims in LxWxH format (or blank for 48x42x60): ");
			let result = dimsPattern.exec(palletDimStr);

			if (palletDimStr === "") { // use default if user just presses enter
				palletDimStr = "48x42x60";
				palletDims = new V3(48, 42, 60);
				break;
			}
			else if (result !== null && result?.groups !== undefined) {
				let [len, wid, hgt] = Object.values(result?.groups || []).map(Number);
				palletDims = new V3(len, wid, hgt);
				break;
			}
		}

		while (true) {
			boxDimStr = await ask("Enter box dims in LxWxH format: ");
			let result = dimsPattern.exec(boxDimStr);

			if (result !== null && result?.groups !== undefined) {
				let [len, wid, hgt] = Object.values(result?.groups || []).map(Number);
				boxDims = new V3(len, wid, hgt);
				break;
			}
		}

		ask.done();

		console.log(`Caculating best arrangement of a ${boxDimStr} box on a ${palletDimStr} pallet`);

		let bestLayout: ILayout = findBestLayout(palletDims, boxDims);

		console.log(`description: ${bestLayout.description}\ncpt: ${bestLayout.cpt}  tpp: ${bestLayout.tpp}`);
	} catch (error) { console.error(error); }
}

main();

export default main;
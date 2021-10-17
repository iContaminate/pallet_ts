import { V3 } from "./v3.js";
import { ILayout, findBestLayout } from "./layout/layouts.js";
import { ReadlineWrapper } from "./readline-wrapper.js";

async function main(): Promise<void> {
	const readlineWrapper = new ReadlineWrapper;

	const maxAttempts = 5;

	const palletPrompt = "Enter pallet dims in LxWxH format (or blank for 48x42x60): ";
	const palletPattern = /^(?:(?<len>[0-9]+)x(?<wid>[0-9]+)x(?<hgt>[0-9]+)|)$/; // matches blank string or <int>x<int>x<int>

	const boxPrompt = "Enter box dimensions in LxWxH format: ";
	const boxPattern = /(?<len>[0-9]+)x(?<wid>[0-9]+)x(?<hgt>[0-9]+)/; // matches blank string or <int>x<int>x<int>

	let palletDims: V3, boxDims: V3;
	let [len, wid, hgt]: number[] = [0, 0, 0];

	try {
		let pltMatches = await readlineWrapper.ask(palletPrompt, palletPattern, maxAttempts);

		if (pltMatches === null) throw Error("Invalid user input for pallet dimensions");

		// if there was input matched use the capture groups, otherwise you the default of 48x42x60
		if (pltMatches[0] !== "") [len, wid, hgt] = pltMatches.slice(1).map((e) => parseInt(e, 10));
		else[len, wid, hgt] = [48, 42, 60];

		palletDims = new V3(len, wid, hgt);

		let boxMatches = await readlineWrapper.ask(boxPrompt, boxPattern, maxAttempts);

		if (boxMatches === null) throw Error("Invalid user input for box dimensions");

		[len, wid, hgt] = boxMatches.slice(1).map((e) => parseInt(e, 10));

		boxDims = new V3(len, wid, hgt);

		console.log(`Caculating best arrangement of a ${boxDims} box on a ${palletDims} pallet`);
		let bestLayout: ILayout = findBestLayout(palletDims, boxDims);
		console.log(`description: ${bestLayout.description}\ncpt: ${bestLayout.cpt}  tpp: ${bestLayout.tpp}`);
	} catch (error) { console.log(""); console.error(error); }

	readlineWrapper.done();
}

main();

export default main;
const runForWeek = (samples: number[], weeks: number) => {
	const numSamples = samples.length;

	const sims: number[] = [];
	for (let i = 0; i < 10000; i++) {

		let stories = 0;

		for (let week = 0; week < weeks; week++) {
			const index = Math.floor(Math.random() * numSamples);
			stories += samples[index];
		}

		sims.push(stories);
	}

	const sorted = sims
		.sort((n1, n2) => n1 - n2)
		.reverse();

	const results: number[] = [];

	for (let i = 0; i < 99; i++) {
		results[i] = sorted[i * 100];
	}

	return results;

};

const runSimulations = (samples: number[]) => {
	const numSamples = samples.length;

	const sims: number[] = [];

	for (let i = 0; i < 100000; i++) {
		const index = Math.floor(Math.random() * numSamples);
		sims.push(samples[index]);
	}

	const sortedSims = sims
		.sort((n1, n2) => n1 - n2);

	console.log(sortedSims);

};

const runForRangeOfWeeks = (samples: number[], weeks: number) => {
	const allSims = []
	for (let week = 1; week < weeks + 1; week++) {
		const thisWeek = runForWeek(samples, week)
		allSims.push(thisWeek)
	}

	return allSims;
};

//
// const runForRangeOfWeeks = (samples: number[], weeks: number) => {
// 	let allSims = '"95%","80%","50%","20%","5%"\n';
//
// 	for (let week = 1; week < weeks + 1; week++) {
// 		const thisWeek = runForWeek(samples, week);
// 		allSims += `${week},${thisWeek['95']},${thisWeek['80']},${thisWeek['50']},${thisWeek['20']},${thisWeek['5']}
// `;
// 	}
//
// 	return allSims;
// };
//



export {
	runSimulations, runForWeek, runForRangeOfWeeks
};


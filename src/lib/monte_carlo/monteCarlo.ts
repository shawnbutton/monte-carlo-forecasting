const runForWeek = (samples: number[], weeks: number, trials: number) => {
	const numSamples = samples.length

	const sims: number[] = []

	for (let i = 0; i < trials; i++) {
		let stories = 0

		for (let week = 0; week < weeks; week++) {
			const index = Math.floor(Math.random() * numSamples)
			stories += samples[index]
		}

		sims.push(stories)
	}

	const sorted = sims.sort((n1, n2) => n1 - n2).reverse()

	const results: number[] = []

	for (let i = 0; i < 99; i++) {
		results[i] = sorted[(i + 1) * (trials / 100)]
	}

	return results
}

const runForRangeOfWeeks = (samples: number[], weeks: number, trials: number) => {
	const allSims: number[][] = []
	for (let week = 1; week < weeks + 1; week++) {
		const thisWeek = runForWeek(samples, week, trials)
		allSims.push(thisWeek)
	}

	return allSims
}

export { runForRangeOfWeeks }

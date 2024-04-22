import type { RequestEvent } from './$types';
import { runForRangeOfWeeks } from '$lib/monte_carlo/monte_carlo';

let results: number[][] = []
let throughputString: string = ''

export function load() {
	return {
		results,
		throughputString
	};
}

const MIN_TRIALS = 10000

const convertTrials = (trialsFromForm: string) => {
	if (Number.isNaN(trialsFromForm)) return MIN_TRIALS

	const trials = Number(trialsFromForm)
	return trials > MIN_TRIALS? trials: MIN_TRIALS
}

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await event.request.formData();

		const trialsFromForm = data.get('trials')!

		const trials = convertTrials(trialsFromForm as string)

		const throughputFromForm = data.get('throughputs')!

		let throughputs = (throughputFromForm as string)
			.split('\n')
			.filter(period => period)
			.filter(Number)
			.map(Number);

		throughputString = throughputs.join('\n')

		if (throughputs.length === 0) throughputs = [0]

		results = runForRangeOfWeeks(throughputs, 25, trials);
	}
}


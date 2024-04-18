import type { RequestEvent } from './$types';
import { runForRangeOfWeeks } from '$lib/monte_carlo';

let results: number[][] = [];

export function load() {
	return {
		results
	};
}

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await event.request.formData();

		const throughputData = data.get('throughputs')!;

		let throughputs = (throughputData as string)
			.split('\n')
			.filter(period => period)
			.filter(Number)
			.map(Number);

		if (throughputs.length === 0) throughputs = [0]

		results = runForRangeOfWeeks(throughputs, 25);
	}
}


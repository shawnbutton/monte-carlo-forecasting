import type { RequestEvent } from './$types';
import { runForRangeOfWeeks } from '$lib/monte_carlo';

let results = [];

export function load() {
	return {
		results
	};
}

export const actions = {
	default: async (event: RequestEvent) => {
		// TODO log the user in

		const data = await event.request.formData();

		const throughputData = data.get('throughputs')!;

		const throughputs = (throughputData as string)
			.split('\n')
			.filter(period => period)
			.filter(Number)
			.map(Number);

		const forecasts = runForRangeOfWeeks(throughputs, 25)

		console.log('what!!!');
		console.log(throughputs);

		results = forecasts;


	}
};


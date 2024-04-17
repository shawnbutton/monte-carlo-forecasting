import type { RequestEvent } from './$types';

let results: number[] = [];

export function load() {
	return {
		results
	};
}

export const actions = {
	default: async (event: RequestEvent) => {
		// TODO log the user in

		const data = await event.request.formData();

		const throughputs = data.get('throughputs')!;

		const periods = (throughputs as string)
			.split('\n')
			.filter(period => period)
			.map(str => str.slice(0, -1))
			.filter(Number)
			.map(Number);

		console.log('what!!!');
		console.log(periods);

		results = periods;


	}
};


import type { RequestEvent } from './$types'
import { runForRangeOfWeeks } from '$lib/monte_carlo/monte_carlo'

let results: number[][] = []
let throughputString: string = ''

export function load() {
	return {
		results,
		throughputString
	}
}

const convertNumberFromForm = (fromForm: string, defaultValue: number) => {
	if (Number.isNaN(fromForm)) return defaultValue

	return Number(fromForm)
}

const DEFAULT_TRIALS = 10000
const DEFAULT_PERIODS = 25

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await event.request.formData()

		const trials = convertNumberFromForm(data.get('trials')! as string, DEFAULT_TRIALS)

		const throughputFromForm = data.get('throughputs')! as string

		let throughputs = throughputFromForm
			.split('\n')
			.filter(period => period)
			.filter(Number)
			.map(Number)

		throughputString = throughputs.join('\n')

		if (throughputs.length === 0) throughputs = [0]

		const periods = convertNumberFromForm(data.get('periods')! as string, DEFAULT_PERIODS)

		results = runForRangeOfWeeks(throughputs, periods, trials)
	}
}

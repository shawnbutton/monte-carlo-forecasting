import { describe, it, expect } from 'vitest'

import { runForRangeOfWeeks } from '$lib/monte_carlo/monteCarlo'

describe('monte carlo', () => {
	it('forecasts the correct number of weeks', () => {
		const result = runForRangeOfWeeks([2, 3], 15, 100)

		expect(result.length).toBe(15)
	})

	it('forecasts the correct number percentages', () => {
		const result = runForRangeOfWeeks([2, 3], 1, 100)

		expect(result[0].length).toBe(99)
	})

	it('forecasts with results based on samples', () => {
		// this test does not validate the monte carlo forecast algorithm, just that there was a forecast containing the given samples
		const result = runForRangeOfWeeks([10, 20], 2, 10_000)

		expect(result[1][0]).toBe(40)
		expect(result[1][98]).toBe(20)
	})
})

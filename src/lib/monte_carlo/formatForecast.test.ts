import { describe, expect, it } from 'vitest'
import { formatForecast } from '$lib/monte_carlo/formatForecast'

const arrayFilledWith = (size: number, value: number | boolean) => Array(size).fill(value)

describe('forecast formatter', () => {
	it('formats with all percentages in weeks', () => {

		const weeks = [arrayFilledWith(99, 1), arrayFilledWith(99, 2)]
		const result = formatForecast(weeks, '2024-05-05', 'week', arrayFilledWith(19, true))

		expect(result).toMatchSnapshot()
	})
})

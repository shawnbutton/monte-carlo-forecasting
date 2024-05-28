import { describe, expect, it } from 'vitest'
import { formatForecast } from '$lib/monte_carlo/formatForecast'

const arrayFilledWith = (size: number, value: number | boolean) => Array(size).fill(value)

describe('forecast formatter', () => {
	it('', () => {

		const weeks = [arrayFilledWith(99, 1), arrayFilledWith(99, 2)]
		const result = formatForecast(weeks, '2024-05-05', 'week', arrayFilledWith(19, true))

		expect(result).toEqual(`"Date", 5%, 10%, 15%, 20%, 25%, 30%, 35%, 40%, 45%, 50%, 55%, 60%, 65%, 70%, 75%, 80%, 85%, 90%, 95%
2024-05-05, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
2024-05-12, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2`)
	})
})

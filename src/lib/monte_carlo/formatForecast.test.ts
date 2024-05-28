import { describe, expect, it } from 'vitest'
import { formatForecast } from '$lib/monte_carlo/formatForecast'

const arrayFilledWith = (size: number, value: number | boolean) => Array(size).fill(value)

const createMonteCarlo: () => [number[], number[]] = () => [arrayFilledWith(99, 1), arrayFilledWith(99, 2)]

const createPercentages = () => {
	const percentages = arrayFilledWith(19, false)
	percentages[5] = true
	percentages[10] = true
	percentages[15] = true
	return percentages
}

describe('forecast formatter', () => {
	it('formats in weeks', () => {
		const monteCarlo = createMonteCarlo()
		const percentages = createPercentages()
		const result = formatForecast(monteCarlo, '2024-05-05', 'week', percentages)

		expect(result).toMatchSnapshot()
	})

	it('formats in sprints', () => {
		const monteCarlo = createMonteCarlo()
		const percentages = createPercentages()
		const result = formatForecast(monteCarlo, '2024-05-05', 'sprint', percentages)

		expect(result).toMatchSnapshot()
	})

	it('formats in months', () => {
		const monteCarlo = createMonteCarlo()
		const percentages = createPercentages()
		const result = formatForecast(monteCarlo, '2024-05-05', 'months', percentages)

		expect(result).toMatchSnapshot()
	})

	it('formats with a different date', () => {
		const monteCarlo = createMonteCarlo()
		const percentages = createPercentages()
		const result = formatForecast(monteCarlo, '2024-10-10', 'week', percentages)

		expect(result).toMatchSnapshot()
	})

	it('formats with all percentages', () => {
		const monteCarlo = createMonteCarlo()
		const percentages = arrayFilledWith(19, true)
		const result = formatForecast(monteCarlo, '2024-05-05', 'months', percentages)

		expect(result).toMatchSnapshot()
	})

})

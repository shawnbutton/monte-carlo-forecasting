import { addDays, addMonths, isValid, lightFormat, parse } from 'date-fns'

const dateToString = (data: Date) => lightFormat(data, 'yyyy-MM-dd')

const addDaysToStart = (startDate: Date, daysToAdd: number) => (periodOn: number) =>
	addDays(startDate, periodOn * daysToAdd)

const addMonthsToStart = (startDate: Date) => (periodOn: number) => addMonths(startDate, periodOn)

const getPeriodAdder = (startDate: Date, period: string) => {
	switch (period) {
		case 'sprint':
			return addDaysToStart(startDate, 14)
		case 'month':
			return addMonthsToStart(startDate)
		default:
			// week
			return addDaysToStart(startDate, 7)
	}
}

export const formatForecast = (
	weeks: number[][],
	startDateString: string,
	period: string,
	percentages: boolean[]
) => {
	let startDate = parse(startDateString, 'yyyy-MM-dd', new Date())
	if (!isValid(startDate)) startDate = new Date()

	const periodAdder = getPeriodAdder(startDate, period)

	const percentValues = percentages
		.map((percentage, i) => {
			return percentage ? (i + 1) * 5 : 0
		})
		.filter(percentage => !!percentage)

	// const header = `"Date", "95%", "80%", "50%", "20%", "5%"\n`
	const header =
		`"Date", ` +
		percentValues
			.map(percentage => {
				return percentage + '%'
			})
			.join(', ') +
		`\n`

	return (
		header +
		weeks
			.map((thisWeek, week) => {
				const thisWeekPercents = percentValues
					.map(percent => {
						return thisWeek[percent]
					})
					.join(', ')

				return `${dateToString(periodAdder(week))}, ` + thisWeekPercents
			})
			.join('\n')
	)
}

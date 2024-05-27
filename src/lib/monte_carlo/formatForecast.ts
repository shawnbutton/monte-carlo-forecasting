import { addDays, addMonths, isValid, lightFormat, parse } from 'date-fns'

const dateToString = (data: Date) => lightFormat(data, 'yyyy-MM-dd')

const addDaysToStart = (startDate: Date, daysToAdd: number) => (periodOn: number) => addDays(startDate, periodOn * daysToAdd)
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

export const formatForecast = (weeks: number[][], startDateString: string, period: string, percentages: boolean[]) => {
	let startDate = parse(startDateString, 'yyyy-MM-dd', new Date())
	if (!isValid(startDate)) startDate = new Date()

	const periodAdder = getPeriodAdder(startDate, period)

	// const header = `"Date", "95%", "80%", "50%", "20%", "5%"\n`
	const header = `"Date", `
		+ percentages
			.map((percentage, i) => {
				console.log(percentage)
				return percentage ? (i + 1) * 5 + '%' : ''
			})
			.filter(percentage => !!percentage)
			.join(', ')
		+ `\n`

	return (
		header +
		weeks
			.map((thisWeek, week) => {
				return `${dateToString(periodAdder(week))}, ${thisWeek[95]}, ${thisWeek[80]}, ${thisWeek[50]}, ${thisWeek[20]}, ${thisWeek[5]}`
			})
			.join('\n')
	)
}

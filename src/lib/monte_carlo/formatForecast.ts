import { addDays, addMonths, isValid, lightFormat, parse } from 'date-fns'

type Period = 'week' | 'sprint' | 'month'

const dateToString = (data: Date) => lightFormat(data, 'yyyy-MM-dd')

const addDaysToStart = (startDate: Date, daysToAdd: number) => (periodOn: number) => addDays(startDate, periodOn * daysToAdd)
const addMonthsToStart = (startDate: Date) => (periodOn: number) => addMonths(startDate, periodOn)

const getPeriodAdder = (startDate: Date, period: Period) => {
	switch (period) {
		case 'week':
			return addDaysToStart(startDate, 7)
		case 'sprint':
			return addDaysToStart(startDate, 14)
		case 'month':
			return addMonthsToStart(startDate)
	}
}

export const formatForecast = (weeks: number[][], startDateString: string, period: Period) => {
	let startDate = parse(startDateString, 'yyyy-MM-dd', new Date())
	if (!isValid(startDate)) startDate = new Date()

	const periodAdder = getPeriodAdder(startDate, period)

	const header = `"Date", "95%", "80%", "50%", "20%", "5%"\n`
	return (
		header +
		weeks
			.map((thisWeek, week) => {
				return `${dateToString(periodAdder(week))}, ${thisWeek[95]}, ${thisWeek[80]}, ${thisWeek[50]}, ${thisWeek[20]}, ${thisWeek[5]}`
			})
			.join('\n')
	)
}

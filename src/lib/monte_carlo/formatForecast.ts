import { addDays, lightFormat, parse } from 'date-fns';

const dateToString = (data: Date) => lightFormat(data, 'yyyy-MM-dd');

export const formatForecast = (weeks: number[][], startDateString: string) => {
	const startDate = parse(startDateString, 'yyyy-MM-dd', new Date())

	const header = `"Date", "95%", "80%", "50%", "20%", "5%"\n`;
	return header +
		weeks
			.map((thisWeek, week) => {
				return `${dateToString(addDays(startDate, week * 7))}, ${thisWeek[95]}, ${thisWeek[80]}, ${thisWeek[50]}, ${thisWeek[20]}, ${thisWeek[5]}`;
			})
			.join('\n');
};

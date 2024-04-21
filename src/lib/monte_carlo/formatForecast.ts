export const formatForecast = (weeks: number[][]) => {
	const header = `"Period", "95%", "80%", "50%", "20%", "5%"\n`;
	console.log(weeks);
	return header +
		weeks
			.map((thisWeek, week) => {
				console.log('yep' + week + '|' + thisWeek + '/n');

				return `${week + 1}, ${thisWeek[95]}, ${thisWeek[80]}, ${thisWeek[50]}, ${thisWeek[20]}, ${thisWeek[5]}`;
			})
			.join('\n');
};

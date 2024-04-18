<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;

	$: displayed = formatData(data.results)

	const formatData = (weeks: number[][]) => {
		const header = `"Period", "95%", "80%", "50%", "20%", "5%"\n`;
		console.log(weeks);
		return header +
			weeks
				.map((thisWeek, week) => {
					console.log('yep' + week + '|' + thisWeek + '/n');

					return `${week + 1}, ${thisWeek[95]}, ${thisWeek[80]}, ${thisWeek[50]}, ${thisWeek[20]}, ${thisWeek[5]}`;
				})
		.join('\n');
	}

</script>

<div class="pl-3">

	<h1 class="text-2xl pb-5">Monte Carlo Forecaster</h1>

	<form method="POST" use:enhance>

		<label class="form-control pb-5">
			<div class="label">
				<span class="label-text">Enter Throughput Data</span>
			</div>
			<textarea name="throughputs" class="textarea textarea-bordered h-40 w-96 resize" placeholder="throughput data"></textarea>
		</label>

		<button class="btn">Run Trials</button>
	</form>

	<label class="form-control pb-5">
		<div class="label">
			<span class="label-text">Forecast</span>
		</div>
		<textarea name="forecast" class="textarea textarea-bordered h-40 w-96 resize" readonly placeholder="forecast data" bind:value="{displayed}"></textarea>
	</label>

</div>

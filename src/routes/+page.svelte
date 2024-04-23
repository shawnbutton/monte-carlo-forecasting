<script lang="ts">
	import { enhance } from '$app/forms';

	import { copy } from 'svelte-copy';
	import { formatForecast } from '$lib/monte_carlo/formatForecast';

	export let data;

	$: displayed = formatForecast(data.results);

	let numTrials = 10000;
	let numPeriods = 25;

	let isLoading = false;

	const startTrials = () => {
		isLoading = true;
		data.results = [];
	};

	const dataUrl = (data: string) => 'data:x-application/text,' + data;

	// hacky html way to download forecast to file
	const downloadTextareaContents = () => {
		const downloadLink = document.createElement('a');
		downloadLink.href = dataUrl(displayed);
		downloadLink.download = 'forecast.csv';

		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

</script>

<div class="pl-3">

	<form method="POST" use:enhance={() => {
    return async ({ update }) => {
      update({ reset: false })
			isLoading = false
    };
  }}
	>

		<label class="form-control pb-5">
			<div class="label">
				<span class="label-text text-lg">Enter Throughput Data</span>
			</div>
			<textarea name="throughputs" class="textarea textarea-bordered h-40 w-96 resize"
								bind:value="{data.throughputString}"
								placeholder="throughput data"></textarea>
		</label>

		<input name="periods" type="range" min="1" max="100"
					 bind:value="{numPeriods}" class="range w-96"
					 step="1" />
		<br />
		Forecast {numPeriods} period{numPeriods > 1 ? 's' : ''}:

		<br />
		<br />

		<input name="trials" type="range" min="10000" max="100000" bind:value="{numTrials}"
					 class="range w-96"
					 step="10000" />
		<br />
		Run {numTrials} trials

		<br />
		<br />

		<button class="btn btn-primary {isLoading? 'btn-disabled': ''}" on:click={startTrials}>Run Trials</button>
	</form>

	<br />

	<label class="form-control pb-5">
		<div class="label">
			<span class="label-text text-lg">Forecast</span>
		</div>
		<textarea name="forecast" id="forecast" class="textarea textarea-bordered h-40 w-96 resize" readonly
							placeholder="forecast data"
							bind:value="{displayed}"></textarea>
	</label>

	<button class="btn btn-primary" use:copy={displayed}>
		Copy to Clipboard
	</button>

	<button class="btn btn-primary" on:click={downloadTextareaContents}>
		Download CSV
	</button>

</div>

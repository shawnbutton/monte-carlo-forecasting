<script lang="ts">
	import { copy } from 'svelte-copy';
	import { formatForecast } from '$lib/monte_carlo/formatForecast';
	import { runForRangeOfWeeks } from '$lib/monte_carlo/monte_carlo';

	let displayed: string

	let trials = 10000;

	const dataUrl = (data: string) => 'data:x-application/text,' + data;

	const download = () => {
		var downloadLink = document.createElement('a');
		downloadLink.href = dataUrl(displayed);
		downloadLink.download = 'forecast.csv';

		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	let throughputData: string;

	const doIt = async () => {
		let throughputs = throughputData
			.split('\n')
			.filter(period => period)
			.filter(Number)
			.map(Number);

		if (throughputs.length === 0) throughputs = [0];

		let forecast = runForRangeOfWeeks(throughputs, 25, trials);

		displayed = formatForecast(forecast);
	};

</script>

<div class="pl-3">
	

	<label class="form-control pb-5">
		<div class="label">
			<span class="label-text">Enter Throughput Data</span>
		</div>
		<textarea name="throughputs" bind:value={throughputData} class="textarea textarea-bordered h-40 w-96 resize"
							placeholder="throughput data"></textarea>
	</label>


	<input name="trials" type="range" min="10000" max="1000000" bind:value="{trials}" class="range" step="10000" />

	<button class="btn" on:click={doIt}>Run {trials} Trials</button>
	<!--	</form>-->

	<label class="form-control pb-5">
		<div class="label">
			<span class="label-text">Forecast</span>
		</div>
		<textarea name="forecast" id="forecast" class="textarea textarea-bordered h-40 w-96 resize" readonly
							placeholder="forecast data"
							bind:value="{displayed}"></textarea>
	</label>

	<button class="btn" use:copy={displayed}>
		Copy to Clipboard
	</button>

	<button class="btn" on:click={download}>
		Download CSV
	</button>

</div>

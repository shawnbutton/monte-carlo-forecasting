<script lang="ts">
	import { enhance } from '$app/forms';

	import { copy } from 'svelte-copy';

	export let data;

	$: displayed = formatData(data.results);

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
	};

	const dataUrl = (data: string) => 'data:x-application/text,' + data

	const download = () => {
		var downloadLink = document.createElement("a");
		downloadLink.href = dataUrl(displayed);
		downloadLink.download = "forecast.csv";

		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

</script>

<div class="pl-3">

	<form method="POST" use:enhance={() => {
    return async ({ update }) => {
      update({ reset: false });
    };
  }}


	>

		<label class="form-control pb-5">
			<div class="label">
				<span class="label-text">Enter Throughput Data</span>
			</div>
			<textarea name="throughputs" class="textarea textarea-bordered h-40 w-96 resize"
								placeholder="throughput data"></textarea>
		</label>

		<button class="btn">Run Trials</button>
	</form>

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

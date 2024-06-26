<script lang="ts">
	import { enhance } from '$app/forms'
	import { copy } from 'svelte-copy'

	import { addDays, lightFormat } from 'date-fns'

	import { formatForecast } from '$lib/monte_carlo/formatForecast'

	const currentDate = lightFormat(addDays(new Date(), 1), 'yyyy-MM-dd')

	export let data

	$: displayed = formatForecast(data.results, startDate, period, displayedPercentage)

	let numTrials = 10000
	let numPeriods = 25
	let period = 'week'
	let startDate = currentDate

	let isLoading = false

	let percentages = Array(19)
		.fill(0)
		.map((_, i) => i * 5 + 5)

	let displayedPercentage = Array(19).fill(false)
	displayedPercentage[3] = true // 20%
	displayedPercentage[9] = true // 50%
	displayedPercentage[15] = true // 80%

	const dataUrl = (data: string) => 'data:x-application/text,' + data

	// hacky html way to download forecast to file
	const downloadTextareaContents = () => {
		const downloadLink = document.createElement('a')
		downloadLink.href = dataUrl(displayed)
		downloadLink.download = 'forecast.csv'

		document.body.appendChild(downloadLink)
		downloadLink.click()
		document.body.removeChild(downloadLink)
	}
</script>

<div class="pl-3">
	<form
		method="POST"
		use:enhance={() => {
			isLoading = true
			data.results = []

			return async ({ update }) => {
				update({ reset: false })
				isLoading = false
			}
		}}
	>
		<label class="form-control pb-5">
			<div class="label">
				<span class="label-text text-lg">Throughput History:</span>
			</div>
			<textarea
				name="throughputs"
				class="textarea textarea-bordered h-40 w-96 resize"
				bind:value={data.throughputString}
				placeholder="For example, story points, or # of stories completed. Might be per sprint, per week, or per month. Enter each number on a separate line."
				required
			></textarea>
		</label>

		<div class="divider" />
		Period of Data:
		<div class="join">
			<input
				class="join-item btn"
				type="radio"
				name="radio-period"
				aria-label="Weeks"
				value="week"
				bind:group={period}
			/>
			<input
				class="join-item btn"
				type="radio"
				name="radio-period"
				aria-label="Sprints"
				value="sprint"
				bind:group={period}
			/>
			<input
				class="join-item btn"
				type="radio"
				name="radio-period"
				aria-label="Months"
				value="month"
				bind:group={period}
			/>
		</div>

		<br/>
		<br/>

		Forecast {numPeriods}
		{period}{numPeriods > 1 ? 's' : ''}:
		<input
			name="periods"
			type="range"
			min="1"
			max="100"
			bind:value={numPeriods}
			class="range w-96"
			step="1"
		/>
		<br />
		<br/>

		<label for="start-date" class="label cursor-pointer">Forecast Start Date:</label>
		<input type="date" id="start" name="start-date" required bind:value={startDate} />

		<div class="divider" />

		<div class="pb-5">Percentages to Include:</div>
		{#each percentages as percentage, percentIndex}
			<span class="pl-5">{percentage}%</span>
			<input
				type="checkbox"
				bind:checked={displayedPercentage[percentIndex]}
				class="checkbox checkbox-primary"
			/>
		{/each}

		<div class="divider" />

		Run {numTrials} Trials:
		<input
			name="trials"
			type="range"
			min="10000"
			max="100000"
			bind:value={numTrials}
			class="range w-96"
			step="10000"
		/>
		<br />

		<div class="divider" />

		<button class="btn btn-primary {isLoading ? 'btn-disabled' : ''}">
			Create Forecast
		</button>
	</form>

	<br />

	<label class="form-control pb-5">
		<div class="label">
			<span class="label-text text-lg">Forecast:</span>
		</div>
		<textarea
			name="forecast"
			id="forecast"
			class="textarea textarea-bordered h-40 w-96 resize {isLoading ? 'hidden' : ''}"
			readonly
			placeholder="forecast data"
			bind:value={displayed}
		></textarea>
		<div class="skeleton h-40 w-96 {isLoading ? '' : 'hidden'}"></div>
	</label>

	<button class="btn btn-primary" use:copy={displayed}> Copy to Clipboard</button>

	<button class="btn btn-primary" on:click={downloadTextareaContents}> Download CSV</button>
</div>

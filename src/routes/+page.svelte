<script lang="ts">
	export let data;
</script>

<div class="pl-3">

	<h1 class="text-2xl pb-5">Monte Carlo Forecaster</h1>

	<form method="POST">

		<label class="form-control pb-5">
			<div class="label">
				<span class="label-text">Enter Throughput Data</span>
			</div>
			<textarea name="throughputs" class="textarea textarea-bordered h-24" placeholder="throughput data"></textarea>
		</label>

		<button class="btn">Run Trials</button>
	</form>

	"95%", "80%", "50%", "20%", "5%"
	<br />
	{#each data.results as thisWeek, week}
		{week},
		{thisWeek['95']},
		{thisWeek['80']},
		{thisWeek['50']},
		{thisWeek['20']},
		{thisWeek['5']}
		<br>
	{/each}

</div>

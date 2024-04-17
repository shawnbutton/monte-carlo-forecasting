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

	{#each data.results as result}
		{result}<br/>
	{/each}

</div>


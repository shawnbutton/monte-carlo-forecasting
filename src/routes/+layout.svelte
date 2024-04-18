<script>
	import 'tailwindcss/tailwind.css';
	import Nav from "$lib/components/Nav.svelte";
</script>

<Nav />

<div class="wrapper">
	<slot />
</div>

<style>
    .wrapper {
        max-width: 38rem;
        margin-inline: auto;
        padding-inline: 1rem;
    }
</style>
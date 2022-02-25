<script lang="ts">
	export let visible = true;
</script>

<div class="sep" class:visible>
	<div>
		<slot name="1" />
	</div>
	<div>
		<slot name="2" />
	</div>
</div>

<style>
	.sep.visible {
		display: flex;
	}
	.sep {
		display: none;
	}
	.sep :first-child {
		border-right: 1px solid var(--fg-primary);
	}
	.sep div {
		flex: 1;
		display: grid;
		place-items: center;
	}
</style>

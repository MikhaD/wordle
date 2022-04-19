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
	<div>
		<slot name="3" />
	</div>
	<div>
		<slot name="4" />
	</div></div>

<style>
	.sep.visible {
		display: grid;
        grid-template-columns: 1fr 1fr;
	}
	.sep {
		display: none;
	}
	.sep :first-child, .sep :nth-child(3) {
		border-right: 1px solid var(--fg-primary);
	}
	.sep div {
		flex: 1;
		display: grid;
		place-items: center;
	}
</style>

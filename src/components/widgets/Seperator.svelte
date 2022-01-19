<div class="sep">
	<div>
		<slot name="1" />
	</div>
	<div>
		<slot name="2" />
	</div>
</div>

<style>
	.sep {
		display: flex;
	}
	.sep :first-child {
		border-right: 1px solid var(--color-tone-1);
	}
	.sep div {
		flex: 1;
		display: grid;
		place-items: center;
	}
</style>

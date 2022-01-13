<script lang="ts">
	import GameIcon from "./GameIcon.svelte";

	export let visible = false;
	export let fullscreen = false;
</script>

{#if fullscreen}
	<div class:visible class="page">
		<div class="content">
			<div class="exit" on:click={() => (visible = false)}>
				<GameIcon>
					<path
						d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
					/>
				</GameIcon>
			</div>
			<slot />
		</div>
	</div>
{:else}
	<div class:visible class="overlay" on:click|self={() => (visible = false)}>
		<div class="modal">
			<div class="exit" on:click={() => (visible = false)}>
				<GameIcon>
					<path
						d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
					/>
				</GameIcon>
			</div>
			<slot />
		</div>
	</div>
{/if}

<style>
	.visible {
		visibility: visible !important;
	}
	.visible .modal,
	.visible .content {
		margin-top: 0;
		opacity: 1;
	}
	.overlay {
		visibility: hidden;
		position: absolute;
		inset: 0;
		background-color: var(--opacity-50);
		display: grid;
		place-items: center;
		z-index: 1;
		overflow: hidden;
		font-size: 14px;
	}
	.modal {
		--exit-offset: 16px;
		background-color: var(--color-background);
		width: var(--game-width);
		min-height: 60px;
		max-height: 90%;
		overflow-y: auto;
		border-radius: 8px;
		border: 1px solid var(--modal-border);
		padding: var(--exit-offset);
		position: relative;
		margin-top: 50vh;
		opacity: 0;
		transition: all 0.3s ease;
		box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
	}
	.page {
		font-size: 14px;
		visibility: hidden;
		z-index: 1;
		position: absolute;
		inset: 0;
		overflow: hidden;
	}
	.content {
		height: 100%;
		background-color: var(--color-background);
		--exit-offset: 0;
		width: var(--game-width);
		margin: 50vh auto 0 auto;
		position: relative;
		padding: 10px 0;
		opacity: 0;
		transition: all 0.3s ease;
	}
	.exit {
		position: absolute;
		right: var(--exit-offset);
	}
</style>

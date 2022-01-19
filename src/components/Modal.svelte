<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import GameIcon from "./GameIcon.svelte";

	export let visible = false;
	export let fullscreen = false;

	const dispach = createEventDispatcher();

	function close() {
		visible = false;
		dispach("close");
	}
</script>

{#if fullscreen}
	<div class:visible class="page">
		<div class="exit" on:click={close}>
			<GameIcon>
				<path
					d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
				/>
			</GameIcon>
		</div>
		<slot />
	</div>
{:else}
	<div class:visible class="overlay" on:click|self={close}>
		<div class="modal">
			<div class="exit" on:click={close}>
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
	/* shared styles */
	.overlay.visible,
	.visible.page,
	.visible .modal {
		top: 0;
		opacity: 1;
		visibility: visible;
	}
	.overlay,
	.page {
		font-size: 14px;
		visibility: hidden;
		position: absolute;
		z-index: 1;
		transition: all 0.2s ease;
		opacity: 0;
		inset: 0;
	}
	.exit {
		position: absolute;
		right: var(--exit-offset);
	}
	/* regular modal */
	.overlay {
		background-color: var(--opacity-50);
	}
	.modal {
		--exit-offset: 16px;
		background-color: var(--color-background);
		width: var(--game-width);
		height: min-content;
		max-height: 90%;
		overflow-y: auto;
		border-radius: 8px;
		border: 1px solid var(--modal-border);
		padding: var(--exit-offset);
		position: absolute;
		inset: 20vh 0 0;
		margin: auto;
		box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
		transition: all 0.2s ease;
	}
	:global(.modal > *) {
		margin-bottom: 20px;
	}
	/* fullscreen modal */
	.page {
		background-color: var(--color-background);
		top: 10vh;
		height: 100%;
		--exit-offset: 0;
		width: var(--game-width);
		margin: auto;
		padding: 10px 0;
	}
</style>

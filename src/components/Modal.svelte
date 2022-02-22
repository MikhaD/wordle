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
		<div>
			<slot />
		</div>
		<slot name="footer" />
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

<style lang="scss">
	@mixin modal-outer() {
		transition: all 0.2s ease;
		font-size: var(--fs-small);
		visibility: hidden;
		position: absolute;
		z-index: 1;
		opacity: 0;
		inset: 0;
	}
	.overlay.visible,
	.visible.page,
	.visible .modal {
		top: 0;
		opacity: 1;
		visibility: visible;
	}
	.exit {
		position: absolute;
		top: var(--modal-padding);
		right: var(--modal-padding);
	}
	/* regular modal */
	.overlay {
		@include modal-outer();
		background: #0008;
	}
	.modal {
		--modal-padding: 16px;
		background: var(--bg-primary);
		max-width: var(--game-width);
		height: min-content;
		max-height: 90%;
		overflow-y: auto;
		border-radius: 8px;
		border: 1px solid var(--bg-secondary);
		padding: var(--modal-padding);
		padding-top: calc(2 * var(--modal-padding));
		position: absolute;
		width: 90%;
		inset: 20vh 0 0;
		margin: auto;
		transition: all 0.3s ease;
		> :global(*:not(h3)) {
			margin-bottom: 15px;
		}
	}
	/* fullscreen modal */
	.page {
		@include modal-outer();
		background: var(--bg-primary);
		top: 10vh;
		height: 100%;
		max-width: var(--game-width);
		margin: auto;
		padding: 10px 16px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow-y: auto;
		.exit {
			top: 10px;
			right: 10px;
		}
	}
	:global([slot="footer"]) {
		color: var(--fg-secondary);
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		text-align: end;
	}
</style>

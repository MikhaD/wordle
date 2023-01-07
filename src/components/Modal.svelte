<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import GameIcon from "./GameIcon.svelte";

	export let visible = false;
	export let fullscreen = false;

	const dispatch = createEventDispatcher();

	function close() {
		visible = false;
		dispatch("close");
	}
</script>

<div
	class:visible
	class="overlay {fullscreen ? 'fullscreen' : 'popup'}"
	on:click|self={close}
	on:keydown|self={close}
>
	<div class="modal">
		<div class="exit" on:click={close} on:keydown={close}>
			<GameIcon>
				<path
					d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
				/>
			</GameIcon>
		</div>
		<div class="content" on:close={close}>
			<slot />
		</div>
		<div class="footer">
			<slot name="footer" />
		</div>
	</div>
</div>

<style lang="scss">
	.overlay {
		transition: all 0.2s ease;
		font-size: var(--fs-small);
		visibility: hidden;
		z-index: 1;
		position: absolute;
		opacity: 0;
		inset: 0;
		background: #0008;
	}
	.fullscreen.overlay {
		background: var(--bg-primary);
	}
	.modal {
		margin: auto;
		background: var(--bg-primary);
		max-width: var(--game-width);
		position: absolute;
		inset: 0;
		top: 10vh;
		transition: all 0.2s ease;
		overflow-y: auto;
	}
	.popup .modal {
		--modal-padding: 16px;
		height: min-content;
		max-height: 90%;
		border-radius: 8px;
		border: 1px solid var(--bg-secondary);
		padding: var(--modal-padding);
		padding-top: calc(2 * var(--modal-padding));
		width: 90%;
	}
	.content > :global(div) {
		margin-bottom: 14px;
	}
	.fullscreen .modal {
		height: 100%;
		padding: 10px 16px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.exit {
			top: 10px;
			right: 10px;
		}
	}
	.overlay.visible,
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
	.footer {
		color: var(--fg-secondary);
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		text-align: end;
	}
</style>

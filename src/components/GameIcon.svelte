<script lang="ts">
	export let onClick = () => {};
    export let Tooltip = "";


    let isHovered = false;
	let x;
	let y;
	
	function mouseOver(event) {
		isHovered = true;
		x = event.pageX + 5 - this.offsetLeft;
		y = event.pageY + 5;
	}
	function mouseMove(event) {
		x = event.pageX + 5 - this.offsetLeft;
		y = event.pageY + 5;
	}
	function mouseLeave() {
		isHovered = false;
	}
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
    on:click={onClick}
    on:mouseover={mouseOver}
    on:mouseleave={mouseLeave}
	on:mousemove={mouseMove}
    >
	<slot />
</svg>
{#if isHovered && !(Tooltip==="")}
	<div style="top: {y}px; left: {x}px;" class="tooltip">{Tooltip}</div>
{/if}


<style lang="scss">
	svg {
		cursor: pointer;
		width: 24px;
		margin: 0 4px;
		:global(path) {
			fill: var(--icon-color);
		}
	}

	.tooltip {
		border: 1px solid #ddd;
		box-shadow: 1px 1px 1px #ddd;
		background: white;
		border-radius: 4px;
		padding: 4px;
		position: absolute;
        margin: 0px;
        font-size: var(--fs-small);
        font-weight: 400;
        text-transform: none;
        letter-spacing: 0px;
	}
</style>
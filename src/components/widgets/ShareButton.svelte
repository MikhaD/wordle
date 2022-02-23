<script>
  export let href;
  export let label = '';
  export let fill = true;
  export let ariaLabel = '';
  let classes = '';

  export { classes as class };
</script>

<style>
.ssbc-button__link,
.ssbc-button__icon {
  display: inline-block;
}

.ssbc-button__link {
  text-decoration: none;
  color: #fff;
}

.ssbc-button {
  transition: 25ms ease-out;
  padding: 0.75em;
}

.ssbc-button__icon :global(svg) {
  width: 1em;
  height: 1em;
  margin: 0;
  vertical-align: middle;
}

.ssbc-button__icon--fill {
  fill: #fff;
  stroke: none;
}

.ssbc-button__icon--outline {
  fill: none;
  stroke: #fff;
}
</style>

<a class="ssbc-button__link" {href} target="_blank" rel="noopener" aria-label={ariaLabel}>
  <div class="ssbc-button {classes}">
    <div aria-hidden="true" class="ssbc-button__icon" class:ssbc-button__icon--fill={fill} class:ssbc-button__icon--outline={!fill}>
      <slot></slot>
    </div>
    {label}
  </div>
</a>
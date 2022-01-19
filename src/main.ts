import App from "./App.svelte";
import words from "./words_5";

export default new App({
	target: document.body,
	props: {
		words
	}
});

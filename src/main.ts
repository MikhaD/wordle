import App from "./App.svelte";

export default new App({
	target: document.body,
	props: {
		wordData: (async () => (await fetch("./words_5.json")).json())(),
		chances: 6,
	}
});

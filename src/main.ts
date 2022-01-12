import App from "./App.svelte";

export default new App({
	target: document.body,
	props: {
		wordData: (async () => (await fetch("words_5.json", { headers: { "Content-Type": "application/json", "Accept": "application/json" } })).json())(),
		chances: 6,
	}
});

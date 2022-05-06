<script context="module" lang="ts">
    import type {WordVerseMatches} from "../../types";

    const cache = new Map<string, Promise<WordVerseMatches>>();
</script>

<script lang="ts">
    import type {VerseReference, WordVerseMatches} from "../../types";

    export let word: string;

    async function getWordData(word: string): Promise<WordVerseMatches> {
        if (!cache.has(word)) {
            const data = await fetch(`/verseAssets/${word}.json`, {
                mode: "cors",
            });
            if (data.ok) {
                cache.set(word, (await data.json()));
            } else {
                throw new Error(`Failed to fetch definition`);
            }
        }
        return cache.get(word);
    }

    function formatReferenceToQueryParam(reference: VerseReference) {
        return encodeURIComponent(`${reference.book} ${reference.chapter}:${reference.verse}`);
    }
</script>

<div class="def">
    {#await getWordData(word)}
        <h4>Fetching definition...</h4>
    {:then data}
        <h3>Selected Verses for "{word}"</h3>
        <ul>
            {#each data.selectedVerses as verse}
                <li>{verse.reference.book} {verse.reference.chapter}:{verse.reference.verse} - {verse.text}</li>
            {/each}
        </ul>
        <h3>All References</h3>
        <ul>
            {#each data.allVerseReferences as reference}
                <li>
                    <a href="https://www.biblegateway.com/passage/?search={formatReferenceToQueryParam(reference)}&version=ESV" target="_blank">{reference.book} {reference.chapter}:{reference.verse}</a>
                </li>
            {/each}
        </ul>
    {:catch}
        <div>Your word was <strong>{word}</strong>. This is not a word in our Bible words list.</div>
    {/await}
</div>

<style>
    h2 {
        display: inline-block;
        margin-right: 1rem;
        margin-bottom: 0.8rem;
    }

    ol {
        padding-left: 1.5rem;
    }

    li {
        margin-bottom: 0.5rem;
    }

    li::first-letter {
        text-transform: uppercase;
    }

    li::marker {
        color: var(--fg-secondary);
    }
</style>

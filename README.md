# WORDLE Clone
A remake of the popular game Wordle with additional modes and features, written in Svelte using Typescript, hosted on GitHub pages [here]().
## Additional Features
Words are chosen from the list of words at random instead of in sequence, and the solution is not stored in localStorage, making it harder to cheat. The seed for the random number is created from the date, ensuring that everyone gets the same random number, so people can still compare answers.
### Hourly mode
A new word every hour.
### Infinite Mode
A new word every time you refresh, for the true addicts.

# Technical details
This is written in Svelte using Typescript. This is my first Svelte project, and is intended as an exercise to help me learn and become proficient in Svelte.
This is still in development. My goal is to make it as close to the original wordle as possible while also adding additional features. I will continue to make it more similar to the original.

<details>
<summary>To do</summary>

# To Do
## Before Release
- Add link to repo in settings if people find bugs
- Add version to readme
- Add Deploy workflow badge to readme
- Add guess distribution
- Add timer which turns into a refresh button
- add toasts
- add animations
- add google analytics or a [similar library](https://www.sitepoint.com/10-web-analytics-packages-for-tracking-your-visitors/) to track # of visitors

## Less serious

- remove unused css variables
- get rid of magic numbers (for length of word and number of guesses)

## Done

- add changes & additions to README
- pressing escape should close open modals
- implement hard mode
- add statistics button if you have completed one or more games
- add tutorial
- implement fail state
- implement word number
- break streak if the player isn't back the next day (if daySeed - lastGame > 86400000)
- consolidate all mentions of the different game modes to make it easier to add more modes
- Add option to change game mode in settings (along with description of what mode does?)
- Prevent Definition component from making api request every time mode is changed

# Bugs

- Number of guesses not being recorded properly
- ~~Game not refreshing on reload where it should be (may require saving last on in game state)~~
</details>

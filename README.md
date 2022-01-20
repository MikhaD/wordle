# Wordle+
[![Publish](https://github.com/MikhaD/wordle/workflows/Publish/badge.svg?branch=main)](https://mikhad.github.io/wordle/)
![GitHub package.json version](https://img.shields.io/github/package-json/v/MikhaD/wordle)

A recreation of the popular game [Wordle](https://www.powerlanguage.co.uk/wordle/) by Josh Wardle with additional modes and features, written with Svelte in Typescript.
Hosted on GitHub pages [here](https://mikhad.github.io/wordle/).

## Additional Features
Words are chosen from the list of words at random instead of in sequence, and the solution is not stored in localStorage, making it harder to cheat. The seed for the random number is created from the date, ensuring that everyone gets the same random number, so people can still compare answers.

### Hourly mode
A new word every hour.

### Infinite mode
A new word every time you refresh, for the true addicts.

# Technical details
This is written with Svelte in Typescript. This is my first Svelte project, and is intended as an exercise to help me learn and become proficient in Svelte.
This is still in development. My goal is to make it as close to the original wordle as possible while also adding additional features. I will continue to make it more similar to the original.

<details>
<summary>To do</summary>

# To Do
## Before Release
- disallow players from turning hard mode on if the current game wouldn't be possible in hard mode
- Add link to repo in settings if people find bugs
- Add guess distribution
- Add timer which turns into a refresh button
- Add toasts
- Add animations
- Add google analytics or a [similar library](https://www.sitepoint.com/10-web-analytics-packages-for-tracking-your-visitors/) to track # of visitors

## Less serious
- add right click menu on rows that allows you to get the dictionary definition for that row
- if a row is right clicked when the game is over, show the number of possible words that could have been played in that row (if hard mode was on)
- remove unused css variables
- get rid of magic numbers (for length of word and number of guesses)
- Add manifest.json and make it into a PWA

## Done
- Add version to readme
- Add Deploy workflow badge to readme
- Add changes & additions to README
- Pressing escape should close open modals
- Implement hard mode
- Add statistics button if you have completed one or more games
- Add tutorial
- Implement fail state
- Implement word number
- Break streak if the player isn't back the next day (if daySeed - lastGame > 86400000)
- Consolidate all mentions of the different game modes to make it easier to add more modes
- Add option to change game mode in settings (along with description of what mode does?)
- Prevent Definition component from making api request every time mode is changed

# Bugs

- Number of guesses not being recorded properly
- ~~Game not refreshing on reload where it should be (may require saving last on in game state)~~
</details>

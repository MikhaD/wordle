# Wordle+
[![Publish](https://github.com/MikhaD/wordle/workflows/Publish/badge.svg?branch=main)](https://mikhad.github.io/wordle/)
![GitHub package.json version](https://img.shields.io/github/package-json/v/MikhaD/wordle)

A recreation of the popular game [Wordle](https://www.powerlanguage.co.uk/wordle/) by Josh Wardle with additional modes and features, written with Svelte in Typescript.
Hosted on GitHub pages [here](https://mikhad.github.io/wordle/).

## Additional Features
- Words are chosen from the list of words at random instead of in sequence, and the solution is not stored in localStorage, making it harder to cheat. The seed for the random number is created from the date, ensuring that everyone gets the same random number, so people can still compare answers.
- When you complete a game the definition of the word is shown on the end of game modal.
- In addition to the other statistics, your average guesses are also displayed on the win modal.
- When the timer reaches 0 for a given game mode it changes into a refresh button instead of just staying at 00:00:00

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
- Fix timing nonsense with timings & delay variable
- fix modal width scaling

## Less serious
- add right click menu on rows that allows you to get the dictionary definition for that row
- if a row is right clicked when the game is over, show the number of possible words that could have been played in that row (if hard mode was on)
- remove unused css variables
- Add gallery type tip widget to settings with tips like: You can also change the gamemode by clicking wordle+, right clicking wordle+ chnages the gamemode in the other direction, right click a word on the board to learn its definition, you can turn hard mode on during a game if you haven't violated the hard mode rules during that game so far, after a game you can right click a word to see how many words you could have played there taking all hints into consideration, because words are chosen from the list randomly it is possible to get the same word again, you can refresh the page to play a new wordle when one is ready, etc.
- get rid of magic numbers (for length of word and number of guesses)
- Add manifest.json and make it into a PWA
- Tidy up animation code and make animation mechanism consistant (if possible)

## Done
- Add winning toasts
- Add link to repo in settings if people find bugs
- Add animations
- disallow players from turning hard mode on if the current game wouldn't be possible in hard mode
- Add toasts
- Add timer which turns into a refresh button
- add a refresh button next to the tutorial button when a new wordle is available for a given mode
- Add google analytics to track number of visitors
- Add game mode to shared data
- Add guess distribution
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
- Definition frequently fails to be fetched
- Not reactive enough, goes offscreen on mobile
- Number of guesses not being recorded properly
- ~~Board does not scale~~
- ~~Mode symbol not in the correct place on different sized screens (Make it part of the board so that it stays behind it)~~
- ~~Game not refreshing on reload where it should be (may require saving last on in game state)~~
</details>

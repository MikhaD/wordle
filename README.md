# WORDLE Clone
A clone of the game [Wordle](https://www.dailywordle.com/) with words picked at random instead of from a sequence, written with Svelte in Typescript.

# To Do
- [ ] add toasts
- [ ] add animations
- [ ] remove unused css variables
- [ ] add changes & additions to README
- [ ] get rid of magic numbers (for length of word and number of guesses)
- [ ] Add guess distribution
- [ ] Add timer which turns into a refresh button
- [x] pressing escape should close open modals
- [x] implement hard mode
- [x] add statistics button if you have completed one or more games
- [x] add tutorial
- [x] implement fail state
- [x] implement word number
- [x] break streak if the player isn't back the next day (if daySeed - lastGame > 86400000)
- [x] consolidate all mentions of the different game modes to make it easier to add more modes
- [x] Add option to change game mode in settings (along with description of what mode does?)
- [x] Prevent Definition component from making api request every time mode is changed

# Bugs
- [ ] Game not refreshing on reload where it should be (may require saving last on in game state)
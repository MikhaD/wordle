# WORDLE Clone
A clone of the game [Wordle](https://www.dailywordle.com/) with words picked at random instead of from a sequence, written with Svelte in Typescript.

# To Do
Maybe the current value should be a store instead of being passed everywhere?
Word should definately be a store or some sort of global (maybe a non writeable store if possible?)
in Board if guess changes, the previous row should have its state changed so it knows finished
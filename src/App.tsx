import { languages } from "./data/languages.ts";
import { Chip } from "./components/Chip.tsx";
import { useState } from "react";
import { Word } from "./components/Word.tsx";
import { Keyboard } from "./components/Keyboard.tsx";

function Hangman() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const wrongGuessCount = guessedLetters.reduce(
    (acc, curr) => currentWord.includes(curr) ? acc : acc + 1,
    0,
  );

  const isGameWon = currentWord.split("").every((letter) =>
    guessedLetters.includes(letter)
  );
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  function addGuessedLetter(letter: string) {
    setGuessedLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  return (
    <main className="grid grid-col-1 items-start bg-background text-foreground h-svh p-4">
      <div className="grid gap-8 justify-items-center">
        <header className="text-center space-y-2">
          <h1 className="text-2xl text-accent font-medium">
            Assembly: Endgame
          </h1>
          <p className="max-w-[45ch] mx-auto">
            Guess the word withing 8 attempts to keep the programming word save
            from Assembly!
          </p>
        </header>

        <div className="text-2xl bg-green-500 p-2 rounded-md text-white text-center w-full max-w-96">
          <p>You win!</p>
          <p>Well done! 🥳</p>
        </div>

        <section className="flex flex-wrap max-w-lg justify-center gap-2">
          <h2 className="sr-only">Programming Languages</h2>
          {languages.map(({ name, backgroundColor, color }, index) => (
            <Chip
              key={name}
              name={name}
              backgroundColor={backgroundColor}
              color={color}
              isDead={index < wrongGuessCount}
            />
          ))}
        </section>

        <section>
          <Word word={currentWord} guessedLetters={guessedLetters} />
        </section>

        <section>
          <Keyboard
            onKeyPress={addGuessedLetter}
            currentWord={currentWord}
            guessedLetters={guessedLetters}
          />
        </section>

        {isGameOver &&
          (
            <button className="bg-blue-500 text-white p-2 rounded-md text-center w-full max-w-72">
              New Game
            </button>
          )}
      </div>
    </main>
  );
}

export default Hangman;

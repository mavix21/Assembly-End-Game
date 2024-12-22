import { languages } from "./data/languages.ts";
import { Chip } from "./components/Chip.tsx";
import { useState } from "react";
import { Word } from "./components/Word.tsx";
import { Keyboard } from "./components/Keyboard.tsx";
import clsx from "clsx";
import { getFarewellText } from "./utils/get-farewell-message.ts";
import { words } from "./data/words.ts";
import { getRandomFrom } from "./utils/get-random-from.ts";
import Confetti from "react-confetti";

const MAX_ATTEMPTS = languages.length - 1;

function Hangman() {
  const [currentWord, setCurrentWord] = useState(() => getRandomFrom(words));

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const wrongGuessCount = guessedLetters.reduce(
    (acc, curr) => currentWord.includes(curr) ? acc : acc + 1,
    0,
  );

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];

  const isLastGuessIncorrect = lastGuessedLetter &&
    !currentWord.includes(lastGuessedLetter);

  console.log("Is last guess incorrect: ", isLastGuessIncorrect);

  const deadLanguage = wrongGuessCount > 0
    ? languages[wrongGuessCount - 1].name
    : "";

  const isGameWon = currentWord.split("").every((letter) =>
    guessedLetters.length > 0 && guessedLetters.includes(letter)
  );
  const isGameLost = wrongGuessCount >= MAX_ATTEMPTS;
  const isGameOver = isGameWon || isGameLost;

  function addGuessedLetter(letter: string) {
    setGuessedLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  return (
    <main className="relative grid grid-col-1 items-start bg-background text-foreground h-svh p-4 overflow-hidden">
      <div className="grid gap-8 justify-items-center">
        <header className="text-center space-y-2">
          <h1 className="text-2xl text-accent font-medium">
            Assembly: Endgame
          </h1>
          <p className="max-w-[45ch] mx-auto">
            Guess the word withing {MAX_ATTEMPTS}{" "}
            attempts to keep the programming word save from Assembly!
          </p>
        </header>

        <section
          aria-live="polite"
          role="status"
          className={clsx(
            "flex flex-col items-center justify-center text-xl p-2 min-h-20 rounded-md text-white text-center w-full max-w-96",
            {
              "!bg-green-500 ": isGameWon,
              "!bg-red-500": isGameLost,
              "!bg-purple-400 border-2 border-purple-700 border-dashed":
                !isGameOver && isLastGuessIncorrect,
            },
          )}
        >
          {isGameOver
            ? (
              isGameWon
                ? (
                  <>
                    <p>You win!</p>
                    <p>Well done! 🥳</p>
                  </>
                )
                : (
                  <>
                    <p>Game Over!</p>
                    <p>You lose! Better start learning Assembly! 😭</p>
                  </>
                )
            )
            : isLastGuessIncorrect && (
              <>
                <p>{getFarewellText(deadLanguage)}</p>
              </>
            )}
        </section>

        <section className="max-w-lg">
          <h2 className="sr-only">Programming Languages</h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {languages.map(({ name, backgroundColor, color }, index) => (
              <li key={name}>
                <Chip
                  name={name}
                  backgroundColor={backgroundColor}
                  color={color}
                  isDead={index < wrongGuessCount}
                />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <Word
            word={currentWord}
            guessedLetters={guessedLetters}
            isGameLost={isGameLost}
          />
        </section>

        <section className="sr-only" aria-live="polite" role="status">
          {lastGuessedLetter && currentWord.includes(lastGuessedLetter)
            ? <p>Correct! The letter ${lastGuessedLetter} is in the word!</p>
            : (
              <>
                <p>
                  Sorry, the letter ${lastGuessedLetter} is not in the word.
                </p>
                <p>
                  You have {MAX_ATTEMPTS - wrongGuessCount} attempts left.
                </p>
              </>
            )}
          <p>
            Current word:
            {currentWord.split("").map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank."
            ).join(" ")}
          </p>
        </section>

        <section>
          <Keyboard
            onKeyPress={addGuessedLetter}
            currentWord={currentWord}
            guessedLetters={guessedLetters}
            isGameOver={isGameOver}
          />
        </section>

        {isGameOver &&
          (
            <button
              className="bg-blue-500 text-white p-2 rounded-md text-center w-full max-w-72 cursor-pointer"
              onClick={() => {
                setCurrentWord(getRandomFrom(words));
                setGuessedLetters([]);
              }}
            >
              New Game
            </button>
          )}
      </div>

      {isGameWon && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}
    </main>
  );
}

export default Hangman;

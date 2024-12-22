import clsx from "clsx";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  currentWord: string;
  guessedLetters: string[];
  isGameOver: boolean;
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export function Keyboard({
  onKeyPress: handleKeyPress,
  currentWord,
  guessedLetters,
  isGameOver,
}: KeyboardProps) {
  return (
    <div className="flex flex-wrap gap-2 max-w-xl justify-center">
      {alphabet.split("").map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && currentWord.includes(letter);
        const isWrong = isGuessed && !currentWord.includes(letter);

        return (
          <button
            key={index}
            onClick={() => handleKeyPress(letter)}
            aria-disabled={guessedLetters.includes(letter) || isGameOver}
            aria-label={`Letter ${letter}`}
            className={clsx(
              "bg-honey grid aspect-square text-lg justify-items-center h-12 text-black p-2 border border-border rounded-md cursor-pointer text-center disabled:opacity-50 disabled:pointer-events-none",
              {
                "bg-red-400": isWrong,
                "!bg-green-400": isCorrect,
              },
            )}
            disabled={isGameOver}
          >
            {letter.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

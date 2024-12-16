import clsx from "clsx";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  currentWord: string;
  guessedLetters: string[];
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export function Keyboard({
  onKeyPress: handleKeyPress,
  currentWord,
  guessedLetters,
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
            className={clsx(
              "bg-honey grid aspect-square text-lg justify-items-center h-12 text-black p-2 border border-border rounded-md text-center",
              {
                "bg-red-400": isWrong,
                "!bg-green-400": isCorrect,
              },
            )}
          >
            {letter.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

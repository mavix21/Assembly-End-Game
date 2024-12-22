import clsx from "clsx";

interface WordProps {
  word: string;
  guessedLetters: string[];
  isGameLost: boolean;
}

export function Word({ word, guessedLetters, isGameLost }: WordProps) {
  return (
    <div className="flex gap-1">
      {word.split("").map((letter, index) => (
        <span
          key={index}
          className={clsx(
            "text-2xl w-12 aspect-square bg-muted border-b border-b-border p-2 text-white grid place-items-center",
            {
              "!text-red-400": isGameLost && !guessedLetters.includes(letter),
            },
          )}
        >
          {isGameLost ||
              guessedLetters.includes(letter)
            ? letter.toUpperCase()
            : ""}
        </span>
      ))}
    </div>
  );
}

interface WordProps {
  word: string;
  guessedLetters: string[];
}

export function Word({ word, guessedLetters }: WordProps) {
  return (
    <div className="flex gap-1">
      {word.split("").map((letter, index) => (
        <span
          key={index}
          className="text-2xl w-12 aspect-square bg-muted border-b border-b-border p-2 text-white grid place-items-center"
        >
          {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
        </span>
      ))}
    </div>
  );
}

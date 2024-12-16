import clsx from "clsx";

interface ChipProps {
  name: string;
  backgroundColor: string;
  color: string;
  isDead: boolean;
}

export function Chip({ name, backgroundColor, color, isDead }: ChipProps) {
  return (
    <div
      className={clsx(
        "bg-background text-foreground p-2 rounded-md text-center relative overflow-clip",
        {
          "before:content-['💀'] before:absolute before:grid before:place-items-center before:h-full before:w-full before:inset-0 before:bg-[rgba(0,0,0,0.7)]":
            isDead,
        },
      )}
      style={{ backgroundColor, color }}
    >
      {name}
    </div>
  );
}

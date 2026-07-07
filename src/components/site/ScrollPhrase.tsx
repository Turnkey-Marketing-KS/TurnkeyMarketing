import { useEffect, useState } from "react";

const TYPE_SPEED = 70;
const DELETE_SPEED = 40;
const HOLD_MS = 1600;
const PAUSE_BETWEEN_MS = 300;

export function ScrollPhrase({
  phrases,
  className = "",
}: {
  phrases: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "pausing">("typing");

  useEffect(() => {
    const current = phrases[index] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 0);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setPhase("typing");
      }, PAUSE_BETWEEN_MS);
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, phrases]);

  return (
    <span className={`inline ${className}`} aria-live="polite">
      {text}
      <span
        aria-hidden
        className="inline-block w-[0.06em] align-baseline ml-[0.05em] animate-pulse"
        style={{
          height: "0.9em",
          background: "currentColor",
          transform: "translateY(0.08em)",
        }}
      />
    </span>
  );
}

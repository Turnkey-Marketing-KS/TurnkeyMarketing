import { useEffect, useRef, useState } from "react";

type Props = {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
};

export function TypewriterHeadline({
  phrases,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseMs = 1400,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) setText(phrases[0]);
  }, [phrases]);

  useEffect(() => {
    if (reducedMotion.current) return;
    const current = phrases[index % phrases.length];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        t = setTimeout(() => setPhase("deleting"), pauseMs);
      }
    } else if (phase === "deleting") {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setIndex((i) => i + 1);
        setPhase("typing");
        return;
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, index, phrases, typingSpeed, deletingSpeed, pauseMs]);

  const longest = phrases.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <span className={`relative inline-block ${className}`} aria-live="polite">
      <span className="invisible whitespace-pre" aria-hidden>
        {longest}
      </span>
      <span
        className="absolute inset-0 whitespace-pre"
        style={{ color: "var(--key-blue)" }}
      >
        {text}
        <span
          className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[0.05em] align-middle"
          style={{
            background: "var(--green)",
            animation: "blink 1s steps(2, start) infinite",
          }}
        />
      </span>
      <style>{`@keyframes blink { to { visibility: hidden; } }`}</style>
    </span>
  );
}

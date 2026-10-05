"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  /** Rang de décalage (1 à 4) : délai de (n-1)×90ms, rotation alternée. */
  n?: number;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  n = 1,
  as: Tag = "div",
  className = "",
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const d = n - 1;
  const style = {
    "--rv-delay": `${d * 0.09}s`,
    "--rv-rot": `${d % 2 ? 2.5 : -2.5}deg`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      style={style}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

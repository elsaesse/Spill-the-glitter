"use client";

import { useRef, type ReactNode } from "react";

type TiltProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Inclinaison 3D qui suit la souris. Désactivée sur écran tactile et avec
 * `prefers-reduced-motion`.
 */
export function Tilt({ className = "", children }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const enabled = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "none";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${className}`}
    >
      {children}
    </div>
  );
}

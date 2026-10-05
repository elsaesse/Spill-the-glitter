"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PAGE_LABELS } from "@/lib/site";

type Phase = "idle" | "in" | "out";

const DURATION = 620;

const transform: Record<Phase, string> = {
  idle: "translateY(100%)",
  in: "translateY(0)",
  out: "translateY(-100%)",
};

/**
 * Rideau rouge qui monte du bas, affiche le nom de la page cible, puis sort par
 * le haut. Intercepte les clics sur les liens internes (next/link compris).
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");

  const phaseRef = useRef<Phase>("idle");
  const waitingFor = useRef<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };
  const go = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  // La nouvelle page est affichée : retour en haut, puis le rideau sort.
  useEffect(() => {
    if (waitingFor.current === null || pathname !== waitingFor.current) return;
    waitingFor.current = null;
    window.scrollTo({ top: 0, behavior: "instant" });
    go("out");
    later(() => go("idle"), DURATION + 80);
  }, [pathname]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as Element | null)?.closest("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download"))
        return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const samePath = url.pathname === window.location.pathname;
      // Ancre sur la page courante, ou changement de ?cat= : comportement natif.
      if (samePath && (url.hash || url.search !== window.location.search)) return;

      if (phaseRef.current !== "idle") {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      if (samePath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (reduced.matches) {
        router.push(url.pathname + url.search);
        return;
      }

      setLabel(PAGE_LABELS[url.pathname] ?? "");
      go("in");
      later(() => {
        waitingFor.current = url.pathname;
        router.push(url.pathname + url.search);
        // Filet de sécurité si la navigation n'aboutit pas.
        later(() => {
          if (waitingFor.current === null) return;
          waitingFor.current = null;
          go("out");
          later(() => go("idle"), DURATION + 80);
        }, 4000);
      }, DURATION);
    };

    // Capture : doit passer avant le onClick de next/link, qui navigue lui-même.
    document.addEventListener("click", onClick, true);
    const pending = timers.current;
    return () => {
      document.removeEventListener("click", onClick, true);
      pending.forEach(clearTimeout);
    };
  }, [router]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-80 flex items-center justify-center bg-red"
      style={{
        transform: transform[phase],
        transition:
          phase === "idle"
            ? "none"
            : `transform ${DURATION}ms cubic-bezier(.7,0,.2,1)`,
      }}
    >
      <span className="font-script text-[clamp(60px,10vw,140px)] text-white [text-shadow:0_0_30px_rgba(255,80,80,.8)]">
        {label}
      </span>
    </div>
  );
}

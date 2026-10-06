"use client";

import { useState, useTransition } from "react";
import type { ActionResult } from "../(app)/actions";

export function DeleteButton({
  id,
  action,
  what,
}: {
  id: string;
  action: (id: string) => Promise<ActionResult>;
  what: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  function close() {
    if (pending) return;
    setError(undefined);
    setOpen(false);
  }

  function confirm() {
    startTransition(async () => {
      const res = await action(id);
      if (res.error) return setError(res.error);
      setOpen(false);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Supprimer ${what}`}
        className="grid size-9 shrink-0 place-items-center rounded-full text-lg text-subtle transition-colors hover:bg-white/10"
      >
        ✕
      </button>

      {open && (
        // <dialog> modale native : focus piégé, Échap et fond géré par le navigateur.
        <dialog
          ref={(el) => {
            if (el && !el.open) el.showModal();
          }}
          aria-labelledby={`delete-title-${id}`}
          onClose={close}
          onCancel={(e) => pending && e.preventDefault()}
          onClick={(e) => e.target === e.currentTarget && close()}
          className="m-auto w-[min(92vw,380px)] rounded-[28px] border border-plum-line bg-plum p-0 text-cream shadow-[0_20px_60px_rgb(0_0_0/0.6)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
        >
          <div className="p-6">
            <h2
              id={`delete-title-${id}`}
              className="text-[22px] leading-snug font-extrabold text-white"
            >
              Supprimer « {what} » ?
            </h2>
            <p className="mt-2 text-[16px] text-muted">
              Cette action est définitive.
            </p>

            {error && (
              <p role="alert" className="mt-3 text-[15px] text-blush">
                {error}
              </p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                autoFocus
                onClick={close}
                disabled={pending}
                className="rounded-2xl border border-plum-line bg-plum-field px-4 py-3.5 text-[16px] font-bold text-cream transition-colors hover:border-rose/60 disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={pending}
                className="rounded-2xl bg-wine px-4 py-3.5 text-[16px] font-extrabold text-white transition-colors hover:bg-wine-hover disabled:opacity-60"
              >
                {pending ? "Suppression…" : "Supprimer"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

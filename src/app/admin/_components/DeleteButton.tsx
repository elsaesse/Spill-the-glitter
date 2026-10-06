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
        className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-lg text-subtle transition-colors hover:bg-red hover:text-white"
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
          className="m-auto w-[min(92vw,400px)] rounded-[28px] border border-line bg-surface p-0 text-cream backdrop:bg-black/75 backdrop:backdrop-blur-sm"
        >
          <div className="p-6">
            <h2
              id={`delete-title-${id}`}
              className="font-display text-[28px] uppercase leading-[1.05]"
            >
              Supprimer « {what} » ?
            </h2>
            <p className="mt-3 text-[16px] text-subtle">
              Cette action est définitive.
            </p>

            {error && (
              <p role="alert" className="mt-3 text-[15px] font-semibold text-red-bright">
                {error}
              </p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                autoFocus
                onClick={close}
                disabled={pending}
                className="cursor-pointer rounded-full border-[1.5px] border-chip px-4 py-3.5 font-display text-[17px] tracking-[.04em] text-cream uppercase transition-colors hover:border-red-bright disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={pending}
                className="cursor-pointer rounded-full bg-red px-4 py-3.5 font-display text-[17px] tracking-[.04em] text-white uppercase transition-colors hover:bg-red-hover disabled:opacity-60"
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

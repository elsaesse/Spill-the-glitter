"use client";

import { useActionState } from "react";
import { login } from "../actions";

const fieldClass =
  "w-full rounded-2xl border-2 border-black bg-black px-5 py-4 text-[17px] text-cream outline-none transition-colors placeholder:text-subtle focus:border-cream";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2 text-[13px] font-extrabold tracking-[.12em] text-black uppercase">
        Email
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-[13px] font-extrabold tracking-[.12em] text-black uppercase">
        Mot de passe
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={fieldClass}
        />
      </label>

      {state?.error && (
        <p role="alert" className="rounded-2xl bg-black/25 px-4 py-3 text-[15px] font-semibold text-cream">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 cursor-pointer rounded-full bg-black px-8 py-5 text-[15px] font-extrabold tracking-[.06em] text-cream uppercase transition-colors hover:text-white disabled:opacity-60"
      >
        {pending ? "Connexion…" : "Se connecter ✦"}
      </button>
    </form>
  );
}

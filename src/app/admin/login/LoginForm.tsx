"use client";

import { useActionState } from "react";
import { login } from "../actions";

const fieldClass =
  "w-full rounded-2xl border border-line bg-surface px-5 py-4 text-cream outline-none transition-colors placeholder:text-subtle focus:border-red-bright";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2 text-sm text-muted">
        Email
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-muted">
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
        <p role="alert" className="text-sm text-blush">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-red px-6 py-4 font-semibold text-white transition-colors hover:bg-red-hover disabled:opacity-60"
      >
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}

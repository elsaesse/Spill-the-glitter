import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-8 px-page py-16">
      <div>
        <p className="font-script text-4xl text-red-bright">Spill the Glitter</p>
        <h1 className="mt-2 font-display text-5xl uppercase">Ma caisse</h1>
      </div>
      <LoginForm />
    </section>
  );
}

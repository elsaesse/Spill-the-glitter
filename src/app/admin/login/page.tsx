import Image from "next/image";
import { LoginForm } from "./LoginForm";
import logo from "@/assets/logo-charm.webp";
import { SITE_NAME } from "@/lib/site";

export default function LoginPage() {
  return (
    <div className="min-h-dvh bg-red">
      <section className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-9 px-page py-16">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt=""
              width={48}
              height={48}
              priority
              className="size-12 rounded-full"
            />
            <p className="font-script text-[32px] leading-none text-cream">
              {SITE_NAME}
            </p>
          </div>
          <h1 className="mt-6 font-display text-[clamp(84px,26vw,128px)] leading-[.84] tracking-[-.01em] text-black uppercase">
            Ma
            <br />
            <span className="text-cream">caisse</span>
          </h1>
        </div>
        <LoginForm />
      </section>
    </div>
  );
}

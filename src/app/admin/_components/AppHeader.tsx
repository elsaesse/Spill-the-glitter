import Image from "next/image";
import { logout } from "../actions";
import logo from "@/assets/logo-charm.webp";
import { formatEuros } from "@/lib/caisse/format";
import { SITE_NAME } from "@/lib/site";

export function AppHeader({
  date,
  todayCents,
  todayCount,
}: {
  date: string;
  todayCents: number;
  todayCount: number;
}) {
  return (
    <header className="rounded-b-[36px] bg-red px-5 pt-5 pb-7">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Image
            src={logo}
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full"
          />
          <span className="font-script text-[26px] leading-none text-cream">
            {SITE_NAME}
          </span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="cursor-pointer rounded-full border-2 border-black px-4 py-2 text-[12px] font-extrabold tracking-[.06em] text-black uppercase transition-colors hover:bg-black hover:text-cream"
          >
            Quitter
          </button>
        </form>
      </div>

      <h1 className="mt-7 font-display text-[clamp(72px,22vw,128px)] leading-[.84] tracking-[-.01em] text-black uppercase">
        Ma caisse
      </h1>
      <p className="mt-2 font-semibold text-cream">{date}</p>

      <div className="mt-5 flex items-end justify-between gap-4 rounded-[28px] bg-black px-6 py-5">
        <div>
          <p className="text-[12px] font-extrabold tracking-[.12em] text-subtle uppercase">
            {"Encaissé aujourd'hui"}
          </p>
          <p className="mt-1 text-[14px] text-muted">
            {todayCount} prestation{todayCount > 1 ? "s" : ""}
          </p>
        </div>
        <p className="font-display text-[clamp(40px,11vw,56px)] leading-[.9] whitespace-nowrap text-cream">
          {formatEuros(todayCents)}
        </p>
      </div>
    </header>
  );
}

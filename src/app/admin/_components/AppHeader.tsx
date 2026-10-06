import { logout } from "../actions";
import { formatEuros } from "@/lib/caisse/format";

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
    <header className="zebra relative rounded-b-[36px] px-5 pt-6 pb-6 shadow-[0_10px_40px_rgb(0_0_0/0.4)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[28px] leading-tight font-extrabold whitespace-nowrap text-white sm:text-[34px]">
            Ma caisse <span aria-hidden>🦓</span>
          </h1>
          <p className="mt-1 text-base whitespace-nowrap text-white/90 sm:text-lg">{date}</p>
          <form action={logout} className="mt-3">
            <button
              type="submit"
              className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              Se déconnecter
            </button>
          </form>
        </div>

        <div className="shrink-0 rounded-3xl border border-white/25 bg-white/15 px-3.5 py-3 text-right text-white shadow-lg sm:px-5 sm:py-4 backdrop-blur-md">
          <p className="text-xs whitespace-nowrap sm:text-sm">{"Encaissé aujourd'hui"}</p>
          <p className="text-[26px] leading-tight font-extrabold whitespace-nowrap sm:text-[34px]">
            {formatEuros(todayCents)}
          </p>
          <p className="text-xs sm:text-sm">
            {todayCount} prestation{todayCount > 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </header>
  );
}

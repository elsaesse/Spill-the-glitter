import { PLANITY_URL } from "@/lib/site";

export function BookSticker() {
  return (
    <a
      href={PLANITY_URL}
      target="_blank"
      rel="noopener"
      aria-label="Book your nails sur Planity"
      className="relative block size-full"
    >
      <svg
        viewBox="0 0 150 150"
        aria-hidden="true"
        className="animate-stg-spin size-full"
      >
        <defs>
          <path
            id="stg-sticker-circle"
            d="M75,75 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0"
          />
        </defs>
        <circle cx="75" cy="75" r="74" fill="#0E0A0B" />
        <text
          fill="#F6EEE6"
          style={{
            fontFamily: "var(--font-anton), sans-serif",
            fontSize: 15,
            letterSpacing: 3.2,
          }}
        >
          <textPath href="#stg-sticker-circle">
            BOOK YOUR NAILS ✦ BOOK YOUR NAILS ✦
          </textPath>
        </text>
      </svg>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center text-[34px] text-red-bright"
      >
        ✦
      </span>
    </a>
  );
}

import { COUNTRIES } from '@/lib/countries';
import FlagImg from '@/components/FlagImg';

const ITEMS = [...COUNTRIES, ...COUNTRIES, ...COUNTRIES];

export default function CountryMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-4 bg-ink-900/40 border-y border-gold-500/15">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-ink-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-ink-950 to-transparent z-10" />

      <div className="country-marquee flex w-max items-center gap-6 sm:gap-8 whitespace-nowrap will-change-transform">
        {ITEMS.map((c, i) => (
          <span
            key={`${c.code}-${i}`}
            className="inline-flex items-center gap-2.5 text-sm text-ink-200 flex-shrink-0"
          >
            <FlagImg code={c.code} name={c.name} size={22} />
            <span className="font-medium">{c.name}</span>
            <span className="text-gold-500/40 ml-3">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

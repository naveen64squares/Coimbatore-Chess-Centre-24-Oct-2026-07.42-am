import { CalendarDays, Globe2, Star, Trophy } from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';
import FlagImg from '@/components/FlagImg';

const featuredCodes = ['IN', 'US', 'GB', 'AE', 'SG', 'MY', 'AU', 'CA'];

const trustStats = [
  { icon: Star, value: '★ 4.8 / 5.0', label: 'Google Rating · 117+ Parent Reviews' },
  { icon: Trophy, value: '2,000+', label: 'Students Trained Successfully' },
  { icon: Globe2, value: 'Global', label: 'Online Training Worldwide' },
  { icon: CalendarDays, value: '10+', label: 'Years of Excellence Since 2016' },
];

export default function TrustBar() {
  return (
    <section aria-label="Academy trust statistics" className="relative z-10 border-y border-gold-500/20 bg-ink-900 shadow-card">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="grid grid-cols-2 gap-y-5 md:grid-cols-4 md:divide-x md:divide-gold-500/15">
          {trustStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-center gap-3 px-4 text-center md:first:pl-0 md:last:pr-0">
              <stat.icon className="h-5 w-5 flex-shrink-0 text-gold-600" aria-hidden="true" />
              <div>
                <div className="font-display text-lg font-semibold leading-tight text-gold-700">{stat.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-ink-300">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-gold-500/10 pt-4">
          {featuredCodes.map((code) => {
            const country = COUNTRIES.find((item) => item.code === code);
            return (
              <span key={code} title={country?.name ?? code} className="inline-flex items-center gap-2 text-xs text-ink-300">
                <FlagImg code={code} name={country?.name} size={20} />
                <span className="hidden sm:inline">{country?.name ?? code}</span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

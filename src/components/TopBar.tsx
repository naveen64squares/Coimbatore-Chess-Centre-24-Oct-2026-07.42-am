import { useEffect, useRef, useState } from 'react';
import { Globe, ChevronDown, Check, DollarSign } from 'lucide-react';
import { useSettings, type Currency, type TimeZone } from '@/lib/settings';

const TIMEZONES: { id: TimeZone; label: string; flag: string }[] = [
  { id: 'IST', label: 'India (IST)', flag: 'IN' },
  { id: 'US', label: 'United States (EST)', flag: 'US' },
  { id: 'UK', label: 'United Kingdom (GMT)', flag: 'GB' },
  { id: 'UAE', label: 'UAE (GST)', flag: 'AE' },
  { id: 'SG', label: 'Singapore (SGT)', flag: 'SG' },
  { id: 'MY', label: 'Malaysia (MYT)', flag: 'MY' },
  { id: 'AU', label: 'Australia (AEST)', flag: 'AU' },
];

function FlagBadge({ code }: { code: string }) {
  return (
    <span className="inline-grid place-items-center w-5 h-3.5 rounded-[2px] overflow-hidden bg-ink-700 text-[8px] font-bold text-ink-200 tracking-wider">
      {code}
    </span>
  );
}

export default function TopBar() {
  const { timeZone, setTimeZone, currency, setCurrency, tzLabel } = useSettings();
  const [tzOpen, setTzOpen] = useState(false);
  const tzRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (tzRef.current && !tzRef.current.contains(e.target as Node)) setTzOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const currentTz = TIMEZONES.find((t) => t.id === timeZone) ?? TIMEZONES[0];

  return (
    <div className="sticky top-0 z-[60] bg-ink-950 border-b border-gold-500/20 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-10 flex items-center justify-between gap-3 text-xs">
        {/* Left: timezone */}
        <div className="relative" ref={tzRef}>
          <button
            onClick={() => setTzOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-ink-200 hover:text-gold-700 hover:bg-gold-500/10 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-gold-600" />
            <FlagBadge code={currentTz.flag} />
            <span className="hidden sm:inline">{currentTz.label}</span>
            <span className="sm:hidden">{tzLabel}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${tzOpen ? 'rotate-180' : ''}`} />
          </button>
          {tzOpen && (
            <div className="absolute left-0 top-full mt-1 w-56 rounded-xl bg-ink-900 border border-gold-500/20 shadow-card py-1.5 animate-fade-in">
              {TIMEZONES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTimeZone(t.id); setTzOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-gold-500/10 transition-colors ${timeZone === t.id ? 'text-gold-700' : 'text-ink-200'}`}
                >
                  <FlagBadge code={t.flag} />
                  <span className="flex-1">{t.label}</span>
                  {timeZone === t.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: currency toggle */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-ink-400">Currency:</span>
          <div className="inline-flex rounded-full bg-ink-800 border border-ink-700/60 p-0.5">
            {(['INR', 'USD'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  currency === c
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white'
                    : 'text-ink-300 hover:text-gold-700'
                }`}
              >
                {c === 'INR' ? <span>₹ INR</span> : <><DollarSign className="w-3 h-3" />USD</>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

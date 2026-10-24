import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type Currency = 'INR' | 'USD';
export type TimeZone = 'IST' | 'US' | 'UK' | 'UAE' | 'SG' | 'MY' | 'AU';

type SettingsContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  timeZone: TimeZone;
  setTimeZone: (t: TimeZone) => void;
  /** Convert an INR amount to the active currency and format it. */
  formatPrice: (inr: number) => string;
  /** Convert a "HH:MM AM/PM IST" time string to the active timezone and format it. */
  convertTime: (istTime: string) => string;
  /** Abbreviated timezone label, e.g. "IST", "EST". */
  tzLabel: string;
  /** Full timezone name for display. */
  tzFullName: string;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

// Approximate USD conversion rate (private 1-on-1 is a fixed $75 for Rs. 6,400)
const USD_RATE = 75 / 6400; // ≈ 0.01172

// Offset in hours from IST for each supported zone (IST = UTC+5:30)
const TZ_OFFSETS: Record<TimeZone, number> = {
  IST: 0,
  US: -10.5, // US Eastern (UTC-5) vs IST (UTC+5:30)
  UK: -5.5, // UK (UTC+0) vs IST
  UAE: -1.5, // UAE (UTC+4) vs IST
  SG: -2.5, // Singapore (UTC+8) vs IST
  MY: -2.5, // Malaysia (UTC+8) vs IST
  AU: -4.5, // Australia AEST (UTC+10) vs IST
};

const TZ_LABELS: Record<TimeZone, string> = {
  IST: 'IST',
  US: 'EST',
  UK: 'GMT',
  UAE: 'GST',
  SG: 'SGT',
  MY: 'MYT',
  AU: 'AEST',
};

const TZ_FULL_NAMES: Record<TimeZone, string> = {
  IST: 'India (IST)',
  US: 'United States (EST)',
  UK: 'United Kingdom (GMT)',
  UAE: 'UAE (GST)',
  SG: 'Singapore (SGT)',
  MY: 'Malaysia (MYT)',
  AU: 'Australia (AEST)',
};

// Map a detected IANA timezone to one of our supported zones
function detectTimeZone(): TimeZone {
  try {
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!local) return 'IST';
    const map: Record<string, TimeZone> = {
      'Asia/Calcutta': 'IST',
      'Asia/Kolkata': 'IST',
      'America/New_York': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'America/Los_Angeles': 'US',
      'America/Detroit': 'US',
      'America/Toronto': 'US',
      'Europe/London': 'UK',
      'Europe/Dublin': 'UK',
      'Asia/Dubai': 'UAE',
      'Asia/Singapore': 'SG',
      'Asia/Kuala_Lumpur': 'MY',
      'Australia/Sydney': 'AU',
      'Australia/Melbourne': 'AU',
      'Australia/Brisbane': 'AU',
    };
    return map[local] ?? 'IST';
  } catch {
    return 'IST';
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('ccc_currency');
    return saved === 'USD' ? 'USD' : 'INR';
  });
  const [timeZone, setTimeZone] = useState<TimeZone>(() => {
    const saved = localStorage.getItem('ccc_timezone') as TimeZone | null;
    return saved ?? detectTimeZone();
  });

  useEffect(() => {
    localStorage.setItem('ccc_currency', currency);
  }, [currency]);
  useEffect(() => {
    localStorage.setItem('ccc_timezone', timeZone);
  }, [timeZone]);

  function formatPrice(inr: number): string {
    if (currency === 'USD') {
      const usd = inr * USD_RATE;
      return `$${usd.toFixed(2)}`;
    }
    return `Rs. ${inr.toLocaleString('en-IN')}`;
  }

  function convertTime(istTime: string): string {
    // Extract "HH:MM AM/PM" from strings like "05:30 PM – 07:00 PM IST"
    const matches = istTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/gi);
    if (!matches || matches.length === 0) return istTime;
    const converted = matches.map((m) => {
      const [, hStr, mStr, ampm] = m.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)!;
      let h = parseInt(hStr, 10);
      const mins = parseInt(mStr, 10);
      const isPM = ampm.toUpperCase() === 'PM';
      if (isPM && h !== 12) h += 12;
      if (!isPM && h === 12) h = 0;
      const totalMin = h * 60 + mins + TZ_OFFSETS[timeZone] * 60;
      const norm = ((totalMin % 1440) + 1440) % 1440;
      const nh = Math.floor(norm / 60);
      const nm = norm % 60;
      const nAmpm = nh >= 12 ? 'PM' : 'AM';
      const dh = nh % 12 === 0 ? 12 : nh % 12;
      return `${dh.toString().padStart(1, '0')}:${nm.toString().padStart(2, '0')} ${nAmpm}`;
    });
    // Replace the matched times in the original string
    let result = istTime;
    let idx = 0;
    result = result.replace(/\d{1,2}:\d{2}\s*(AM|PM)/gi, () => converted[idx++] || '');
    // Replace IST label with active zone label
    result = result.replace(/\bIST\b/g, TZ_LABELS[timeZone]);
    return result;
  }

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      timeZone,
      setTimeZone,
      formatPrice,
      convertTime,
      tzLabel: TZ_LABELS[timeZone],
      tzFullName: TZ_FULL_NAMES[timeZone],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currency, timeZone]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

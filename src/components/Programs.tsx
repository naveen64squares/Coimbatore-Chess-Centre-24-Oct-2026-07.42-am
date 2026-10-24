import { MapPin, Clock, Globe, Users, Crown, Video, Wifi } from 'lucide-react';
import { useSettings } from '@/lib/settings';
import { whatsappBookingUrl } from '@/lib/whatsapp';

const formats = [
  {
    id: 'offline',
    icon: MapPin,
    name: 'Offline Classes',
    location: 'Coimbatore Centre',
    priceInr: 1600,
    period: '/ month',
    scheduleIst: 'Strictly Mon–Sat · 05:30 PM – 07:00 PM (In-Person)',
    detail: 'Weekly 3 classes · Strictly group format',
    language: 'English & Tamil',
    badge: null,
    features: [
      'In-person coaching at our Coimbatore centre',
      'Group classes, weekly thrice',
      'Strictly Mon–Sat, 05:30 PM to 07:00 PM IST (In-Person only)',
      'Hands-on board practice',
      'Tournament-style simulation',
    ],
    highlight: false,
  },
  {
    id: 'online-group-8',
    icon: Video,
    name: 'Online Group — 8 Students',
    location: 'Live Online',
    priceInr: 1500,
    period: '/ month',
    scheduleIst: '05:00 PM – 07:30 PM',
    detail: 'Group of 8 students per batch',
    language: 'Tamil Only',
    badge: null,
    features: [
      'Live online group coaching',
      'Batch of 8 students',
      'Class timing: 05:00 PM to 07:30 PM IST',
      'Customised to local student timezones (US, UK, UAE, SG, IST)',
      'Language: Tamil only',
      'Customised to student timezones (US, UK, UAE, SG, IST)',
    ],
    highlight: false,
  },
  {
    id: 'online-group-4',
    icon: Users,
    name: 'Online Group — 4 Students',
    location: 'Live Online',
    priceInr: 3500,
    period: '/ 8 classes',
    scheduleIst: 'Flexible slots · 04:30 AM – 11:00 PM (any 1 hour)',
    detail: 'Matched by playing strength',
    language: 'English & Tamil',
    badge: 'Most Popular',
    features: [
      'Small group of 4 — matched by strength',
      '8 classes per package',
      'Flexible slots: 04:30 AM to 11:00 PM IST (any 1 hour, all 7 days)',
      'Customised to local student timezones (US, UK, UAE, SG, IST)',
      'Language: English or Tamil (your choice)',
      'Personalised attention in a small cohort',
    ],
    highlight: true,
  },
  {
    id: 'online-private',
    icon: Crown,
    name: 'Online Private (1-on-1)',
    location: 'Live Online',
    priceInr: 6400,
    period: '/ 8 classes',
    scheduleIst: 'Flexible slots · 04:30 AM – 11:00 PM (any 1 hour)',
    detail: 'Fully personalised coaching',
    language: 'English & Tamil',
    badge: 'Premium',
    features: [
      'One-on-one private coaching',
      '8 classes per package (or USD $75.00)',
      'Flexible slots: 04:30 AM to 11:00 PM IST (any 1 hour, all 7 days)',
      'Customised to local student timezones (US, UK, UAE, SG, IST)',
      'Language: English or Tamil (your choice)',
      'Customised curriculum & game analysis',
    ],
    highlight: false,
  },
];

export default function Programs() {
  const { formatPrice, convertTime, tzLabel } = useSettings();

  return (
    <section id="programs" className="relative py-28 bg-gradient-to-b from-ink-950 to-ink-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-600">Class Formats & Pricing</span>
          <h2 className="mt-4 font-display text-4xl lg:text-5xl font-semibold text-ink-50 text-balance">
            Transparent pricing, flexible formats
          </h2>
          <p className="mt-4 text-ink-300">
            Choose the format that fits you — offline at our Coimbatore centre, or online from anywhere.
            Times shown in your selected timezone ({tzLabel}); toggle currency using the switch at the top.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {formats.map((f, i) => {
            const schedule = `${convertTime(f.scheduleIst)} ${tzLabel}`;
            return (
              <div
                key={f.id}
                className={`reveal group relative rounded-2xl p-7 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                  f.highlight
                    ? 'bg-gradient-to-b from-gold-500/15 to-ink-900 border-2 border-gold-500/50 shadow-glow-gold'
                    : 'bg-ink-900/60 border border-ink-700/60 hover:border-gold-500/30 hover:shadow-card'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {f.badge && (
                  <span className={`absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    f.highlight ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white' : 'bg-ink-800 text-gold-700 border border-gold-500/30'
                  }`}>
                    {f.badge}
                  </span>
                )}
                <div className="flex items-start justify-between">
                  <span className={`grid place-items-center w-12 h-12 rounded-xl ${f.highlight ? 'bg-gold-400 text-white' : 'bg-gold-500/15 text-gold-600 border border-gold-500/25'}`}>
                    <f.icon className="w-6 h-6" />
                  </span>
                  <div className="text-right">
                    <div className="font-display text-3xl font-semibold gold-gradient-text">
                      {formatPrice(f.priceInr)}
                    </div>
                    <div className="text-xs text-ink-400">{f.period}</div>
                  </div>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-ink-50">{f.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-300">{f.location}</p>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-ink-200">
                    <Clock className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                    <span>{schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink-200">
                    <Globe className="w-4 h-4 text-gold-600 flex-shrink-0" /> {f.language}
                  </div>
                  <div className="flex items-center gap-2 text-ink-300">
                    {f.id === 'offline' ? <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0" /> : <Wifi className="w-4 h-4 text-gold-600 flex-shrink-0" />}
                    {f.detail}
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 flex-1 border-t border-ink-700/40 pt-5">
                  {f.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-ink-200">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.highlight ? 'bg-gold-500' : 'bg-gold-500/60'}`} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappBookingUrl(`Pricing card — ${f.name}`, f.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    f.highlight
                      ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white hover:scale-[1.03]'
                      : 'border border-gold-500/40 text-gold-700 hover:bg-gold-500/10'
                  }`}
                >
                  Book on WhatsApp
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

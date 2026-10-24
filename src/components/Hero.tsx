import { ChevronDown, Trophy, Users, Globe } from 'lucide-react';
import CountryMarquee from '@/components/CountryMarquee';
import { whatsappBookingUrl } from '@/lib/whatsapp';

const stats = [
  { icon: Users, value: '2,000+', label: 'Students Trained' },
  { icon: Trophy, value: '10', label: 'FIDE-Rated Coaches' },
  { icon: Globe, value: 'Global', label: 'Online Reach' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/35300539/pexels-photo-35300539.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
          alt="Chess board with dramatic lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#172554] via-[#172554]/85 to-[#172554]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172554] via-transparent to-[#172554]/50" />
      </div>

      {/* Decorative board pattern */}
      <div className="absolute inset-0 board-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 w-full">
        <div className="max-w-3xl">
          {/* Pulsing live status badge */}
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/40 text-red-300 text-xs sm:text-sm font-medium animate-fade-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="flex items-center gap-1.5">
              Live Classes Open for Global &amp; Local Batches (IST, US, UK, UAE, SG Timezones)
            </span>
          </span>

          {/* Running flag marquee of our global presence */}
          <div className="mt-5 text-center animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#a8a394] mb-1">Our Global Presence</p>
          </div>
          <div className="mt-2 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <CountryMarquee />
          </div>

          <h1
            className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-balance text-[#f4f1e8] animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Turn Your Child&apos;s Passion Into{' '}
            <span className="gold-gradient-text">Checkmate</span>: Expert FIDE-Titled Coaching with a Global Reach.
          </h1>

          <p
            className="mt-6 text-base sm:text-lg text-[#d8d4c8] max-w-2xl leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.25s' }}
          >
            Join over 2,000+ students worldwide. From absolute beginners to
            FIDE-rated tournament champions — international student outreach and
            online training across continents. Book a Free 1-on-1 Skill Evaluation
            today.
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <a
              href={whatsappBookingUrl('Hero free evaluation CTA')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold hover:shadow-glow-gold hover:scale-[1.03] transition-all duration-300"
            >
              Book Free Evaluation
            </a>
            <a
              href="#programs"
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-[#5c5849]/60 text-[#d8d4c8] font-medium hover:border-gold-400/60 hover:text-gold-300 transition-all duration-300"
            >
              View Pricing
            </a>
          </div>

          <div
            className="mt-14 grid grid-cols-3 gap-4 max-w-lg animate-fade-up"
            style={{ animationDelay: '0.55s' }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-[#172554]/80 backdrop-blur-sm border border-blue-300/20 px-4 py-5 text-center shadow-card"
              >
                <s.icon className="w-6 h-6 mx-auto text-gold-400" />
                <div className="mt-2 font-display text-2xl font-semibold text-[#f4f1e8]">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-[#a8a394]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#a8a394] hover:text-gold-400 transition-colors animate-fade-in"
        style={{ animationDelay: '1s' }}
        aria-label="Scroll down"
      >
        <ChevronDown className="w-7 h-7 animate-bounce" />
      </a>
    </section>
  );
}

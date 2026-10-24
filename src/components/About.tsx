import { Target, Eye, Heart } from 'lucide-react';

const pillars = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To make chess accessible, engaging, and transformative for every student in Coimbatore — building not just players, but thinkers who carry strategic clarity into every arena of life.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: "To be South India's most respected chess academy, producing state and national champions while keeping the joy of learning alive at every level.",
  },
  {
    icon: Heart,
    title: 'Our Values',
    text: 'Patience over haste. Curiosity over complacency. Sportsmanship over scorelines. We celebrate every well-played move as much as every won game.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 bg-ink-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-600">
              About the Centre
            </span>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl font-semibold leading-tight text-ink-50 text-balance">
              A home for chess, built on{' '}
              <span className="gold-gradient-text">FIDE-certified coaching</span>.
            </h2>
            <p className="mt-6 text-ink-200 leading-relaxed">
              Founded in 2016 by Dhanasekar K — a FIDE Instructor with a peak
              rating of 2069 and 24 years of playing and teaching experience —
              the Coimbatore Chess Centre is affiliated to the Coimbatore
              District Chess Association. Our team of international-rated
              coaches has trained over 2,000 students across the city and online.
            </p>
            <p className="mt-4 text-ink-300 leading-relaxed">
              From offline group classes at our Coimbatore centre to online
              batches reaching students worldwide, we offer a format for every
              player — beginners to tournament competitors. Our coaches include a
              Candidate Master, FIDE Instructors, and International Arbiters.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { k: '2016', v: 'Founded' },
                { k: '2069', v: 'Founder peak rating' },
                { k: '10', v: 'Rated coaches' },
              ].map((item) => (
                <div
                  key={item.v}
                  className="rounded-xl border border-gold-500/20 bg-ink-900/60 px-4 py-4 shadow-soft"
                >
                  <div className="font-display text-2xl font-semibold text-gold-700">
                    {item.k}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-ink-300">
                    {item.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal grid gap-5">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="group relative rounded-2xl border border-ink-700/60 bg-ink-900/50 p-7 hover:border-gold-500/40 hover:bg-ink-900/80 hover:shadow-card transition-all duration-400"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-5">
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/15 to-gold-600/10 border border-gold-500/30 text-gold-600 group-hover:scale-110 transition-transform duration-300">
                    <p.icon className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink-50">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-300 leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import FlagImg from '@/components/FlagImg';

const LOGO_URL = '/Original_on_transparent_-_Copy.png';

export default function Footer() {
  return (
    <footer className="relative bg-ink-900 border-t border-gold-500/20 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2.5 group" aria-label="Coimbatore Chess Centre home">
              <span className="grid place-items-center w-20 h-16 overflow-hidden transition-transform group-hover:scale-105 flex-shrink-0">
                <img
                  src={LOGO_URL}
                  alt="Coimbatore Chess Centre logo"
                  className="w-full h-full object-contain"
                />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-xl font-semibold text-ink-50">Coimbatore</span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-gold-600">Chess Centre</span>
              </span>
            </a>
            <p className="mt-5 text-sm text-ink-300 max-w-md leading-relaxed">
              Nurturing strategic minds in Coimbatore since 2016. Founded by
              FIDE Instructor Dhanasekar K and affiliated to the Coimbatore
              District Chess Association — from first moves to tournament
              triumphs, we&apos;re here for every player&apos;s journey across the 64
              squares.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm text-ink-300">
                Reaching students <strong className="text-gold-700">worldwide</strong> with online training
              </span>
              <div className="flex items-center gap-1.5" aria-label="Global student community">
                {['IN', 'US', 'GB', 'AE', 'SG', 'MY', 'AU', 'CA'].map((code) => (
                  <FlagImg key={code} code={code} size={20} />
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Instagram, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid place-items-center w-10 h-10 rounded-full border border-ink-700/60 text-ink-300 hover:border-gold-500/40 hover:text-gold-700 hover:bg-gold-500/10 transition-all duration-300"
                  aria-label="Social link"
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-600 font-semibold">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ['About', '#about'],
                ['Pricing', '#programs'],
                ['Our Team', '#coaches'],
                ['Gallery', '#gallery'],
                ['Book Trial', '#contact'],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="text-ink-300 hover:text-gold-700 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-600 font-semibold">
              Visit Us
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-300">
              <li>Coimbatore, Tamil Nadu, India</li>
              <li className="pt-2">
                <a href="https://wa.me/919944898753" target="_blank" rel="noopener noreferrer" className="hover:text-gold-700 transition-colors">
                  +91 99448 98753
                </a>
              </li>
              <li>
                <a href="mailto:coimbatorechesscentre@gmail.com" className="hover:text-gold-700 transition-colors">
                  coimbatorechesscentre@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink-700/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} Coimbatore Chess Centre. All rights reserved.
          </p>
          <p className="text-xs text-ink-400">
            Crafted with patience, like a good endgame.
          </p>
        </div>
      </div>
    </footer>
  );
}

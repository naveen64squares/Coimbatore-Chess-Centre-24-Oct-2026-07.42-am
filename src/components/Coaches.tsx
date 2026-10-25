import { Award, Phone, UserRound } from 'lucide-react';
import { whatsappBookingUrl } from '@/lib/whatsapp';

const coaches = [
  {
    name: 'Dhanasekar K',
    role: 'Founder & Head Coach',
    rating: 'Peak FIDE 2069',
    title: 'FIDE Instructor',
    bio: 'International rated player with 24 years of playing and teaching experience. Holds the FIDE Instructor title awarded by the World Chess Federation. Received an award from the Coimbatore District Chess Association for outstanding performance in training kids.',
    img: '/images/team/WhatsApp_Image_2026-10-25_at_10.58.53.jpeg',
    badge: 'Founder',
  },
  {
    name: 'CM Gireman Ja',
    role: 'Coach',
    rating: 'Peak FIDE 2293',
    title: 'Candidate Master',
    bio: 'International rated player with a peak rating of 2293. Part of the Indian team that won the Gold medal at the World Youth Chess Championship in China (2013). Finished 4th in the Under-8 Asian Youth Chess Championship in New Delhi (2005). 19 years of teaching and playing experience.',
    img: 'https://static.wixstatic.com/media/9deedb_087dd0ff6d8943dcbf415b9ddd9b9400~mv2.jpg/v1/crop/x_190,y_0,w_573,h_810/fill/w_400,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202023-05-16%20at%2019_edited_j.jpg',
    badge: null,
    available: false,
    fullPhoto: true,
  },
  {
    name: 'Narendran',
    role: 'Coach',
    rating: 'Peak FIDE 1804',
    title: 'International Rated Player',
    bio: 'International rated player with a peak rating of 1804. University Champion. Won many trophies in FIDE Rated and National level events. 7 years of teaching and playing experience.',
    img: '/images/team/Naren.jpeg',
    badge: null,
  },
  {
    name: 'Shankar Ramakrishnan',
    role: 'Coach',
    rating: 'Peak FIDE 1727',
    title: 'International Rated Player',
    bio: 'International rated player with a peak rating of 1727. Represented Coimbatore district in the Tamil Nadu state championship. Won many trophies in state and district level events. 5 years of teaching and playing experience.',
    img: 'https://static.wixstatic.com/media/9deedb_54edb97764454347b712b57d6c164a4b~mv2.jpg/v1/crop/x_510,y_0,w_1230,h_1832/fill/w_400,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202024-03-03%20at%2016_24_edited.jpg',
    badge: null,
    available: false,
    fullPhoto: true,
  },
  {
    name: 'John Christopher',
    role: 'Coach',
    rating: 'Peak FIDE 1680',
    title: 'State Arbiter',
    bio: 'International rated player with a peak rating of 1680. University Champion, State Arbiter, Runner-up in the International FIDE Rated event in 2017. 11 years of teaching and playing experience.',
    img: '/images/team/Gemini_Generated_Image_g4nsw2g4nsw2g4ns.png',
    badge: null,
  },
  {
    name: 'Soundarya',
    role: 'Coach',
    rating: 'Peak FIDE 1680',
    title: 'State Arbiter',
    bio: 'International rated player with a peak rating of 1680. University Champion, State Arbiter, Winner in the International FIDE Rated event in her respective category. 10 years of teaching and playing experience.',
    img: 'https://static.wixstatic.com/media/9deedb_c2e6f698b4904d02b880b050ad660410~mv2.jpg/v1/crop/x_180,y_0,w_1129,h_1682/fill/w_400,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/DSCN1784_edited_edited.jpg',
    badge: null,
  },
  {
    name: 'Naveenkumar',
    role: 'Coach',
    rating: 'Peak FIDE 1637',
    title: 'International Arbiter',
    bio: 'International rated player with a peak rating of 1637. International Arbiter. Represented Coimbatore district in Tamil Nadu state championships. Runner-up in the International FIDE Rated below 1600 event in 2017. 13 years of teaching and playing experience.',
    img: 'https://static.wixstatic.com/media/9deedb_651cbeae72a340d2ba832b1e1fcced92~mv2.jpg/v1/crop/x_415,y_0,w_674,h_1004/fill/w_400,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Naveenkumar.jpg',
    badge: null,
  },
  {
    name: 'Praveen',
    role: 'Coach',
    rating: 'Peak FIDE 1532',
    title: 'National Arbiter',
    bio: 'International rated player with a peak rating of 1532. National Arbiter, University Champion. Represented Coimbatore district in the Tamil Nadu state championship. Won many trophies in state and district level events. 5 years of teaching and playing experience.',
    img: 'https://static.wixstatic.com/media/9deedb_c8b327f0b38f41bf853b814561616bb6~mv2.jpg/v1/crop/x_119,y_0,w_530,h_790/fill/w_400,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-12-01%20at%2008_54_edited.jpg',
    badge: null,
    fullPhoto: true,
  },
  {
    name: 'Coach Abi',
    role: 'FIDE-Rated Coach',
    rating: 'Peak FIDE 1823',
    title: 'Competitive Player & Coach',
    bio: 'Active competitive player with over a decade of experience and a mastery of positional play. Secured 5th place in the main category of the KCM Open FIDE Tournament. Served as Team Captain in the Indian Collegiate Chess Championship, earning a perfect score and South Zone qualification. Competes in state and collegiate events while developing young players.',
    img: '/images/team/Abi.jpeg',
    badge: null,
    ctaLabel: 'Book Trial with Coach',
  },
  {
    name: 'Coach Santhosh',
    role: 'FIDE-Rated Coach',
    rating: 'Peak FIDE 1765',
    title: 'Tournament Preparation Specialist',
    bio: 'Winner of the Bharathiar University Chess Championship and 1st place in a Rapid International Rated Tournament under the 1500–1600 category. Multiple-time district and state championship winner and medalist, with strong performances across FIDE-rated open, state, and national-level events.',
    img: '/images/team/Santhosh.jpeg',
    badge: null,
    ctaLabel: 'Book Trial with Coach',
  },
];

export default function Coaches() {
  function bookCoach(name: string) {
    window.open(whatsappBookingUrl('Team coach trial', `Coach ${name}`), '_blank');
  }

  return (
    <section id="coaches" className="relative py-28 bg-ink-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-600">Our Team</span>
          <h2 className="mt-4 font-display text-4xl lg:text-5xl font-semibold text-ink-50 text-balance">
            The faces behind the centre
          </h2>
          <p className="mt-4 text-ink-300">
            Our coaches are international-rated players with decades of combined
            tournament and teaching experience. Affiliated with the Coimbatore
            District Chess Association.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coaches.map((c, i) => (
            <article
              key={c.name}
              className="reveal group rounded-2xl overflow-hidden bg-ink-950 border border-ink-700/60 hover:border-gold-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-card flex flex-col"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                {c.img ? (
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    className={`w-full h-full ${c.fullPhoto ? 'object-contain bg-ink-900' : 'object-cover object-[center_20%]'} group-hover:scale-105 transition-transform duration-700`}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 text-gold-700">
                    <UserRound className="h-16 w-16 opacity-80" strokeWidth={1.25} />
                    <span className="mt-3 text-[10px] uppercase tracking-[0.25em] text-ink-300">Photo coming soon</span>
                  </div>
                )}
                {c.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gold-500/90 text-white text-[10px] font-bold uppercase tracking-wider">
                    {c.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-ink-950/90 backdrop-blur-sm border border-gold-500/30 text-gold-700 text-xs font-semibold">
                  {c.rating}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-semibold text-ink-50">{c.name}</h3>
                <p className="mt-0.5 text-sm text-gold-700">{c.role}</p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-ink-400">
                  <Award className="w-3.5 h-3.5 text-gold-600/70" /> {c.title}
                </p>
                <p className="mt-3 text-sm text-ink-300 leading-relaxed flex-1">{c.bio}</p>
                {c.available === false ? (
                  <p className="mt-4 text-center text-xs text-ink-400">
                    Currently occupied · Not taking new batches
                  </p>
                ) : (
                  <button
                    onClick={() => bookCoach(c.name)}
                    className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-gold-500/30 text-gold-700 text-sm font-medium hover:bg-gold-500/10 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> {c.ctaLabel ?? `Book with ${c.name.split(' ')[0]}`}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

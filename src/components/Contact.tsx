import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, User, GraduationCap, Globe, CalendarClock } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSettings } from '@/lib/settings';
import { WHATSAPP_NUMBER } from '@/lib/whatsapp';

const formats = [
  { id: 'offline', label: 'Offline Classes (Coimbatore Centre)', priceInr: 1600, period: '/ month' },
  { id: 'online-group-8', label: 'Online Group — 8 Students', priceInr: 1500, period: '/ month' },
  { id: 'online-group-4', label: 'Online Group — 4 Students', priceInr: 3500, period: '/ 8 classes' },
  { id: 'online-private', label: 'Online Private (1-on-1)', priceInr: 6400, period: '/ 8 classes' },
];

const levels = [
  'New to Chess',
  'Knows Basics (knows how the pieces move, etc.)',
  'Hobby Player',
  'Tournament Player',
  'Rated Player',
];
const languages = ['English', 'Tamil', 'English & Tamil'];
const timeSlotsIst = [
  '04:30 AM - 06:00 AM',
  '06:00 AM - 08:00 AM',
  '10:00 AM - 12:00 PM',
  '04:30 PM - 05:30 PM',
  '05:30 PM - 07:00 PM (Offline Centre)',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
  '08:00 PM - 09:00 PM',
];

const contactInfo = [
  { icon: MapPin, label: 'Visit', value: 'Coimbatore Chess Centre, Coimbatore, Tamil Nadu' },
  { icon: Phone, label: 'Call / WhatsApp', value: '+91 99448 98753' },
  { icon: Mail, label: 'Email', value: 'coimbatorechesscentre@gmail.com' },
  { icon: Clock, label: 'Offline Class Hours at Our Centre', value: 'Mon–Sat · 05:30 PM – 07:00 PM IST' },
  { icon: Globe, label: 'Online Class Hours', value: 'All 7 days · 04:30 AM – 11:00 PM IST' },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const { formatPrice, convertTime, tzLabel } = useSettings();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    studentName: '',
    age: '',
    level: '',
    format: '',
    language: '',
    timeSlot: '',
    parentName: '',
    phone: '',
    email: '',
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const step1Valid = form.studentName.trim() && form.age.trim() && form.level;
  const step2Valid = form.format && form.language;
  const step3Valid = form.phone.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!step3Valid) {
      setStatus('error');
      setErrorMsg('Please enter a contact number.');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');
    try {
      const { error } = await supabase.from('trial_bookings').insert({
        student_name: form.studentName.trim(),
        age: form.age ? parseInt(form.age, 10) : null,
        level: form.level,
        format: form.format,
        language: form.language,
        time_slot: form.timeSlot,
        parent_name: form.parentName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        whatsapp_sent: true,
      });
      if (error) throw error;

      const formatLabel = formats.find((f) => f.id === form.format)?.label ?? form.format;
      const message =
        `*Trial Class Booking — Coimbatore Chess Centre*\n\n` +
        `*Student Name:* ${form.studentName}\n` +
        `*Age:* ${form.age}\n` +
        `*Level:* ${form.level}\n` +
        `*Format:* ${formatLabel}\n` +
        `*Language:* ${form.language}\n` +
        `*Time Slot:* ${form.timeSlot}\n` +
        (form.parentName ? `*Parent/Guardian:* ${form.parentName}\n` : '') +
        `*Phone:* ${form.phone}\n` +
        (form.email ? `*Email:* ${form.email}\n` : '') +
        `\nI'd like to book a trial class. Please confirm availability.`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  function resetForm() {
    setStep(1);
    setStatus('idle');
    setForm({ studentName: '', age: '', level: '', format: '', language: '', timeSlot: '', parentName: '', phone: '', email: '' });
  }

  return (
    <section id="contact" className="relative py-28 bg-gradient-to-b from-ink-900 to-ink-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-600">Book a Trial</span>
          <h2 className="mt-4 font-display text-4xl lg:text-5xl font-semibold text-ink-50 text-balance">
            Reserve your free trial in 3 steps
          </h2>
          <p className="mt-4 text-ink-300">
            Fill in the details and we&apos;ll confirm your slot on WhatsApp instantly.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 reveal space-y-4">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-ink-700/60 bg-ink-900/50 p-5 hover:border-gold-500/30 transition-colors shadow-soft">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-gold-500/15 text-gold-600 border border-gold-500/25 flex-shrink-0">
                  <c.icon className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-400">{c.label}</div>
                  <div className="mt-0.5 text-ink-100">{c.value}</div>
                </div>
              </div>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#1a8c3f] px-5 py-4 font-semibold hover:bg-[#25D366]/20 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>

          <div className="lg:col-span-3 reveal">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-700/60 bg-ink-900/60 p-8 shadow-card">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div className={`grid place-items-center w-9 h-9 rounded-full font-semibold text-sm transition-all duration-300 ${step >= s ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-white' : 'bg-ink-800 text-ink-400 border border-ink-700'}`}>
                      {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                    </div>
                    {s < 3 && <div className={`h-0.5 flex-1 mx-2 rounded-full transition-all duration-300 ${step > s ? 'bg-gold-500' : 'bg-ink-700'}`} />}
                  </div>
                ))}
              </div>

              {/* Step 1: Student details */}
              <div className={step === 1 ? 'block' : 'hidden'}>
                <h3 className="font-display text-xl font-semibold text-ink-50 mb-1 flex items-center gap-2">
                  <User className="w-5 h-5 text-gold-600" /> Student Details
                </h3>
                <p className="text-sm text-ink-400 mb-5">Tell us about the student.</p>
                <div className="space-y-4">
                  <Field label="Student Name" required>
                    <input value={form.studentName} onChange={(e) => update('studentName', e.target.value)} className={inputCls} placeholder="Student's full name" />
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Age" required>
                      <input type="number" min="4" max="80" value={form.age} onChange={(e) => update('age', e.target.value)} className={inputCls} placeholder="e.g. 8" />
                    </Field>
                    <Field label="Current Level" required>
                      <select value={form.level} onChange={(e) => update('level', e.target.value)} className={inputCls}>
                        <option value="" disabled>Select level</option>
                        {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </Field>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="button" disabled={!step1Valid} onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Step 2: Format & Language */}
              <div className={step === 2 ? 'block' : 'hidden'}>
                <h3 className="font-display text-xl font-semibold text-ink-50 mb-1 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-gold-600" /> Class Format
                </h3>
                <p className="text-sm text-ink-400 mb-5">Pick the format and language that suits you.</p>
                <div className="space-y-4">
                  <Field label="Choose Format" required>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {formats.map((f) => (
                        <button key={f.id} type="button" onClick={() => update('format', f.id)} className={`text-left rounded-xl border px-4 py-3 transition-all ${form.format === f.id ? 'border-gold-500 bg-gold-500/10' : 'border-ink-700/60 bg-ink-950 hover:border-gold-500/40'}`}>
                          <div className="text-sm font-medium text-ink-50">{f.label}</div>
                          <div className="text-xs text-gold-700 mt-0.5">{formatPrice(f.priceInr)} {f.period}</div>
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Language" required>
                    <div className="flex flex-wrap gap-3">
                      {languages.map((l) => (
                        <button key={l} type="button" onClick={() => update('language', l)} className={`px-4 py-2.5 rounded-full text-sm border transition-all ${form.language === l ? 'border-gold-500 bg-gold-500/15 text-gold-700' : 'border-ink-700/60 text-ink-300 hover:border-gold-500/40'}`}>
                          <Globe className="w-3.5 h-3.5 inline mr-1.5" />{l}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
                <div className="mt-6 flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-ink-600 text-ink-200 hover:border-gold-500/40 hover:text-gold-700 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button type="button" disabled={!step2Valid} onClick={() => setStep(3)} className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Step 3: Time slot & contact */}
              <div className={step === 3 ? 'block' : 'hidden'}>
                <h3 className="font-display text-xl font-semibold text-ink-50 mb-1 flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-gold-600" /> Schedule & Contact
                </h3>
                <p className="text-sm text-ink-400 mb-5">When works for you, and how do we reach you?</p>
                <div className="space-y-4">
                  <Field label={`Preferred Time Slot (${tzLabel})`} required>
                    <select value={form.timeSlot} onChange={(e) => update('timeSlot', e.target.value)} className={inputCls}>
                      <option value="" disabled>Select a time slot</option>
                      {timeSlotsIst.map((t) => <option key={t} value={t}>{convertTime(t)} {tzLabel}</option>)}
                    </select>
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Parent / Guardian Name">
                      <input value={form.parentName} onChange={(e) => update('parentName', e.target.value)} className={inputCls} placeholder="If applicable" />
                    </Field>
                    <Field label="Phone (WhatsApp)" required>
                      <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputCls} placeholder="+91 ..." />
                    </Field>
                  </div>
                  <Field label="Email">
                    <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} placeholder="you@email.com" />
                  </Field>
                </div>

                {status === 'success' && (
                  <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-emerald-700">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">Booking saved! WhatsApp is opening now.</p>
                      <p className="mt-0.5 text-emerald-600/80">If it didn&apos;t open, tap the button below to send your details.</p>
                    </div>
                  </div>
                )}
                {status === 'error' && (
                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-700">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{errorMsg}</span>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-ink-600 text-ink-200 hover:border-gold-500/40 hover:text-gold-700 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  {status === 'success' ? (
                    <button type="button" onClick={resetForm} className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-gold-500/40 text-gold-700 hover:bg-gold-500/10 transition-colors">
                      Book Another
                    </button>
                  ) : (
                    <button type="submit" disabled={status === 'submitting'} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      {status === 'submitting' ? 'Sending...' : 'Confirm & Open WhatsApp'}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls = 'w-full rounded-xl bg-ink-950 border border-ink-700/60 px-4 py-3 text-ink-100 placeholder-ink-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/40 transition-colors';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-ink-300 mb-2">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      {children}
    </div>
  );
}

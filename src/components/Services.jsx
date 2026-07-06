import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, stagger, VIEWPORT } from '../utils/animations'

const services = [
  {
    title: 'Video Editing',
    desc: 'From raw footage to polished film. Brand commercials, social reels, documentaries, event recaps, and music videos.',
    list: ['Color Grading & LUT Design', 'Sound Design & Mixing', 'Multi-format Export'],
    price: '$299',
    icon: (
      <svg viewBox="0 0 52 52" width={48} height={48} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Film strip body */}
        <rect x="6" y="14" width="40" height="26" rx="3.5" stroke="#0E54FF" strokeWidth="1.8"/>
        {/* Sprocket holes left */}
        <rect x="6" y="18" width="5" height="4" rx="1" fill="#0E54FF" opacity=".5"/>
        <rect x="6" y="25" width="5" height="4" rx="1" fill="#0E54FF" opacity=".5"/>
        <rect x="6" y="32" width="5" height="4" rx="1" fill="#0E54FF" opacity=".5"/>
        {/* Sprocket holes right */}
        <rect x="41" y="18" width="5" height="4" rx="1" fill="#0E54FF" opacity=".5"/>
        <rect x="41" y="25" width="5" height="4" rx="1" fill="#0E54FF" opacity=".5"/>
        <rect x="41" y="32" width="5" height="4" rx="1" fill="#0E54FF" opacity=".5"/>
        {/* Play triangle */}
        <path d="M22 22 L32 27 L22 32 Z" fill="#0E54FF"/>
        {/* Timeline bar */}
        <line x1="6" y1="43" x2="46" y2="43" stroke="#0E54FF" strokeWidth="1.4" opacity=".35"/>
        <circle cx="20" cy="43" r="2" fill="#0E54FF"/>
        <circle cx="34" cy="43" r="2" fill="#0E54FF" opacity=".4"/>
      </svg>
    )
  },
  {
    title: 'Motion Graphics',
    desc: 'Logo animations, title sequences, lower thirds, explainer videos, and full brand motion packages.',
    list: ['Logo & Brand Animation', 'Explainer Videos', 'Social Motion Kits'],
    price: '$499',
    icon: (
      <svg viewBox="0 0 52 52" width={48} height={48} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Orbit ring */}
        <ellipse cx="26" cy="26" rx="20" ry="8" stroke="#FF7A2A" strokeWidth="1.6" strokeDasharray="3 2" opacity=".5"/>
        {/* Vertical ring */}
        <ellipse cx="26" cy="26" rx="8" ry="20" stroke="#FF7A2A" strokeWidth="1.6" strokeDasharray="3 2" opacity=".5"/>
        {/* Core circle */}
        <circle cx="26" cy="26" r="5" stroke="#FF7A2A" strokeWidth="1.8"/>
        <circle cx="26" cy="26" r="2.2" fill="#FF7A2A"/>
        {/* Orbiting dot */}
        <circle cx="46" cy="26" r="2.5" fill="#FF7A2A"/>
        {/* Motion trail */}
        <path d="M38 14 Q44 20 46 26" stroke="#FF7A2A" strokeWidth="1.4" strokeLinecap="round" opacity=".45"/>
      </svg>
    )
  },
  {
    title: 'Graphic Design',
    desc: 'Visual identities, logo systems, print materials, social media kits, and UI design.',
    list: ['Brand Identity & Logo', 'Social Media Templates', 'Print & Digital'],
    price: '$249',
    icon: (
      <svg viewBox="0 0 52 52" width={48} height={48} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pen nib body */}
        <path d="M26 44 L10 28 L18 10 L34 10 L42 28 Z" stroke="#0E54FF" strokeWidth="1.8" strokeLinejoin="round"/>
        {/* Nib center groove */}
        <line x1="26" y1="44" x2="26" y2="28" stroke="#0E54FF" strokeWidth="1.4" opacity=".5"/>
        {/* Nib horizontal */}
        <line x1="12" y1="28" x2="40" y2="28" stroke="#0E54FF" strokeWidth="1.4" opacity=".5"/>
        {/* Top crossbar */}
        <line x1="18" y1="10" x2="34" y2="10" stroke="#0E54FF" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Ink dot */}
        <circle cx="26" cy="44" r="2.2" fill="#0E54FF"/>
      </svg>
    )
  },
  {
    title: 'Full Brand Package',
    desc: 'The complete creative stack — identity design, brand film, motion graphics, and social media kit.',
    list: ['Everything in all 3 services', 'Brand Film (2–3 min)', 'Strategy & Direction'],
    price: '$1,499',
    featured: true,
    icon: (
      <svg viewBox="0 0 52 52" width={48} height={48} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Diamond top */}
        <path d="M26 6 L40 18 L26 46 L12 18 Z" stroke="#FF7A2A" strokeWidth="1.8" strokeLinejoin="round"/>
        {/* Diamond mid-line */}
        <line x1="12" y1="18" x2="40" y2="18" stroke="#FF7A2A" strokeWidth="1.4" opacity=".55"/>
        {/* Left facet */}
        <line x1="26" y1="6" x2="12" y2="18" stroke="#FF7A2A" strokeWidth="1.4" opacity=".9"/>
        {/* Right facet */}
        <line x1="26" y1="6" x2="40" y2="18" stroke="#FF7A2A" strokeWidth="1.4" opacity=".9"/>
        {/* Inner left */}
        <line x1="18" y1="18" x2="26" y2="46" stroke="#FF7A2A" strokeWidth="1" opacity=".35"/>
        {/* Inner right */}
        <line x1="34" y1="18" x2="26" y2="46" stroke="#FF7A2A" strokeWidth="1" opacity=".35"/>
        {/* Top glow dot */}
        <circle cx="26" cy="6" r="2.5" fill="#FF7A2A"/>
      </svg>
    )
  },
]

export default function Services() {
  return (
    <section id="services" style={{ padding: 'var(--section-pad) 0', background: '#080808', position: 'relative' }}>
      {/* Background glow */}
      <div aria-hidden style={{ position: 'absolute', bottom: 0, right: '-20%', width: '60%', height: '60%', background: 'radial-gradient(ellipse, rgba(255,122,42,.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-label">
          <span>05</span> What We Offer
        </motion.div>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          Services built to <span style={{ color: '#0E54FF' }}>scale</span>
        </motion.h2>

        <motion.div
          variants={stagger(.1)} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}
          className="services-grid"
        >
          {services.map(s => (
            <motion.div
              key={s.title} variants={fadeUp}
              whileHover={{ y: -6, borderColor: s.featured ? '#FF7A2A' : 'rgba(14,84,255,.4)', boxShadow: s.featured ? '0 24px 60px rgba(0,0,0,.4), 0 0 40px rgba(255,122,42,.3)' : '0 24px 60px rgba(0,0,0,.4), 0 0 40px rgba(14,84,255,.1)' }}
              style={{
                background: s.featured ? 'rgba(255,122,42,.05)' : 'rgba(255,254,255,.03)',
                border: s.featured ? '1px solid rgba(255,122,42,.35)' : '1px solid rgba(255,254,255,.08)',
                borderRadius: 24, padding: '36px 28px', display: 'flex', flexDirection: 'column', position: 'relative',
                backdropFilter: 'blur(10px)', transition: 'border-color .3s'
              }}
            >
              {s.featured && (
                <div style={{ position: 'absolute', top: -12, right: 24, background: '#FF7A2A', color: '#fff', fontFamily: 'var(--font-ui)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 50 }}>
                  Most Popular
                </div>
              )}
              <div style={{ marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '.04em', marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: '.88rem', color: 'rgba(255,254,255,.6)', lineHeight: 1.7, marginBottom: 20, flexGrow: 1 }}>{s.desc}</p>
              
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, listStyle: 'none' }}>
                {s.list.map(item => (
                  <li key={item} style={{ fontSize: '.82rem', color: 'rgba(255,254,255,.6)', paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#0E54FF', fontSize: '.7rem' }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '.9rem', color: 'rgba(255,254,255,.6)', marginBottom: 16 }}>
                From <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{s.price}</strong>
              </div>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
                style={{
                  display: 'inline-flex', justifyContent: 'center', padding: '10px 22px', borderRadius: 50,
                  fontFamily: 'var(--font-ui)', fontSize: '.85rem', fontWeight: 600,
                  background: s.featured ? '#FF7A2A' : 'transparent',
                  color: s.featured ? '#fff' : '#0E54FF',
                  border: s.featured ? 'none' : '1.5px solid #0E54FF',
                  boxShadow: s.featured ? '0 0 20px rgba(255,122,42,.3)' : 'none',
                  textDecoration: 'none', transition: 'background .3s, color .3s, box-shadow .3s',
                }}
                onMouseEnter={e => {
                  if (!s.featured) {
                    e.currentTarget.style.background = '#0E54FF';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(14,84,255,.3)';
                  }
                }}
                onMouseLeave={e => {
                  if (!s.featured) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#0E54FF';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                Get Quote →
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media(max-width:1100px) { #services .services-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:768px) { #services .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

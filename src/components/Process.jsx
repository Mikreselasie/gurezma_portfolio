import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, stagger, lineDraw, processStep, VIEWPORT } from '../utils/animations'

const steps = [
  {
    num: '01', title: 'Concept',
    desc: 'We dive deep into your brief, brand, and goals. Research, moodboards, and creative direction before a single frame is touched.',
    color: '#0E54FF',
    icon: (
      <svg viewBox="0 0 40 40" width={52} height={52}>
        <circle cx="20" cy="20" r="18" fill="none" stroke="#0E54FF" strokeWidth="1.8"/>
        <path d="M13 20 L20 13 L27 20 L20 27 Z" fill="#0E54FF" opacity=".25"/>
        <path d="M20 13 L20 27 M13 20 L27 20" stroke="#0E54FF" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    num: '02', title: 'Edit & Design',
    desc: 'Raw footage becomes narrative. Assets are crafted with precision — typography, composition, pacing, and color all refined.',
    color: '#0E54FF',
    icon: (
      <svg viewBox="0 0 40 40" width={52} height={52}>
        <circle cx="20" cy="20" r="18" fill="none" stroke="#0E54FF" strokeWidth="1.8"/>
        <rect x="12" y="14" width="16" height="12" rx="2" fill="none" stroke="#0E54FF" strokeWidth="1.5"/>
        <path d="M17 26 L17 28 M23 26 L23 28 M14 28 L26 28" stroke="#0E54FF" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    num: '03', title: 'Motion & Polish',
    desc: 'Animations, transitions, sound, and VFX are layered in. This is where the work comes alive — kinetic energy meets refined aesthetics.',
    color: '#FF7A2A',
    icon: (
      <svg viewBox="0 0 40 40" width={52} height={52}>
        <circle cx="20" cy="20" r="18" fill="none" stroke="#FF7A2A" strokeWidth="1.8"/>
        <path d="M13 20 Q16.5 13 20 20 Q23.5 27 27 20" fill="none" stroke="#FF7A2A" strokeWidth="1.8"/>
        <circle cx="13" cy="20" r="2" fill="#FF7A2A"/>
        <circle cx="27" cy="20" r="2" fill="#FF7A2A"/>
      </svg>
    )
  },
  {
    num: '04', title: 'Delivery',
    desc: 'Final files exported in every format. Source files, revision rounds, and full handoff — clean, fast, and stress-free.',
    color: '#FF7A2A',
    icon: (
      <svg viewBox="0 0 40 40" width={52} height={52}>
        <circle cx="20" cy="20" r="18" fill="none" stroke="#FF7A2A" strokeWidth="1.8"/>
        <path d="M13 20 L18 25 L27 15" stroke="#FF7A2A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
]

export default function Process() {
  return (
    <section id="process" style={{ padding: 'var(--section-pad) 0', background: '#080808', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div aria-hidden style={{ position: 'absolute', top: '30%', left: '-10%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(14,84,255,.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container">
        <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-label">
          <span>03</span> How We Work
        </motion.div>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          From concept to <span style={{ color: '#0E54FF' }}>delivery</span>
        </motion.h2>

        <div style={{ position: 'relative', paddingTop: 20 }}>
          {/* Connecting SVG line */}
          <div className="proc-line" style={{ position: 'absolute', top: 68, left: '12.5%', right: '12.5%', height: 3, pointerEvents: 'none' }}>
            <svg width="100%" height="4" viewBox="0 0 900 4" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              <motion.line
                x1="0" y1="2" x2="900" y2="2"
                stroke="url(#procGrad)"
                strokeWidth="1.5"
                strokeDasharray="8 6"
                variants={lineDraw}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
              />
              <defs>
                <linearGradient id="procGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0E54FF"/>
                  <stop offset="100%" stopColor="#FF7A2A"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps */}
          <motion.div
            variants={stagger(.14)}
            initial="hidden" whileInView="visible" viewport={VIEWPORT}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40 }}
            className="proc-grid"
          >
            {steps.map(s => (
              <motion.div
                key={s.num}
                variants={processStep}
                style={{ textAlign: 'center', padding: '0 10px' }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'rgba(255,254,255,.04)', lineHeight: 1, marginBottom: -26 }}>{s.num}</div>
                <motion.div
                  style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, position: 'relative', zIndex: 1 }}
                  whileHover={{ scale: 1.15, filter: `drop-shadow(0 0 14px ${s.color}66)` }}
                  transition={{ duration: .3 }}
                >
                  {s.icon}
                </motion.div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '.04em', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: '.85rem', color: 'rgba(255,254,255,.55)', lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px) {
          #process .proc-grid { grid-template-columns: repeat(2,1fr) !important; }
          #process .proc-line { display: none; }
        }
        @media(max-width:580px) {
          #process .proc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

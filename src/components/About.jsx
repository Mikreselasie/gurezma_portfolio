import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, stagger, skillFill, VIEWPORT } from '../utils/animations'

const skills = [
  { label: 'Video Editing',   pct: 95 },
  { label: 'Motion Graphics', pct: 88 },
  { label: 'Graphic Design',  pct: 92 },
]

const tools = [
  { abbr: 'Ae',  name: 'After Effects',  icon: '/logos/Adobe_After_Effects_CC_2026_icon.svg' },
  { abbr: 'Pr',  name: 'Premiere Pro',   icon: '/logos/premiere-pro-cc.svg' },
  { abbr: 'DaV', name: 'DaVinci',        icon: '/logos/DaVinci_Resolve_Studio.png' },
  { abbr: 'Fg',  name: 'Figma',          icon: '/logos/Figma Logo.png', scale: 0.8 },
  { abbr: 'Ai',  name: 'Illustrator',    icon: '/logos/Adobe-illustrator-icon.svg' },
  { abbr: 'Ps',  name: 'Photoshop',      icon: '/logos/adobe-photoshop-2.svg' },
  { abbr: 'Blr', name: 'Blender',        icon: '/logos/Blender_logo_no_text.svg' },
]

export default function About() {
  return (
    <section id="about" style={{ padding: 'var(--section-pad) 0', background: '#080808' }}>
      <div className="container">

        <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-label">
          <span>01</span> About Us
        </motion.div>

        {/* Two-column */}
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 80 }}>

          {/* Text column */}
          <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <motion.h2 variants={fadeUp} className="section-title">
              We don't just edit.<br />
              <span style={{ color: '#0E54FF' }}>We craft stories.</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,254,255,.6)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 16 }}>
              Gurezma Studio is a multidisciplinary creative studio focused on helping brands, businesses, and creators communicate through compelling visuals and engaging storytelling. From high-converting SaaS explainer videos and dynamic motion graphics to cinematic YouTube content and scroll-stopping short-form videos, we create content that informs, entertains, and inspires.
            </motion.p>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,254,255,.6)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 36 }}>
              Beyond video, we craft bold visual identities through branding, poster design, and graphic design that leave lasting impressions. Every project combines creative strategy, clean design, and purposeful motion to deliver visuals that not only look great—but make an impact.
            </motion.p>

            {/* Skill bars */}
            <motion.div variants={stagger(.15)} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {skills.map(s => (
                <motion.div key={s.label} variants={fadeUp}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '.9rem' }}>{s.label}</span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '.85rem', color: '#FF7A2A' }}>{s.pct}%</span>
                  </div>
                  <div style={{ height: 3, background: 'rgba(255,254,255,.08)', borderRadius: 2, overflow: 'hidden' }}>
                    <motion.div
                      variants={skillFill(s.pct)}
                      initial="hidden" whileInView="visible" viewport={VIEWPORT}
                      style={{ height: '100%', background: 'linear-gradient(90deg,#0E54FF,#FF7A2A)', borderRadius: 2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={VIEWPORT}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 'clamp(240px,32vw,400px)' }}>
              <motion.img
                src="/assets/avatar.jpg"
                alt="Gurezma Studio creative team"
                style={{ borderRadius: 24, objectFit: 'cover', aspectRatio: '3/4', width: '100%', border: '1px solid rgba(14,84,255,.25)', boxShadow: '0 0 60px rgba(14,84,255,.12), 0 40px 80px rgba(0,0,0,.7)' }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: .5 }}
              />
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: .7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ delay: .4, duration: .6, ease: [0.34,1.56,.64,1] }}
                style={{ position: 'absolute', bottom: -18, right: -18, background: '#FF7A2A', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 30px rgba(255,122,42,.35)' }}
              >
                <span style={{ fontSize: '1.4rem' }}>★</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '.75rem', fontWeight: 700, lineHeight: 1.3 }}>Premium<br/>Creative</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Tools */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          style={{ borderTop: '1px solid rgba(255,254,255,.07)', paddingTop: 56 }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '.78rem', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,254,255,.4)', marginBottom: 28 }}>
            Tools we master
          </p>
          <motion.div variants={stagger(.05)} initial="hidden" whileInView="visible" viewport={VIEWPORT}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            {tools.map(t => (
              <motion.div key={t.name} variants={fadeUp}
                whileHover={{ y: -4, borderColor: 'rgba(14,84,255,.5)' }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '16px 18px', background: 'rgba(255,254,255,.03)', border: '1px solid rgba(255,254,255,.07)', borderRadius: 12, minWidth: 80, cursor: 'default', transition: 'border-color .25s' }}
                className="tool-badge"
              >
                <div style={{ width: 32, height: 32, borderRadius: 5, background: t.icon ? 'transparent' : t.bg, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: t.abbr?.length > 2 ? '.7rem' : '.85rem', color: t.color, fontFamily: 'Arial, sans-serif' }}>
                  {t.icon ? <img src={t.icon} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: t.scale ? `scale(${t.scale})` : 'none' }} /> : t.abbr}
                </div>
                <span style={{ fontSize: '.7rem', color: 'rgba(255,254,255,.5)', fontFamily: 'var(--font-ui)', whiteSpace: 'nowrap' }}>{t.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:900px) {
          #about .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

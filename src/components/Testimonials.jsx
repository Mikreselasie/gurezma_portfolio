import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, VIEWPORT } from '../utils/animations'

const testimonials = [
  { quote: "Gurezma Studio transformed our brand launch video into something truly cinematic. The final edit blew away our entire team — and our clients.", author: "Sara Malik", role: "CEO, Orbit Digital", initial: "S", grad: "135deg,#0E54FF,#FF7A2A" },
  { quote: "The motion graphics package they delivered for our product launch exceeded every benchmark. Engagement went up 300% week one.", author: "James Okafor", role: "Head of Marketing, NovaTech", initial: "J", grad: "135deg,#FF7A2A,#000A4F" },
  { quote: "Our rebrand needed to feel bold yet refined. Gurezma nailed it — every touchpoint from logo to social kit was perfect on the first draft.", author: "Layla Hassan", role: "Founder, Bloom Creative", initial: "L", grad: "135deg,#0E54FF,#9999FF" },
  { quote: "I've worked with editors around the world. Gurezma Studio's pacing, color work, and attention to storytelling is genuinely world-class.", author: "Karim Nasser", role: "Director, Frameshift Films", initial: "K", grad: "135deg,#FF7A2A,#0E54FF" },
  { quote: "Fast, responsive, and incredibly talented. They delivered a full social media motion package in 5 days. Unbelievable quality and speed.", author: "Amira Yildiz", role: "Brand Lead, Pulse Agency", initial: "A", grad: "135deg,#000A4F,#0E54FF" },
]

function TestimonialCard({ t }) {
  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(14,84,255,.4)', background: 'rgba(14,84,255,.06)' }}
      style={{ flexShrink: 0, width: 340, background: 'rgba(255,254,255,.03)', border: '1px solid rgba(255,254,255,.08)', borderRadius: 14, padding: 28, transition: 'border-color .3s, background .3s' }}
    >
      <span style={{ display: 'block', fontFamily: 'Georgia,serif', fontSize: '3.5rem', lineHeight: .7, color: '#FF7A2A', opacity: .7, marginBottom: 12 }}>"</span>
      <p style={{ fontSize: '.9rem', lineHeight: 1.75, color: 'rgba(255,254,255,.6)', marginBottom: 20 }}>{t.quote}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(${t.grad})`, display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontSize: '1.1rem', flexShrink: 0 }}>{t.initial}</div>
        <div>
          <strong style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '.88rem', fontWeight: 600 }}>{t.author}</strong>
          <span style={{ fontSize: '.78rem', color: 'rgba(255,254,255,.45)' }}>{t.role}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  // Double array for seamless loop
  const doubled = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" style={{ padding: 'var(--section-pad) 0', background: '#000', overflow: 'hidden' }}>
      <div className="container">
        <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-label">
          <span>04</span> Client Voices
        </motion.div>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          What they <span style={{ color: '#FF7A2A' }}>say</span>
        </motion.h2>
      </div>

      {/* Marquee */}
      <div style={{ marginTop: 48, overflow: 'hidden' }} className="marquee-track">
        <div className="marquee-inner" style={{ display: 'flex', gap: 24, width: 'max-content' }}>
          {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  )
}

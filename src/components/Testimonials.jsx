import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, VIEWPORT } from '../utils/animations'

const testimonials = [
  { quote: "MikreSilassie is an exceptional video editor who consistently delivers high-quality work. He has a fantastic eye for pacing, clean transitions, and narrative flow, turning raw footage into polished, highly engaging content. Beyond his technical skills, his communication is excellent—he takes feedback incredibly well, understands the creative vision instantly, and always hits his deadlines. If you are looking for an editor who is reliable, highly skilled, and easy to work with, I highly recommend MikreSilassie. I’ll definitely be working with him on future projects!", author: "Nahon Biruk", role: "host, Cyber Guardians", initial: "S", grad: "135deg,#0E54FF,#FF7A2A", logo: "/assets/Client Logos/Cyyber Guardians.png" },
  { quote: "I have had the pleasure of working with Mikreselasie as a video editor, and he has consistently exceeded my expectations. He is creative, detail-oriented, and always delivers high-quality work that aligns with the vision of the project. One of the qualities I appreciate most about Mikreselasie is his reliability. He communicates well, meets deadlines, and is always open to feedback, making revisions quickly and professionally. His ability to maintain a strong visual flow, and produce engaging content has added tremendous value to my contents. I highly recommend Mikreselasie to anyone looking for a skilled and dependable video editor. He is passionate about his craft, easy to work with, and committed to delivering excellent results.", author: "Biruktawit", role: "CEO, Productive Habesha", initial: "J", grad: "135deg,#FF7A2A,#000A4F", logo: "/assets/Client Logos/Productive Habesha.jpg" },
  { quote: "To be honest, I was just looking for a simple logo for my Gbi Podcast (ግቢ ፖድካስት) . He took it to a whole different level. He took the time to understand the exact vibe and concept of the project, then mapped out a great visual direction for it. His creativity feels completely natural, and working with him felt like a true partnership. If you want a designer who cares about the depth of your brand , he is definitely your guy. Highly recommended!", author: "Kinetbeb Melese", role: "Founder, Gibi Podcast", initial: "L", grad: "135deg,#0E54FF,#9999FF", logo: "/assets/Client Logos/Gibi Podcast.png" },
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
        {t.logo ? (
          <img src={t.logo} alt={t.author} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(${t.grad})`, display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontSize: '1.1rem', flexShrink: 0 }}>{t.initial}</div>
        )}
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

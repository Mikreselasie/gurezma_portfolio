import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, stagger, VIEWPORT } from '../utils/animations'
import { Instagram, Youtube, Linkedin, Twitter, Mail } from 'lucide-react'

// Custom icons for Behance & Vimeo since lucide doesn't have them built-in
const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16}>
    <path d="M2 5h8c2.2 0 4 1.8 4 4 0 1-.4 2-1 2.7A4 4 0 0 1 10 19H2V5z" fill="none" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M5 11h4.5a1.5 1.5 0 0 0 0-3H5v3z" fill="currentColor" opacity=".7"/>
    <path d="M5 15h5a2 2 0 0 0 0-4H5v4z" fill="currentColor" opacity=".7"/>
    <path d="M15 10h7M18.5 8C16.5 8 15 9.7 15 12s1.5 4 3.5 4c1.5 0 2.8-.9 3.3-2.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const VimeoIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16}>
    <path d="M22 7.4c-.1 2.8-2 6.6-5.8 11.5C12.3 24 9 24 7.6 20.5c-.8-2.1-3.2-9.8-3.8-10.5-.5-.6-2 .6-2 .6L1 9c0 0 3.7-3.3 5.4-3.5 1.8-.2 2.9 1.3 3.3 3.9.4 2.8.9 7.3 1.4 8.4.5 1 1.6.7 2.5-.4.8-1.1 2.8-3.6 2.9-5.1.1-1.9-1.4-1.9-2.8-1.3.8-3.7 5.5-7.3 8.3-3.6z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

const socials = [
  { name: 'Instagram', icon: <Instagram size={16} />, url: 'https://www.instagram.com/gurezma_studios/', hover: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' },
  { name: 'YouTube',   icon: <Youtube size={16} />,   url: 'https://www.youtube.com/@GurezmaStudio',   hover: '#ff0000' },
  { name: 'Behance',   icon: <BehanceIcon />,         url: 'https://www.behance.net/gurezmastudios',   hover: '#1769ff' },
  { name: 'Vimeo',     icon: <VimeoIcon />,           url: 'https://vimeo.com/gurezmastudios',     hover: '#1ab7ea' },
  { name: 'LinkedIn',  icon: <Linkedin size={16} />,  url: 'https://www.linkedin.com/company/gurezma-studios',  hover: '#0a66c2' },
  { name: 'X / Twitter',icon: <Twitter size={16} />,  url: 'https://x.com/gurezma',         hover: '#222' },
]

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      e.target.reset()
      setTimeout(() => setSuccess(false), 5000)
    }, 1500)
  }

  return (
    <section id="contact" style={{ padding: 'var(--section-pad) 0 calc(var(--section-pad) * 1.2)', position: 'relative', overflow: 'hidden' }}>
      {/* Background with orb */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(14,84,255,.15) 0%, transparent 60%)' }} />
      </div>

      <div className="container contact-grid" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Info Column */}
        <motion.div variants={stagger(.1)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <motion.div variants={fadeLeft} className="section-label" style={{ color: 'rgba(255,254,255,.5)' }}>
            <span>06</span> Get In Touch
          </motion.div>
          <motion.h2 variants={fadeUp} className="section-title">
            Ready to create<br /><span style={{ color: '#FF7A2A' }}>something epic?</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'rgba(255,254,255,.6)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 40, marginTop: -16 }}>
            Tell us about your project — we'll get back to you within 24 hours.
          </motion.p>

          <motion.div variants={fadeUp} style={{ marginBottom: 40 }}>
            <a href="mailto:gurezmastudio@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-ui)', fontSize: '1rem', color: 'rgba(255,254,255,.6)', textDecoration: 'none', transition: 'color .3s' }} onMouseEnter={e => e.currentTarget.style.color = '#FF7A2A'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,254,255,.6)'}>
              <Mail size={20} />
              gurezmastudio@gmail.com
            </a>
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }} className="social-links">
            {socials.map(s => (
              <motion.a
                key={s.name} href={s.url} target="_blank" rel="noreferrer"
                whileHover={{ y: -2 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 50, background: 'rgba(255,254,255,.06)', border: '1px solid rgba(255,254,255,.1)', color: 'rgba(255,254,255,.6)', fontFamily: 'var(--font-ui)', fontSize: '.82rem', fontWeight: 500, textDecoration: 'none', transition: 'all .3s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = s.hover;
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.boxShadow = `0 4px 16px ${s.hover.includes('linear') ? 'rgba(253,29,29,.4)' : s.hover + '80'}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,254,255,.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,254,255,.1)';
                  e.currentTarget.style.color = 'rgba(255,254,255,.6)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                className="social-btn"
              >
                {s.icon} <span className="social-label">{s.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Form Column */}
        <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          style={{ background: 'rgba(255,254,255,.04)', border: '1px solid rgba(255,254,255,.1)', borderRadius: 24, padding: 40, backdropFilter: 'blur(20px)' }}
          className="form-wrapper"
        >
          <form onSubmit={handleSubmit}>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>Project Type</label>
              <select required defaultValue="">
                <option value="" disabled>Select a service…</option>
                <option value="video">Video Editing</option>
                <option value="motion">Motion Graphics</option>
                <option value="design">Graphic Design</option>
                <option value="brand">Full Brand Package</option>
                <option value="other">Other / Not sure yet</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tell us about your project</label>
              <textarea rows={5} placeholder="Describe your project, timeline, and budget…" required />
            </div>
            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: .98 }}
              style={{ width: '100%', padding: '14px 32px', borderRadius: 50, background: '#FF7A2A', color: '#fff', fontFamily: 'var(--font-ui)', fontSize: '.95rem', fontWeight: 600, border: 'none', boxShadow: '0 0 30px rgba(255,122,42,.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              {loading ? <span className="loader" /> : 'Start a Project →'}
            </motion.button>
            {success && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', color: '#5dff8a', fontFamily: 'var(--font-ui)', fontSize: '.9rem', marginTop: 16 }}>
                ✓ Message sent! We'll be in touch within 24 hours.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>

      <style>{`
        #contact .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        #contact .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        #contact .form-group label { fontFamily: var(--font-ui); fontSize: .82rem; fontWeight: 600; color: rgba(255,254,255,.6); letterSpacing: .04em; }
        #contact .form-group input, #contact .form-group select, #contact .form-group textarea { background: rgba(255,254,255,.06); border: 1.5px solid rgba(255,254,255,.1); borderRadius: 999px; padding: 14px 16px; color: #fff; fontFamily: var(--font-body); fontSize: .9rem; outline: none; transition: border-color .3s, box-shadow .3s; resize: none; boxSizing: border-box; }
        #contact .form-group input::placeholder, #contact .form-group textarea::placeholder { color: rgba(255,254,255,.25); }
        #contact .form-group select { appearance: none; cursor: pointer; paddingRight: 44px; backgroundImage: linear-gradient(45deg, transparent 50%, rgba(255,255,255,.7) 50%), linear-gradient(135deg, rgba(255,255,255,.7) 50%, transparent 50%); backgroundPosition: calc(100% - 18px) calc(50% - 2px), calc(100% - 12px) calc(50% - 2px); backgroundSize: 6px 6px, 6px 6px; backgroundRepeat: no-repeat; }
        #contact .form-group select option { background: #0d0d0d; }
        #contact .form-group input:focus, #contact .form-group select:focus, #contact .form-group textarea:focus { borderColor: #0E54FF; boxShadow: 0 0 0 3px rgba(14,84,255,.15); }
        .loader { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:900px) { #contact .contact-grid { grid-template-columns: 1fr; gap: 48px; } }
        @media(max-width:768px) { #contact .form-row { grid-template-columns: 1fr !important; } #contact .form-wrapper { padding: 28px 20px !important; } }
        @media(max-width:480px) { .social-links { gap: 8px; } .social-btn { padding: 10px 12px !important; } .social-label { display: none; } }
      `}</style>
    </section>
  )
}

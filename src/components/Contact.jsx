import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, stagger, VIEWPORT } from '../utils/animations'
import { Instagram, Youtube, Linkedin, Twitter, Mail, ChevronDown } from 'lucide-react'

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

const PROJECT_TYPES = [
  { value: 'video',   label: 'Video Editing' },
  { value: 'motion',  label: 'Motion Graphics' },
  { value: 'design',  label: 'Graphic Design' },
  { value: 'brand',   label: 'Full Brand Package' },
  { value: 'other',   label: 'Other / Not sure yet' },
]

// Custom glassmorphism select component
function GlassSelect({ value, onChange, required }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selected = PROJECT_TYPES.find(p => p.value === value)

  // Close on outside click
  const handleBlur = (e) => {
    if (!ref.current?.contains(e.relatedTarget)) setOpen(false)
  }

  return (
    <div
      ref={ref}
      onBlur={handleBlur}
      style={{ position: 'relative' }}
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,254,255,.06)',
          border: open ? '1.5px solid #0E54FF' : '1.5px solid rgba(255,254,255,.1)',
          borderRadius: 999,
          padding: '14px 20px',
          color: selected ? '#fff' : 'rgba(255,254,255,.25)',
          fontFamily: 'var(--font-body)',
          fontSize: '.9rem',
          cursor: 'pointer',
          outline: 'none',
          backdropFilter: 'blur(12px)',
          boxShadow: open ? '0 0 0 3px rgba(14,84,255,.15)' : 'none',
          transition: 'border-color .3s, box-shadow .3s',
        }}
      >
        <span>{selected ? selected.label : 'Select a service…'}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'flex', color: 'rgba(255,254,255,.5)' }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      {open && (
        <motion.ul
          role="listbox"
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 100,
            listStyle: 'none',
            margin: 0,
            padding: '8px',
            background: 'rgba(10,10,20,0.75)',
            border: '1.5px solid rgba(255,254,255,.12)',
            borderRadius: 20,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 16px 40px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.05) inset',
          }}
        >
          {PROJECT_TYPES.map(pt => (
            <li
              key={pt.value}
              role="option"
              aria-selected={value === pt.value}
              tabIndex={0}
              onMouseDown={(e) => {
                e.preventDefault()
                onChange(pt.value)
                setOpen(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(pt.value)
                  setOpen(false)
                }
              }}
              style={{
                padding: '11px 16px',
                borderRadius: 12,
                cursor: 'pointer',
                color: value === pt.value ? '#FF7A2A' : 'rgba(255,254,255,.75)',
                background: value === pt.value ? 'rgba(255,122,42,.12)' : 'transparent',
                fontFamily: 'var(--font-body)',
                fontSize: '.9rem',
                transition: 'background .2s, color .2s',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
              onMouseEnter={e => {
                if (value !== pt.value) {
                  e.currentTarget.style.background = 'rgba(255,254,255,.06)'
                  e.currentTarget.style.color = '#fff'
                }
              }}
              onMouseLeave={e => {
                if (value !== pt.value) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(255,254,255,.75)'
                }
              }}
            >
              {value === pt.value && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF7A2A', flexShrink: 0 }} />
              )}
              {pt.label}
            </li>
          ))}
        </motion.ul>
      )}

      {/* Hidden native select for form validation */}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: 'absolute',
          opacity: 0,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      >
        <option value="" disabled />
        {PROJECT_TYPES.map(pt => (
          <option key={pt.value} value={pt.value}>{pt.label}</option>
        ))}
      </select>
    </div>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [projectType, setProjectType] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!projectType) return

    setLoading(true)
    setError(null)

    const form = e.target
    const payload = {
      from_name:    form.from_name.value,
      from_email:   form.from_email.value,
      project_type: PROJECT_TYPES.find(p => p.value === projectType)?.label || projectType,
      message:      form.message.value,
    }

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Server error')
      setSuccess(true)
      setProjectType('')
      form.reset()
      setTimeout(() => setSuccess(false), 6000)
    } catch (err) {
      console.error('Contact form error:', err)
      setError('Something went wrong. Please email us directly at gurezmastudio@gmail.com')
    } finally {
      setLoading(false)
    }
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
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="from_name" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="from_email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>Project Type</label>
              <GlassSelect value={projectType} onChange={setProjectType} required />
            </div>
            <div className="form-group">
              <label>Tell us about your project</label>
              <textarea name="message" rows={5} placeholder="Describe your project, timeline, and budget…" required />
            </div>
            <motion.button
              type="submit" disabled={loading || !projectType}
              whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: .98 }}
              style={{ width: '100%', padding: '14px 32px', borderRadius: 50, background: '#FF7A2A', color: '#fff', fontFamily: 'var(--font-ui)', fontSize: '.95rem', fontWeight: 600, border: 'none', boxShadow: '0 0 30px rgba(255,122,42,.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: loading ? 'not-allowed' : 'pointer', opacity: (!projectType && !loading) ? 0.7 : 1, transition: 'opacity .3s' }}
            >
              {loading ? <span className="loader" /> : 'Start a Project →'}
            </motion.button>
            {success && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', color: '#5dff8a', fontFamily: 'var(--font-ui)', fontSize: '.9rem', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.1em' }}>✓</span> Message sent! We'll be in touch within 24 hours.
              </motion.div>
            )}
            {error && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', color: '#ff6b6b', fontFamily: 'var(--font-ui)', fontSize: '.85rem', marginTop: 16, lineHeight: 1.5 }}>
                {error}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>

      <style>{`
        #contact .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        #contact .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        #contact .form-group label { font-family: var(--font-ui); font-size: .82rem; font-weight: 600; color: rgba(255,254,255,.6); letter-spacing: .04em; text-transform: uppercase; }
        #contact .form-group input,
        #contact .form-group textarea {
          background: rgba(255,254,255,.06);
          border: 1.5px solid rgba(255,254,255,.1);
          border-radius: 999px;
          padding: 14px 20px;
          color: #fff;
          font-family: var(--font-body);
          font-size: .9rem;
          outline: none;
          transition: border-color .3s, box-shadow .3s;
          resize: none;
          box-sizing: border-box;
          width: 100%;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        #contact .form-group textarea {
          border-radius: 20px;
        }
        #contact .form-group input::placeholder,
        #contact .form-group textarea::placeholder { color: rgba(255,254,255,.25); }
        #contact .form-group input:focus,
        #contact .form-group textarea:focus {
          border-color: #0E54FF;
          box-shadow: 0 0 0 3px rgba(14,84,255,.15);
        }
        .loader { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:900px) { #contact .contact-grid { grid-template-columns: 1fr; gap: 48px; } }
        @media(max-width:768px) { #contact .form-row { grid-template-columns: 1fr !important; } #contact .form-wrapper { padding: 28px 20px !important; } }
        @media(max-width:480px) { .social-links { gap: 8px; } .social-btn { padding: 10px 12px !important; } .social-label { display: none; } }
      `}</style>
    </section>
  )
}

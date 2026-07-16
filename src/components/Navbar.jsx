import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionValue, useSpring } from 'framer-motion'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Work',     href: '#work'     },
  { label: 'Process',  href: '#process'  },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* Floating wrapper — centers the pill */}
      <div style={{
        position: 'fixed',
        top: scrolled ? 14 : 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 900,
        width: scrolled ? 'min(820px, calc(100% - 32px))' : 'min(960px, calc(100% - 48px))',
        transition: 'top 0.45s cubic-bezier(0.16,1,0.3,1), width 0.45s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: 'none',
      }}>
        <motion.nav
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            padding: scrolled ? '10px 18px 10px 22px' : '13px 22px 13px 26px',
            background: scrolled
              ? 'rgba(6,6,14,0.88)'
              : 'rgba(12,12,24,0.55)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            borderRadius: 999,
            border: '1px solid rgba(255,254,255,0.1)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset'
              : '0 4px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset',
            transition: 'padding 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s, box-shadow 0.4s',
          }}
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {/* Logo */}
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img
              src="/assets/Asset 4Logo_Word.svg"
              alt="Gurezma Studio"
              style={{
                height: scrolled ? 28 : 32,
                width: 'auto',
                display: 'block',
                transition: 'height 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          </a>

          {/* Desktop links */}
          <ul style={{ display: 'flex', gap: 28, marginLeft: 'auto', listStyle: 'none' }}
              className="nav-desktop-links">
            {links.map(l => (
              <li key={l.label}>
                <a href={l.href} style={{
                  fontFamily: 'var(--font-ui)', fontSize: '.85rem', fontWeight: 500,
                  color: 'rgba(255,254,255,.6)', textDecoration: 'none',
                  transition: 'color .25s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#FFFEFF'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,254,255,.6)'}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <MagneticBtn href="#contact" className="nav-cta-btn">
            Start a Project
          </MagneticBtn>

          {/* Hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
            className="hamburger-btn"
            style={{
              display: 'none', flexDirection: 'column', gap: 5, padding: 6,
              cursor: 'pointer', marginLeft: 'auto', background: 'none', border: 'none',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2,
                background: '#FFFEFF', borderRadius: 2,
                transition: 'transform .3s, opacity .3s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7px) rotate(45deg)'
                    : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </motion.nav>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 850,
              background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(30px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 40, textAlign: 'center', listStyle: 'none' }}>
              {links.map((l, i) => (
                <motion.li key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a href={l.href} onClick={closeMenu}
                    style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', letterSpacing: '.08em', color: 'rgba(255,254,255,.7)', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF7A2A'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,254,255,.7)'}
                  >{l.label}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-cta-btn { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

// ── Magnetic CTA button ───────────────────────────────────────────────────────
function MagneticBtn({ href, children, className }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.28)
    y.set((e.clientY - r.top - r.height / 2) * 0.28)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '8px 20px', borderRadius: 50,
        background: 'rgba(255,122,42,0.12)',
        border: '1.5px solid rgba(255,122,42,0.45)',
        fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '.83rem',
        color: '#FF7A2A', letterSpacing: '.04em',
        whiteSpace: 'nowrap',
        transition: 'background .25s, border-color .25s, color .25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#FF7A2A'
        e.currentTarget.style.borderColor = '#FF7A2A'
        e.currentTarget.style.color = '#fff'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,122,42,0.12)'
        e.currentTarget.style.borderColor = 'rgba(255,122,42,0.45)'
        e.currentTarget.style.color = '#FF7A2A'
      }}
      >{children}</span>
    </motion.a>
  )
}

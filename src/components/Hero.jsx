import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'
import { heroChar, stagger, fadeUp, VIEWPORT } from '../utils/animations'

const TITLE_1 = 'GUREZMA'
const TITLE_2 = 'STUDIO'

// Animated counter hook
function useCounter(target, duration = 1800) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)
  const rafRef   = useRef(null)
  const triggered = useRef(false)

  const trigger = () => {
    if (triggered.current) return
    triggered.current = true
    startRef.current = null
    const tick = (now) => {
      if (!startRef.current) startRef.current = now
      const p = Math.min((now - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }
  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])
  return [value, trigger]
}

function StatItem({ target, suffix, label }) {
  const [val, trigger] = useCounter(target)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) trigger() }, { threshold: .5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [trigger])

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '0 28px' }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '2rem', lineHeight: 1 }}>
        {val}<span style={{ color: '#FF7A2A', fontSize: '1.4rem' }}>{suffix}</span>
      </span>
      <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '.7rem', color: 'rgba(255,254,255,.5)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: 4 }}>
        {label}
      </span>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', minHeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#000' }}>

      {/* === Animated canvas background === */}
      <ParticleCanvas />

      {/* === Ambient glow orbs (CSS, GPU-accelerated) === */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(14,84,255,.12) 0%, transparent 70%)', top: '-10%', left: '-15%', animation: 'orbFloat1 22s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,122,42,.08) 0%, transparent 70%)', bottom: '5%', right: '-10%', animation: 'orbFloat2 28s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(14,84,255,.07) 0%, transparent 70%)', top: '40%', right: '20%', animation: 'orbFloat3 18s ease-in-out infinite' }} />
      </div>

      {/* === Hero Content === */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px', maxWidth: 1000 }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, ease: [0.16,1,.3,1], delay: .3 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'var(--font-ui)', fontSize: '.78rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,254,255,.55)', marginBottom: 28 }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF7A2A', animation: 'pulseDot 2s infinite' }} />
          Video Editing &nbsp;·&nbsp; Motion Graphics &nbsp;·&nbsp; Graphic Design
        </motion.div>

        {/* Title — character stagger */}
        <div style={{ perspective: 800 }}>
          {/* Line 1 */}
          <motion.div
            variants={stagger(0.04, 0.5)}
            initial="hidden" animate="visible"
            style={{ display: 'flex', justifyContent: 'center', gap: '0.02em', fontFamily: 'var(--font-display)', fontSize: 'clamp(4.5rem,13vw,12rem)', lineHeight: .9, letterSpacing: '-.01em' }}
          >
            {Array.from(TITLE_1).map((ch, i) => (
              <motion.span key={i} variants={heroChar} style={{ display: 'inline-block' }}>{ch}</motion.span>
            ))}
          </motion.div>

          {/* Line 2 — orange */}
          <motion.div
            variants={stagger(0.04, 0.72)}
            initial="hidden" animate="visible"
            style={{ display: 'flex', justifyContent: 'center', gap: '0.02em', fontFamily: 'var(--font-display)', fontSize: 'clamp(4.5rem,13vw,12rem)', lineHeight: .9, letterSpacing: '-.01em', color: '#FF7A2A' }}
          >
            {Array.from(TITLE_2).map((ch, i) => (
              <motion.span key={i} variants={heroChar} style={{ display: 'inline-block' }}>{ch}</motion.span>
            ))}
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8, ease: [0.16,1,.3,1], delay: 1.15 }}
          style={{ marginTop: 32, fontSize: 'clamp(1rem,2vw,1.25rem)', color: 'rgba(255,254,255,.6)', lineHeight: 1.7, fontWeight: 300 }}
        >
          Editing. Motion. Design. &nbsp;<em style={{ color: '#FFFEFF', fontStyle: 'normal', fontWeight: 400 }}>One frame at a time.</em>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8, ease: [0.16,1,.3,1], delay: 1.35 }}
          style={{ marginTop: 44, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <MagBtn href="#work" primary>▶ Watch Reel</MagBtn>
          <MagBtn href="#work">View Work</MagBtn>
        </motion.div>
      </div>

      {/* === Stats bar === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8, ease: [0.16,1,.3,1], delay: 1.6 }}
        style={{
          position: 'absolute', bottom: 72, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center',
          background: 'rgba(255,254,255,.04)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,254,255,.09)', borderRadius: 50,
          padding: '16px 0', whiteSpace: 'nowrap', zIndex: 2,
        }}
      >
        <StatItem target={50} suffix="+" label="Projects Delivered" />
        <div style={{ width: 1, height: 36, background: 'rgba(255,254,255,.12)' }} />
        <StatItem target={8} suffix="+" label="Happy Clients" />
        <div style={{ width: 1, height: 36, background: 'rgba(255,254,255,.12)' }} />
        <StatItem target={1.5} suffix="" label="Years of Craft" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: 'rgba(255,254,255,.4)', fontFamily: 'var(--font-ui)', fontSize: '.68rem', letterSpacing: '.15em', textTransform: 'uppercase', zIndex: 2, textDecoration: 'none' }}
      >
        Scroll
        <span style={{ width: 20, height: 20, borderRight: '1.5px solid currentColor', borderBottom: '1.5px solid currentColor', transform: 'rotate(45deg)', animation: 'scrollBounce 2s infinite' }} />
      </motion.a>

      {/* Keyframe styles */}
      <style>{`
        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0)scale(1)} 33%{transform:translate(80px,-60px)scale(1.1)} 66%{transform:translate(-40px,50px)scale(.95)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)scale(1)} 40%{transform:translate(-70px,50px)scale(1.08)} 70%{transform:translate(50px,-40px)scale(.93)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-60px)} }
        @keyframes pulseDot  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.6)} }
        @keyframes scrollBounce { 0%,100%{transform:rotate(45deg) translateY(0);opacity:1} 50%{transform:rotate(45deg) translateY(5px);opacity:.4} }
        @media(max-width:600px){
          #hero .stat-row { flex-direction:column; gap:8px; border-radius:16px; padding:20px 24px; }
        }
      `}</style>
    </section>
  )
}

// Magnetic button
function MagBtn({ href, children, primary }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15 })
  const sy = useSpring(y, { stiffness: 150, damping: 15 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * .3)
    y.set((e.clientY - r.top - r.height / 2) * .3)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return (
    <motion.a
      href={href} style={{ x: sx, y: sy, textDecoration: 'none' }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      whileHover={{ scale: 1.05 }} whileTap={{ scale: .97 }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '14px 32px', borderRadius: 50,
        fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '.95rem', letterSpacing: '.04em',
        background: primary ? '#FF7A2A' : 'transparent',
        color: '#FFFEFF',
        border: primary ? 'none' : '1.5px solid rgba(255,254,255,.25)',
        boxShadow: primary ? '0 0 32px rgba(255,122,42,.35)' : 'none',
        transition: 'box-shadow .3s',
      }}>{children}</span>
    </motion.a>
  )
}

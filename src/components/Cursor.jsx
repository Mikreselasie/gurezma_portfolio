import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX  = useSpring(cursorX, { stiffness: 80, damping: 18 })
  const trailY  = useSpring(cursorY, { stiffness: 80, damping: 18 })
  const isHover = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return

    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const addHover = () => isHover.current = true
    const removeHover = () => isHover.current = false

    window.addEventListener('mousemove', move, { passive: true })

    const hoverEls = document.querySelectorAll(
      'a, button, .card-hover, .filter-btn, .tool-badge, .social-btn'
    )
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          width: 9,
          height: 9,
          background: '#FFFEFF',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
      {/* Trail ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: trailX,
          top: trailY,
          width: 36,
          height: 36,
          border: '1.5px solid #FF7A2A',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: 0.65,
        }}
      />
    </>
  )
}

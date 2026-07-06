import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 85
const CONNECTION_DIST = 140
const REPEL_RADIUS    = 110
const SPEED           = 0.28

class Particle {
  constructor(w, h) {
    this.w = w; this.h = h
    this.reset()
  }
  reset() {
    this.x  = Math.random() * this.w
    this.y  = Math.random() * this.h
    this.vx = (Math.random() - .5) * SPEED
    this.vy = (Math.random() - .5) * SPEED
    this.size       = Math.random() * 1.8 + .4
    this.isOrange   = Math.random() < .16
    this.baseOpacity = Math.random() * .5 + .15
    this.pulseSpeed = Math.random() * .018 + .008
    this.pulseOff   = Math.random() * Math.PI * 2
    this.currentOpacity = this.baseOpacity
  }
  update(time, mx, my) {
    this.x += this.vx
    this.y += this.vy
    // wrap
    if (this.x < -10) this.x = this.w + 10
    if (this.x > this.w + 10) this.x = -10
    if (this.y < -10) this.y = this.h + 10
    if (this.y > this.h + 10) this.y = -10
    // mouse repulsion
    const dx = this.x - mx, dy = this.y - my
    const d2 = dx * dx + dy * dy
    if (d2 < REPEL_RADIUS * REPEL_RADIUS) {
      const d = Math.sqrt(d2)
      const force = (REPEL_RADIUS - d) / REPEL_RADIUS
      this.x += (dx / d) * force * 2.5
      this.y += (dy / d) * force * 2.5
    }
    // pulse
    this.currentOpacity = this.baseOpacity + Math.sin(time * this.pulseSpeed + this.pulseOff) * .12
  }
  draw(ctx) {
    const rgb = this.isOrange ? '255,122,42' : '14,84,255'
    ctx.save()
    ctx.shadowBlur  = this.isOrange ? 14 : 10
    ctx.shadowColor = this.isOrange ? 'rgba(255,100,0,.9)' : 'rgba(14,84,255,.9)'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${rgb},${Math.max(0, this.currentOpacity)})`
    ctx.fill()
    ctx.restore()
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -500, y: -500 })
  const rafRef    = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let particles = [], w = 0, h = 0

    function init() {
      w = canvas.width  = window.innerWidth
      h = canvas.height = window.innerHeight
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(w, h))
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = dx * dx + dy * dy
          if (d < CONNECTION_DIST * CONNECTION_DIST) {
            const alpha = (1 - Math.sqrt(d) / CONNECTION_DIST) * .2
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(14,84,255,${alpha})`
            ctx.lineWidth   = .7
            ctx.stroke()
          }
        }
      }
    }

    function frame(time) {
      ctx.clearRect(0, 0, w, h)
      drawConnections()
      particles.forEach(p => { p.update(time, mouseRef.current.x, mouseRef.current.y); p.draw(ctx) })
      rafRef.current = requestAnimationFrame(frame)
    }

    const onMouse  = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onResize = () => init()

    init()
    rafRef.current = requestAnimationFrame(frame)
    window.addEventListener('mousemove', onMouse,  { passive: true })
    window.addEventListener('resize',   onResize,  { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize',   onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, fadeLeft, stagger, EASE_EXPO, VIEWPORT } from '../utils/animations'
import { X } from 'lucide-react'

const filters = ['all', 'video', 'motion', 'design']

const projects = [
  { id: 1, cat: 'video',  title: 'Brand Commercial',        tag: 'Video Editing',   desc: 'YouTube Financial Advice Video.', youtubeId: 'BHH_0E9ikHY', img: 'https://img.youtube.com/vi/BHH_0E9ikHY/maxresdefault.jpg' },
  { id: 8, cat: 'video', title: 'Voxide AI — Product Launch', tag: 'Video Editing', desc: 'Product launch video for Voxide AI — SaaS product launch.', youtubeId: 'gc0b-zi2JUk', img: 'https://img.youtube.com/vi/gc0b-zi2JUk/maxresdefault.jpg' },
  { id: 9, cat: 'video', title: 'Talkhead video (Competition)', tag: 'Video Editing', desc: 'Instagram Reel (before and after)', instaId: 'DcIngigTxcW', grad: 'linear-gradient(135deg,#0d0d0d 0%,#833ab4 50%,#fd1d1d 100%)', gradLabel: 'INSTAGRAM REEL'},
  { id: 3, cat: 'design', title: 'Brand Identity',          tag: 'Graphic Design',  desc: 'Full visual identity — logo, typography, color system, brand guidelines.', img: '/assets/Branding-Gibi.png' },
  { id: 11, cat: 'design', title: 'Chiko — Energy Bar Branding', tag: 'Graphic Design', desc: 'Brand identity for Chiko, an energy bar brand.', img: '/assets/chiko.png' },
  { id: 4, cat: 'video',  title: 'Social Media Reel',       tag: 'Video Editing',   desc: 'Short form video for event organizer promotion.', instaId: 'DZpzyDio9zk', grad: 'linear-gradient(135deg,#0d0d0d 0%,#833ab4 50%,#fd1d1d 100%)', gradLabel: 'INSTAGRAM REEL' },
  { id: 5, cat: 'motion', title: 'Explainer Animation',     tag: 'Motion Graphics', desc: '30 second animated explainer for a SaaS product , UI mockups.', youtubeId: 'OiJyEDjO5ZA', img: 'https://img.youtube.com/vi/OiJyEDjO5ZA/maxresdefault.jpg' },
  { id: 5, cat: 'motion', title: 'Explainer Animation',     tag: 'Motion Graphics', desc: 'IDEEZA Chat bar UI Animation.', youtubeId: 'if6wlb8NmsE', img: 'https://img.youtube.com/vi/if6wlb8NmsE/maxresdefault.jpg' },
  { id: 5, cat: 'motion', title: 'Explainer Animation',     tag: 'Motion Graphics', desc: 'Exit Plan SaaS Explainer Video.', youtubeId: 'dGnAFPUuZOY', img: 'https://img.youtube.com/vi/dGnAFPUuZOY/maxresdefault.jpg' },
  { id: 6, cat: 'design', title: 'Documentary Poster Series',tag: 'Graphic Design', desc: 'Poster Design for graphics design and video editing Tutorial', img: '/assets/Poster GG.png' },
  { id: 7, cat: 'video', title: 'Featured YouTube Video', tag: 'Video Editing', desc: 'Finance youtube video for a client', youtubeId: 'FSvvo2gz_7o', img: 'https://img.youtube.com/vi/FSvvo2gz_7o/maxresdefault.jpg' },
  { id: 10, cat: 'motion', title: 'ብፁዕ ብእሲ — Logo Animation', tag: 'Motion Graphics', desc: 'Logo animation for the ብፁዕ ብእሲ religious YouTube channel.', youtubeId: 'epvpuz4Ht8E', img: 'https://img.youtube.com/vi/epvpuz4Ht8E/maxresdefault.jpg' },
]

const tagColor = { 'Video Editing': '#0E54FF', 'Motion Graphics': '#FF7A2A', 'Graphic Design': '#0E54FF' }

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [instaThumbs, setInstaThumbs] = useState({})
  
  const visible = active === 'all' ? projects : projects.filter(p => p.cat === active)

  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => document.body.style.overflow = ''
  }, [selectedProject]);

  // Listen for voxide external filter events
  useEffect(() => {
    const handleFilter = (e) => {
      const cat = e.detail?.category;
      if (filters.includes(cat)) {
        setActive(cat);
      }
    };
    window.addEventListener('voxide:filter-portfolio', handleFilter);
    return () => window.removeEventListener('voxide:filter-portfolio', handleFilter);
  }, []);

  // Attempt to fetch Instagram oEmbed thumbnails for projects that have an instaId but no img
  useEffect(() => {
    const fetchThumb = async (id) => {
      try {
        const url = `https://api.instagram.com/oembed/?url=https://www.instagram.com/reel/${id}/`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.thumbnail_url) {
          setInstaThumbs(prev => ({ ...prev, [id]: data.thumbnail_url }));
        }
      } catch (e) {
        // ignore failures (CORS or rate limits) — thumbnails may still be provided server-side later
      }
    }

    projects.forEach(p => {
      if (p.instaId && !p.img && !instaThumbs[p.instaId]) {
        fetchThumb(p.instaId);
      }
    })
  }, [instaThumbs])


  return (
    <section id="work" style={{ padding: 'var(--section-pad) 0', background: '#000' }}>
      <div className="container">

        <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-label">
          <span>02</span> Selected Work
        </motion.div>

        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          Stories we've <span style={{ color: '#FF7A2A' }}>told</span>
        </motion.h2>

        {/* Filter tabs */}
        <motion.div variants={stagger(.06)} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
          {filters.map(f => (
            <motion.button
              key={f} variants={fadeUp}
              onClick={() => setActive(f)}
              className="filter-btn"
              style={{
                fontFamily: 'var(--font-ui)', fontSize: '.85rem', fontWeight: 600,
                padding: '10px 22px', borderRadius: 50, cursor: 'pointer',
                transition: 'all .3s ease',
                background: active === f ? '#0E54FF' : 'transparent',
                color: active === f ? '#FFFEFF' : 'rgba(255,254,255,.55)',
                border: active === f ? '1.5px solid #0E54FF' : '1.5px solid rgba(255,254,255,.12)',
                boxShadow: active === f ? '0 0 22px rgba(14,84,255,.35)' : 'none',
              }}
            >
              {f === 'all' ? 'All' : f === 'video' ? 'Video Editing' : f === 'motion' ? 'Motion Graphics' : 'Graphic Design'}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          <AnimatePresence mode="popLayout">
            {visible.map(p => {
              const imgSrc = p.img || (p.instaId ? instaThumbs[p.instaId] : null)
              return (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: .9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .85 }}
                transition={{ duration: .45, ease: EASE_EXPO }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(p)}
                style={{ borderRadius: 14, overflow: 'hidden', background: 'rgba(255,254,255,.03)', border: '1px solid rgba(255,254,255,.07)', cursor: 'pointer' }}
                className="card-hover"
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                  {imgSrc ? (
                    <motion.img
                      src={imgSrc} alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: .6 }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: p.grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '.2em', color: 'rgba(255,254,255,.12)' }}>{p.gradLabel}</span>
                    </div>
                  )}
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: .3 }}
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.3) 60%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}
                  >
                    <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,122,42,.9)', display: 'grid', placeItems: 'center', fontSize: '1rem', color: '#fff', marginTop: 'auto' }}>
                      {p.cat === 'design' ? '🔍' : '▶'}
                    </div>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '.7rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#FF7A2A', marginBottom: 4 }}>{p.tag}</span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '.04em' }}>{p.title}</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Card info */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,254,255,.05)' }}>
                  <span style={{ display: 'inline-block', fontFamily: 'var(--font-ui)', fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: tagColor[p.tag], marginBottom: 6 }}>{p.tag}</span>
                  <p style={{ fontSize: '.85rem', color: 'rgba(255,254,255,.55)', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </motion.article>
            )})}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '20px', overflowY: 'auto'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ ease: EASE_EXPO, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside the modal
              style={{
                position: 'relative', width: '100%', maxWidth: '1000px',
                background: '#0a0a0a', border: '1px solid rgba(255,254,255,.1)',
                borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,.6)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute', top: 16, right: 16, zIndex: 20,
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,.2)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'background .2s, transform .2s',
                  backdropFilter: 'blur(4px)'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FF7A2A'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <X size={20} />
              </button>

              {/* Modal Media Content */}
              <div style={{ width: '100%', background: '#000', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                {selectedProject.youtubeId ? (
                  <div style={{ width: '100%', aspectRatio: '16/9' }}>
                    <iframe 
                      width="100%" height="100%" 
                      src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1`} 
                      title={selectedProject.title} frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : selectedProject.instaId ? (
                  <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <iframe
                      src={`https://www.instagram.com/p/${selectedProject.instaId}/embed`}
                      width="100%" height="600px" frameBorder="0" scrolling="no" allowTransparency="true"
                      style={{ background: '#fff' }}
                    ></iframe>
                  </div>
                ) : (() => {
                  const selectedImg = selectedProject.img || (selectedProject.instaId ? instaThumbs[selectedProject.instaId] : null)
                  return selectedImg ? (
                    <div style={{ width: '100%', maxHeight: '70vh', display: 'flex', justifyContent: 'center' }}>
                      <img src={selectedImg} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '16/9', background: selectedProject.grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', letterSpacing: '.2em', color: 'rgba(255,254,255,.12)' }}>{selectedProject.gradLabel}</span>
                    </div>
                  )
                })()
                }
              </div>

              {/* Modal Info Section */}
              <div style={{ padding: '32px 40px' }}>
                <span style={{ display: 'inline-block', fontFamily: 'var(--font-ui)', fontSize: '.8rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: tagColor[selectedProject.tag], marginBottom: 12 }}>{selectedProject.tag}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', letterSpacing: '.02em', marginBottom: 16 }}>{selectedProject.title}</h3>
                <p style={{ fontSize: '1rem', color: 'rgba(255,254,255,.7)', lineHeight: 1.7, maxWidth: '850px' }}>{selectedProject.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:900px) { #work .portfolio-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:600px) { #work .portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

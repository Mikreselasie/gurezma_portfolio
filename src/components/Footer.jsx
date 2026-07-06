export default function Footer() {
  return (
    <footer style={{ background: '#000', borderTop: '1px solid rgba(255,254,255,.07)', padding: '56px 0 36px' }}>
      <div className="container">

        {/* Top row — logo + tagline + links */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', marginBottom: 48 }} className="footer-inner">

          {/* Brand block */}
          <div className="footer-brand" style={{ maxWidth: 320 }}>
            <a href="#hero" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginBottom: 14 }}>
              <img
                src="/assets/Asset 4Logo_Word.svg"
                alt="Gurezma Studio"
                style={{ height: 30, width: 'auto', display: 'block' }}
              />
            </a>
            <p style={{ fontSize: '.82rem', color: 'rgba(255,254,255,.45)', fontFamily: 'var(--font-ui)', lineHeight: 1.7, margin: 0 }}>
              A multidisciplinary creative studio helping brands and creators communicate through compelling visual storytelling — motion, design, and strategic creativity.
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', paddingTop: 4 }} className="footer-links">
            {['About', 'Work', 'Services', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{ fontFamily: 'var(--font-ui)', fontSize: '.85rem', color: 'rgba(255,254,255,.55)', textDecoration: 'none', transition: 'color .3s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#FF7A2A'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,254,255,.55)'}
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,254,255,.06)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }} className="footer-bottom">
          <p style={{ fontSize: '.76rem', color: 'rgba(255,254,255,.28)', fontFamily: 'var(--font-ui)', margin: 0 }}>
            © {new Date().getFullYear()} Gurezma Studio. All rights reserved.
          </p>
          <p style={{ fontSize: '.76rem', color: 'rgba(255,254,255,.22)', fontFamily: 'var(--font-ui)', margin: 0, textAlign: 'right' }}>
            Motion · Design · Strategy
          </p>
        </div>

      </div>
      <style>{`
        @media(max-width:768px) {
          .footer-inner { flex-direction: column !important; gap: 28px !important; }
          .footer-links { gap: 16px !important; }
          .footer-bottom { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  )
}

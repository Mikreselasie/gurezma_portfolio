import { useEffect } from 'react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  // Smooth scroll behavior
  useEffect(() => {
    const handleNav = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      
      const id = target.getAttribute('href')
      if (id === '#') return
      
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        const y = el.getBoundingClientRect().top + window.scrollY - 80 // offset for navbar
        window.scrollTo({ top: y, behavior: 'smooth' })
        
        // update history without jumping
        window.history.pushState(null, '', id)
      }
    }

    document.addEventListener('click', handleNav)
    return () => document.removeEventListener('click', handleNav)
  }, [])

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Process />
        <Testimonials />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App

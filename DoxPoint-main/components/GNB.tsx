'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const NAV_ITEMS = [
  { label: 'COACHING', href: '#coaching', type: 'scroll' },
  { label: 'FAQ', href: '#faq', type: 'scroll' },
]

export default function GNB() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const lastScrollY = useRef(0)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    setMobileOpen(false)
    if (item.type === 'scroll') {
      const target = item.href === '#coaching' ? '#classes' : item.href
      if (pathname !== '/') {
        router.push('/' + target)
      } else {
        const el = document.querySelector(target)
        if (el) {
          const offset = target === '#faq' ? -10 : 100
          const top = el.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    } else if (item.type === 'link') {
      router.push(item.href)
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(0,102,255,0.15)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link href="/" className="relative group flex items-center">
              <Image src="/logo/logologo.png" alt="DOX.POINT" height={42} width={208} style={{ height: '42px', width: 'auto' }} />
              {/* Animated underline */}
              <span className="absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-[#0066ff] to-transparent w-0 group-hover:w-full transition-all duration-500" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => setActiveItem(item.label)}
                  onMouseLeave={() => setActiveItem(null)}
                  className="typo-button relative px-4 py-2 text-white/60 hover:text-white transition-colors duration-300 group"
                >
                  {activeItem === item.label && (
                    <motion.span
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-white/[0.05] rounded"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-[#0066ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}

              {/* CTA Button */}
              <a
                href="/contact"
                className="typo-button relative ml-3 inline-flex items-center gap-2 px-5 py-2 text-white bg-[#0066ff] hover:bg-[#0052cc] active:scale-[0.98] transition-all duration-300"
                style={{
                  clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)',
                  boxShadow: '0 0 20px rgba(0,102,255,0.3)',
                }}
              >
                코칭 신청 & Contact
              </a>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] group"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="메뉴 열기"
            >
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0 -translate-x-2' : ''}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0c12]/95 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-grid-pattern bg-grid-40 opacity-30" />

            {/* Accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066ff] to-transparent" />

            <nav className="relative flex flex-col items-center gap-2 w-full px-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-xs"
                >
                  <button
                    onClick={() => handleNavClick(item)}
                    className="w-full py-5 text-2xl font-black tracking-widest text-white/70 hover:text-white border-b border-white/[0.06] flex items-center justify-between group transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-[#0066ff] opacity-0 group-hover:opacity-100 transition-opacity text-base">→</span>
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-12"
            >
              <a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="typo-button px-8 py-4 bg-[#0066ff] text-white hover:bg-[#0052cc] transition-colors"
                style={{ clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)' }}
              >
                코칭 신청 & Contact
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import LanguageSelector from './LanguageSelector'
import { classNames } from '@/utils/helpers'

const navItems = [
  { to: '/chambres-suites', key: 'rooms' },
  { to: '/restaurant', key: 'restaurant' },
  { to: '/piscine-bien-etre', key: 'spa' },
  { to: '/reunions-evenements', key: 'events' },
  { to: '/decouvrir-antsirabe', key: 'discover' },
]

export default function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Overlay the page hero until the visitor starts scrolling.
  const transparent = !scrolled && !mobileOpen
  const textColor = transparent ? 'text-white' : 'text-charcoal'
  // Couleur de survol plus visible : doré clair sur fond transparent, doré foncé sur fond blanc
  const hoverColor = transparent ? 'hover:text-gold-300' : 'hover:text-gold-600'

  return (
    <header
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        transparent ? 'bg-transparent py-6' : 'bg-white/95 backdrop-blur-sm shadow-sm py-3'
      )}
    >
      <div className="container-luxe flex items-center justify-between gap-4">
        {/* Logo : version claire sur hero transparent, version foncée une fois scrollé */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={transparent ? '/images/logo.png' : '/images/logo-dark.png'}
            alt="La Colongette Antsirabe"
            className="h-14 md:h-20 w-auto object-contain transition-opacity duration-300"
          />
        </Link>

        {/* Desktop nav */}
        <nav className={classNames('hidden lg:flex items-center gap-5 text-[11px] tracking-wider uppercase font-medium', textColor)}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                classNames(
                  'relative pb-1 text-center leading-tight transition-colors duration-200',
                  hoverColor,
                  isActive && 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gold-500'
                )
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        {/* Right controls */}
        <div className="hidden lg:flex items-center gap-6">
          <LanguageSelector light={transparent} />
          <Link to="/contact#booking" className="btn-gold !py-3 !px-6">
            {t('common.bookNow')}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={classNames('lg:hidden p-2', textColor)}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-xl mt-2 mx-4 rounded-lg overflow-hidden animate-fade-in">
          <nav className="flex flex-col divide-y divide-gray-100 text-charcoal">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="px-6 py-4 text-sm tracking-wide uppercase hover:bg-cream hover:text-gold-600 transition-colors duration-200"
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <NavLink to="/contact" className="px-6 py-4 text-sm tracking-wide uppercase hover:bg-cream hover:text-gold-600 transition-colors duration-200">
              {t('nav.contact')}
            </NavLink>
          </nav>
          <div className="flex items-center justify-between px-6 py-4 bg-cream">
            <LanguageSelector />
            <Link to="/contact#booking" className="btn-gold !py-2.5 !px-5 text-xs">
              {t('common.bookNow')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BedDouble, CalendarCheck2, Flower2, Images, LayoutDashboard, LogOut, Mail, MapPinned,
  CalendarRange, Menu as MenuIcon, Sunrise, ScrollText, Send, ShieldCheck, UserCircle, UsersRound,
  Utensils, X,
} from 'lucide-react'
import { adminApi, AdminUser } from '@/utils/api'
import Overview from '@/components/admin/Overview'
import ResourceManager from '@/components/admin/ResourceManager'
import { resources } from '@/components/admin/resources'
import BookingsPanel from '@/components/admin/BookingsPanel'
import AvailabilityPanel from '@/components/admin/AvailabilityPanel'
import DayPanel from '@/components/admin/DayPanel'
import MessagesPanel from '@/components/admin/MessagesPanel'
import SubscribersPanel from '@/components/admin/SubscribersPanel'
import UsersPanel from '@/components/admin/UsersPanel'
import { AccountPanel, AuditPanel } from '@/components/admin/AccountPanel'

type Section =
  | 'overview' | 'day' | 'bookings' | 'availability' | 'room-blocks' | 'contact-messages' | 'subscribers'
  | 'rooms' | 'menu-sections' | 'menu-items' | 'event-rooms' | 'spa' | 'gallery' | 'discover'
  | 'users' | 'audit' | 'account'

interface NavItem {
  key: Section
  label: string
  icon: typeof BedDouble
  /** Réservé au rôle administrateur. */
  adminOnly?: boolean
}

const NAV_GROUPS: Array<{ title: string; items: NavItem[] }> = [
  {
    title: 'Pilotage',
    items: [
      { key: 'overview', label: 'Vue d’ensemble', icon: LayoutDashboard },
      { key: 'day', label: 'Journée', icon: Sunrise },
      { key: 'bookings', label: 'Réservations', icon: CalendarCheck2 },
      { key: 'availability', label: 'Disponibilité', icon: CalendarRange },
      { key: 'room-blocks', label: 'Périodes bloquées', icon: CalendarRange },
      { key: 'contact-messages', label: 'Messages', icon: Mail },
      { key: 'subscribers', label: 'Newsletter', icon: Send },
    ],
  },
  {
    title: 'Contenu du site',
    items: [
      { key: 'rooms', label: 'Chambres', icon: BedDouble },
      { key: 'menu-sections', label: 'Carte — sections', icon: Utensils },
      { key: 'menu-items', label: 'Carte — plats', icon: Utensils },
      { key: 'spa', label: 'Spa', icon: Flower2 },
      { key: 'event-rooms', label: 'Salles de réunion', icon: UsersRound },
      { key: 'gallery', label: 'Galerie photo', icon: Images },
      { key: 'discover', label: 'Découvrir', icon: MapPinned },
    ],
  },
  {
    title: 'Administration',
    items: [
      { key: 'account', label: 'Mon compte', icon: UserCircle },
      { key: 'users', label: 'Comptes', icon: ShieldCheck, adminOnly: true },
      { key: 'audit', label: 'Journal', icon: ScrollText, adminOnly: true },
    ],
  },
]

const TITLES: Record<Section, string> = {
  overview: 'Vue d’ensemble',
  day: 'La journée à la réception',
  bookings: 'Réservations',
  availability: 'Disponibilité des chambres',
  'room-blocks': 'Périodes bloquées',
  'contact-messages': 'Messages',
  subscribers: 'Abonnés à la newsletter',
  rooms: 'Chambres',
  'menu-sections': 'Carte — sections',
  'menu-items': 'Carte — plats et boissons',
  'event-rooms': 'Salles de réunion',
  spa: 'Soins du spa',
  gallery: 'Galerie photo',
  discover: 'Page « Découvrir »',
  users: 'Comptes d’administration',
  audit: 'Journal des actions',
  account: 'Mon compte',
}

const STORAGE_KEY = 'royal-admin-section'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [active, setActive] = useState<Section>(
    () => (localStorage.getItem(STORAGE_KEY) as Section) || 'overview',
  )
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('royal-admin-token')) {
      navigate('/admin/login', { replace: true })
      return
    }
    adminApi.me().then((response) => {
      if (response.error || !response.data) {
        localStorage.removeItem('royal-admin-token')
        navigate('/admin/login', { replace: true })
      } else {
        setUser(response.data.user)
      }
      setCheckingAuth(false)
    })
  }, [navigate])

  useEffect(() => { localStorage.setItem(STORAGE_KEY, active) }, [active])

  const isAdmin = user?.role === 'admin'

  // Une section réservée reste inaccessible au personnel, même via le stockage local.
  useEffect(() => {
    const restricted = NAV_GROUPS.flatMap((group) => group.items)
      .filter((item) => item.adminOnly).map((item) => item.key)
    if (user && !isAdmin && restricted.includes(active)) setActive('overview')
  }, [user, isAdmin, active])

  function logout() {
    localStorage.removeItem('royal-admin-token')
    navigate('/admin/login', { replace: true })
  }

  function go(section: string) {
    setActive(section as Section)
    setMobileNavOpen(false)
  }

  const content = useMemo(() => {
    if (resources[active]) return <ResourceManager key={active} spec={resources[active]} />
    switch (active) {
      case 'overview': return <Overview onOpenSection={go} />
      case 'day': return <DayPanel />
      case 'bookings': return <BookingsPanel />
      case 'availability': return <AvailabilityPanel />
      case 'contact-messages': return <MessagesPanel />
      case 'subscribers': return <SubscribersPanel />
      case 'users': return <UsersPanel currentUser={user} />
      case 'audit': return <AuditPanel />
      case 'account': return <AccountPanel currentUser={user} />
      default: return null
    }
  }, [active, user])

  const sidebar = (
    <>
      <div className="border-b border-gray-200 px-6 py-6">
        <img src="/images/logo-dark.png" alt="La Colongette Antsirabe"
          className="h-14 max-w-full object-contain object-left" />
        <h1 className="mt-3 font-serif text-xl text-charcoal">Administration</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4" aria-label="Navigation d’administration">
        {NAV_GROUPS.map((group) => {
          const items = group.items.filter((item) => !item.adminOnly || isAdmin)
          if (items.length === 0) return null
          return (
            <div key={group.title} className="mb-4">
              <p className="px-6 pb-2 text-xs uppercase tracking-wider text-gray-400">{group.title}</p>
              <div className="space-y-0.5">
                {items.map((item) => {
                  const Icon = item.icon
                  const current = active === item.key
                  return (
                    <button key={item.key} onClick={() => go(item.key)}
                      aria-current={current ? 'page' : undefined}
                      className={`flex w-full items-center gap-3 border-l-4 px-4 py-2.5 text-left text-sm transition-colors ${
                        current
                          ? 'border-gold-300 bg-gold-500 text-white'
                          : 'border-transparent text-gray-700 hover:bg-gray-100 hover:text-charcoal'
                      }`}>
                      <Icon size={17} aria-hidden="true" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        {user && (
          <p className="px-4 pb-2 text-xs text-gray-500">
            {user.name || user.email}
            <span className="block text-gray-400">
              {user.role === 'admin' ? 'Administrateur' : 'Personnel'}
            </span>
          </p>
        )}
        <button onClick={logout}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-charcoal">
          <LogOut size={17} aria-hidden="true" />
          <span>Se déconnecter</span>
        </button>
      </div>
    </>
  )

  if (checkingAuth) {
    return <main className="grid min-h-screen place-items-center text-gray-600">Vérification de la session…</main>
  }
  if (!user) return null

  return (
    <main className="min-h-screen bg-gray-50 text-charcoal">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
        {sidebar}
      </aside>

      <header className="sticky top-0 z-20 flex items-center justify-between bg-charcoal px-4 py-3 text-white lg:hidden">
        <div>
          <p className="text-xs uppercase tracking-widest2 text-gold-400">La Colongette Antsirabe</p>
          <h1 className="font-serif text-lg">{TITLES[active]}</h1>
        </div>
        <button onClick={() => setMobileNavOpen(true)} aria-label="Ouvrir la navigation"
          aria-expanded={mobileNavOpen} className="p-2 hover:bg-white/10">
          <MenuIcon size={22} aria-hidden="true" />
        </button>
      </header>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button className="absolute inset-0 bg-black/50" aria-label="Fermer la navigation"
            onClick={() => setMobileNavOpen(false)} />
          <aside className="relative flex h-full w-64 flex-col bg-white shadow-xl">
            <div className="absolute right-3 top-5">
              <button onClick={() => setMobileNavOpen(false)} aria-label="Fermer la navigation"
                className="p-2 text-gray-700 hover:bg-gray-100">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="mx-auto max-w-screen-2xl px-4 py-5 md:px-8 md:py-7 lg:ml-64">
        <h2 className="mb-5 hidden font-serif text-2xl lg:block">{TITLES[active]}</h2>
        {content}
      </div>
    </main>
  )
}

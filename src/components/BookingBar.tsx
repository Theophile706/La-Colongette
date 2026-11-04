import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar, Users, ChevronDown, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useBooking, type SearchOutcome } from '@/hooks/useBooking'
import { toInputDate } from '@/utils/dateHelpers'
import { classNames } from '@/utils/helpers'

interface BookingBarProps {
  floating?: boolean // true = overlapping hero (rounded white card), false = inline/static
}

/**
 * BookingBar
 * ----------
 * Functional date pickers (native <input type="date">) + rooms/guests
 * stepper. Replicates the reference photo's floating white bar with
 * ARRIVÉE / DÉPART / CHAMBRES & VOYAGEURS / CHECK AVAILABILITY layout.
 */
export default function BookingBar({ floating = true }: BookingBarProps) {
  const { t } = useTranslation()
  const {
    state, setCheckIn, setCheckOut, setRooms, setAdults, setChildren, submitSearch, outcome,
  } = useBooking()
  const [guestsOpen, setGuestsOpen] = useState(false)
  const guestsRef = useRef<HTMLDivElement>(null)
  const checkInRef = useRef<HTMLInputElement>(null)
  const checkOutRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) {
        setGuestsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const guestsLabel = `${state.rooms} ${t(state.rooms > 1 ? 'common.rooms' : 'common.room')} · ${state.adults} ${t(
    state.adults > 1 ? 'common.adults' : 'common.adult'
  )}${state.children > 0 ? ` · ${state.children} ${t(state.children > 1 ? 'common.children' : 'common.child')}` : ''}`

  // Classe partagée pour masquer l'icône native du navigateur sur les inputs date,
  // tout en gardant toute la zone cliquable (ouvre le picker au clic n'importe où).
  function openDatePicker(ref: React.RefObject<HTMLInputElement>) {
    const el = ref.current
    if (!el) return
    if (typeof el.showPicker === 'function') {
      try {
        el.showPicker()
      } catch {
        el.focus()
      }
    } else {
      el.focus()
    }
  }

  const dateInputClass =
    'relative text-sm font-medium text-charcoal w-full focus:outline-none bg-transparent ' +
    '[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 ' +
    '[&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full ' +
    '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer'

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={classNames(
          // Bordures pointues (rounded-none) et largeur réduite
          'bg-white flex flex-col lg:flex-row items-stretch w-full max-w-5xl rounded-none',
          floating
            ? 'shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_25px_60px_-8px_rgba(0,0,0,0.45),0_-6px_25px_-10px_rgba(0,0,0,0.2)]'
            : 'shadow-card'
        )}
      >
        {/* Groupe Arrivée / Départ / Chambres & voyageurs, avec traits fins entre chaque bloc */}
        <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-200 relative overflow-visible">
          {/* Check-in */}
          <label
            className="group flex-1 flex items-center gap-3 px-6 py-5 cursor-pointer transition-colors duration-200 hover:bg-cream/60 focus-within:bg-cream/70"
            onClick={() => openDatePicker(checkInRef)}
          >
            <Calendar size={18} className="text-gold-500 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest2 text-gray-400 font-medium mb-0.5">{t('common.checkIn')}</div>
              <input
                ref={checkInRef}
                type="date"
                value={toInputDate(state.checkIn)}
                min={toInputDate(new Date())}
                onChange={(e) => setCheckIn(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className={dateInputClass}
              />
            </div>
            <ChevronDown size={16} className="text-gray-400 shrink-0" />
          </label>

          {/* Check-out */}
          <label
            className="group flex-1 flex items-center gap-3 px-6 py-5 cursor-pointer transition-colors duration-200 hover:bg-cream/60 focus-within:bg-cream/70"
            onClick={() => openDatePicker(checkOutRef)}
          >
            <Calendar size={18} className="text-gold-500 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest2 text-gray-400 font-medium mb-0.5">{t('common.checkOut')}</div>
              <input
                ref={checkOutRef}
                type="date"
                value={toInputDate(state.checkOut)}
                min={toInputDate(state.checkIn || new Date())}
                onChange={(e) => setCheckOut(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className={dateInputClass}
              />
            </div>
            <ChevronDown size={16} className="text-gray-400 shrink-0" />
          </label>

          {/* Rooms & guests */}
          <div ref={guestsRef} className="flex-1 relative z-10">
            <button
              type="button"
              onClick={() => setGuestsOpen((open) => !open)}
              className="group w-full flex items-center gap-3 px-6 py-5 text-left transition-colors duration-200 hover:bg-cream/60"
            >
              <Users size={18} className="text-gold-500 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-widest2 text-gray-400 font-medium mb-0.5">{t('common.roomsGuests')}</div>
                <div className="text-sm font-medium text-charcoal truncate">{guestsLabel}</div>
              </div>
              <ChevronDown size={16} className={classNames('text-gray-400 shrink-0 transition-transform duration-200', guestsOpen && 'rotate-180')} />
            </button>

            {guestsOpen && (
              <div className="absolute top-full left-0 mt-3 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-none p-5 w-72 z-[9999] animate-fade-in">
                <Stepper label={t('common.rooms')} value={state.rooms} onChange={setRooms} min={1} />
                <Stepper label={t('common.adults')} value={state.adults} onChange={setAdults} min={1} />
                <Stepper label={t('common.children')} value={state.children} onChange={setChildren} min={0} />
                <button
                  type="button"
                  onClick={() => setGuestsOpen(false)}
                  className="mt-2 w-full text-center text-xs uppercase tracking-widest2 text-gold-600 font-medium py-2.5 hover:bg-cream transition-colors duration-200"
                >
                  {t('common.apply')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/*
          CTA — bouton doré avec bordures pointues
        */}
        <div className="flex items-center justify-center p-3 md:p-4">
          <button
            type="button"
            onClick={() => submitSearch()}
            className="w-full lg:w-auto bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-center leading-snug text-white uppercase tracking-widest2 text-[10px] md:text-[11px] font-semibold px-2 md:px-3 py-3.5 rounded-none transition-all duration-200 hover:shadow-lg"
          >
            {t('common.checkAvailability')}
          </button>
        </div>
      </div>

      {outcome && <SearchOutcomeNotice outcome={outcome} />}
    </div>
  )
}

/**
 * Réponse de la recherche, sous la barre.
 *
 * Elle était jusqu'ici perdue : on interrogeait l'API puis on changeait de page
 * sans rien montrer. Le visiteur qui clique « Vérifier les disponibilités »
 * attend une réponse à cet endroit précis.
 */
function SearchOutcomeNotice({ outcome }: { outcome: SearchOutcome }) {
  const { t } = useTranslation()

  const tones = {
    searching: 'bg-white/95 text-gray-600',
    available: 'bg-green-50 text-green-800',
    full: 'bg-red-50 text-red-700',
    failed: 'bg-amber-50 text-amber-800',
  } as const

  const Icon = outcome.status === 'available' ? CheckCircle2
    : outcome.status === 'searching' ? Loader2
      : AlertCircle

  const message = outcome.status === 'searching' ? t('booking.searching')
    : outcome.status === 'available' ? t('booking.searchAvailable', { count: outcome.availableRooms })
      : outcome.status === 'full' ? t('booking.searchFull')
        : t('booking.searchFailed')

  return (
    <p role="status"
      className={classNames(
        'mt-3 flex items-center gap-2 px-4 py-2.5 text-sm shadow-card w-full max-w-5xl',
        tones[outcome.status],
      )}>
      <Icon size={16} aria-hidden="true"
        className={classNames('shrink-0', outcome.status === 'searching' && 'animate-spin')} />
      {message}
    </p>
  )
}

function Stepper({
  label,
  value,
  onChange,
  min = 0,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-charcoal capitalize">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-7 h-7 rounded-none border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gold-500 hover:text-gold-500 disabled:opacity-30 transition-colors duration-200"
        >
          −
        </button>
        <span className="w-5 text-center text-sm font-medium">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-7 h-7 rounded-none border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gold-500 hover:text-gold-500 transition-colors duration-200"
        >
          +
        </button>
      </div>
    </div>
  )
}
import { useTranslation } from 'react-i18next'
import { Users, CheckCircle2, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import PageHero from '@/components/PageHero'
import AnimatedSection from '@/components/AnimatedSection'
import SectionHeading from '@/components/SectionHeading'
import { equipmentKeys } from '@/data/events'
import type { EventFormData, EventRoom } from '@/types'
import { validateEmail } from '@/utils/helpers'
import { api, resolveImageUrl } from '@/utils/api'

export default function Events() {
  const { t, i18n } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [eventRooms, setEventRooms] = useState<EventRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [form, setForm] = useState<EventFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    eventDate: '',
    guestCount: '',
  })
  const english = i18n.resolvedLanguage?.startsWith('en')

  useEffect(() => {
    async function fetchEventRooms() {
      const response = await api.getEvents()
      if (response.error) {
        setError(response.error)
      } else if (response.data) {
        setEventRooms(response.data)
      }
      setLoading(false)
    }
    fetchEventRooms()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event rooms...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load event rooms: {error}</p>
          <button onClick={() => window.location.reload()} className="btn-gold">
            Retry
          </button>
        </div>
      </div>
    )
  }

  function update<K extends keyof EventFormData>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }))
    if (submitError) setSubmitError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError(null)

    // Validation côté client
    if (!form.name.trim()) {
      setSubmitError('Veuillez saisir votre nom.')
      return
    }
    if (!validateEmail(form.email)) {
      setSubmitError('Veuillez saisir une adresse email valide.')
      return
    }
    if (!form.eventDate) {
      setSubmitError("Veuillez choisir la date de l'événement.")
      return
    }
    if (!form.guestCount || Number(form.guestCount) < 1) {
      setSubmitError("Veuillez indiquer le nombre de personnes.")
      return
    }
    if (!form.message.trim()) {
      setSubmitError('Veuillez décrire votre projet.')
      return
    }

    setStatus('sending')
    try {
      const result = await api.sendEventInquiry(form)
      if (result.error) {
        console.error('[La Colongette] Event inquiry failed:', result.error)
        setSubmitError(
          typeof result.error === 'string' && result.error !== 'Network error'
            ? `L'envoi a échoué : ${result.error}`
            : "L'envoi a échoué. Vérifiez votre connexion et réessayez."
        )
        setStatus('idle')
      } else {
        setStatus('success')
      }
    } catch (err) {
      console.error('[La Colongette] Event inquiry exception:', err)
      setSubmitError('Impossible de contacter le serveur. Veuillez réessayer plus tard.')
      setStatus('idle')
    }
  }

  const inputClass =
    'w-full border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 px-4 py-3 text-sm outline-none transition-colors bg-white'

  return (
    <>
      <PageHero image="/images/Photo-Evenements-1200.jpg" title={t('events.heroTitle')} subtitle={t('events.heroSubtitle')} />

      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading title={t('events.introTitle')} text={t('events.introText')} />
      </AnimatedSection>

      {/*
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading title={t('events.roomsTitle')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {eventRooms.length > 0 ? eventRooms.map((room, idx) => (
              <AnimatedSection key={room.id} delay={idx * 0.1} className="bg-white rounded-md overflow-hidden shadow-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={resolveImageUrl(room.image)} alt={(english ? room.nameEn : room.name) || t(`events.${room.key}Name`)} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg mb-2">{(english ? room.nameEn : room.name) || t(`events.${room.key}Name`)}</h3>
                  <div className="flex items-center gap-2 text-sm text-gold-600 mb-2">
                    <Users size={16} /> {room.capacity ?? t(`events.${room.key}Capacity`)}
                  </div>
                  <p className="text-sm text-gray-600">
                    {(english ? room.descriptionEn : room.description) || t(`events.${room.key}Style`)}
                  </p>
                </div>
              </AnimatedSection>
            )) : (
              <p className="text-center text-gray-600 col-span-3">Event rooms not available at the moment.</p>
            )}
          </div>
        </div>
      </section>
      */}

      {/* Equipment */}
      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading title={t('events.equipmentTitle')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14 max-w-4xl mx-auto">
          {equipmentKeys.map((key) => (
            <div key={key} className="flex items-center gap-3 bg-white border border-gray-100 rounded-md p-4 shadow-sm">
              <CheckCircle2 size={18} className="text-gold-500 shrink-0" />
              <span className="text-sm text-charcoal">{t(`events.${key}`)}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Quote request form */}
      <section className="bg-charcoal py-20 md:py-24">
        <div className="container-luxe max-w-3xl">
          <SectionHeading title={t('events.formTitle')} text={t('events.formText')} light />
          {status === 'success' ? (
            <div className="mt-10 text-center text-gold-400 bg-white/5 border border-gold-500/30 rounded-md p-8">
              <CheckCircle2 size={32} className="mx-auto mb-3" />
              {t('contact.successMessage')}
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  required
                  placeholder={t('contact.namePlaceholder')}
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className={inputClass}
                />
                <input
                  required
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={inputClass}
                />
                <input
                  required
                  type="number"
                  min={1}
                  placeholder="Nombre de personnes"
                  value={form.guestCount}
                  onChange={(e) => update('guestCount', e.target.value)}
                  className={inputClass}
                />
              </div>

              <input
                required
                type="date"
                value={form.eventDate}
                onChange={(e) => update('eventDate', e.target.value)}
                className={inputClass}
              />

              <textarea
                required
                rows={4}
                placeholder={t('contact.messagePlaceholder')}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className={inputClass}
              />

              {submitError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-md px-4 py-3"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-gold disabled:opacity-60">
                {status === 'sending' ? t('common.sending') : t('common.send')}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
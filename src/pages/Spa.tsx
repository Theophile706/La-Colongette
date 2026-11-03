import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import PageHero from '@/components/PageHero'
import AnimatedSection from '@/components/AnimatedSection'
import SectionHeading from '@/components/SectionHeading'
import ImageGallery from '@/components/ImageGallery'
import { api } from '@/utils/api'
import { useGalleryImages } from '@/hooks/useGallery'
import type { SpaTreatment } from '@/types'

export default function Spa() {
  const { t, i18n } = useTranslation()
  const english = i18n.resolvedLanguage?.startsWith('en')

  /**
   * Les soins saisis au back-office portent leur propre libellé ; les lignes
   * d'origine n'ont qu'une clé de traduction. On préfère le libellé saisi et
   * on retombe sur la traduction quand il est absent.
   */
  const treatmentName = (tr: SpaTreatment) => {
    const custom = english ? tr.nameEn || tr.name : tr.name
    return custom || t(`spa.${tr.key}`)
  }
  const treatmentDuration = (tr: SpaTreatment) => {
    const custom = english ? tr.durationEn || tr.duration : tr.duration
    return custom || t(`spa.${tr.durationKey}`)
  }
  const description = (tr: SpaTreatment) =>
    (english ? tr.descriptionEn || tr.description : tr.description) || ''

  const [spaTreatments, setSpaTreatments] = useState<SpaTreatment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const poolImages = useGalleryImages('pool')
  const spaImages = useGalleryImages('spa')

  useEffect(() => {
    async function fetchSpaTreatments() {
      const response = await api.getSpa()
      if (response.error) {
        setError(response.error)
      } else if (response.data) {
        setSpaTreatments(response.data)
      }
      setLoading(false)
    }
    fetchSpaTreatments()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading spa treatments...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load spa treatments: {error}</p>
          <button onClick={() => window.location.reload()} className="btn-gold">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHero image="/images/Photo-Bien-etre-1200.jpg" title={t('spa.heroTitle')} subtitle={t('spa.heroSubtitle')} />

      {/* Pool section */}
      <AnimatedSection className="container-luxe py-20 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="section-eyebrow">{t('spa.poolEyebrow')}</div>
          <h2 className="section-title mb-5">{t('spa.poolTitle')}</h2>
          <p className="text-gray-600 leading-relaxed">{t('spa.poolText')}</p>
          <div className="mt-6 flex items-center gap-3 text-sm text-charcoal">
            <Clock size={16} className="text-gold-500" /> {t('spa.poolHours')}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="/images/Photo-Spa-et-Detente-2.jpg" alt="Piscine" className="rounded-md aspect-square object-cover" loading="lazy" />
          <img src="/images/Photo-Gallerie-2-1200.jpg" alt="Piscine et jardin" className="rounded-md aspect-square object-cover mt-8" loading="lazy" />
        </div>
      </AnimatedSection>

      {/* Spa section */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <img src="/images/Photo-Gallerie-3-1200.jpg" alt="Spa" className="rounded-md aspect-square object-cover" loading="lazy" />
            <img src="/images/Photo.jpg" alt="Ambiance spa" className="rounded-md aspect-square object-cover mt-8" loading="lazy" />
          </div>
          <div className="order-1 lg:order-2">
            <div className="section-eyebrow">{t('spa.spaEyebrow')}</div>
            <h2 className="section-title mb-5">{t('spa.spaTitle')}</h2>
            <p className="text-gray-600 leading-relaxed">{t('spa.spaText')}</p>
            <div className="mt-6 flex items-center gap-3 text-sm text-charcoal">
              <Clock size={16} className="text-gold-500" /> {t('spa.spaHours')}
            </div>
          </div>
        </div>
      </section>

      {/* Treatments menu */}
      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading title={t('spa.treatmentsTitle')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-14 max-w-4xl mx-auto">
          {spaTreatments.length > 0 ? spaTreatments.map((tr) => (
            <div key={tr.id} className="border border-gray-200 rounded-md p-5 hover:border-gold-500 transition-colors">
              <div>
                <div className="font-medium text-charcoal">{treatmentName(tr)}</div>
                <div className="text-xs text-gray-500 mt-1">{treatmentDuration(tr)}</div>
                {description(tr) && (
                  <p className="mt-2 max-w-sm text-xs text-gray-500">{description(tr)}</p>
                )}
              </div>
              <Link to="/contact#booking" className="mt-4 inline-block text-xs text-gold-600 hover:text-gold-700 underline">
                {t('spa.bookTreatment')}
              </Link>
            </div>
          )) : (
            <p className="text-center text-gray-600 col-span-2">Spa treatments not available at the moment.</p>
          )}
        </div>
      </AnimatedSection>

      {/* Gallery */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow={t('home.galleryEyebrow')} title={t('spa.heroTitle')} />
          <div className="mt-14">
            <ImageGallery images={[...poolImages, ...spaImages]} columns={4} />
          </div>
        </div>
      </section>
    </>
  )
}

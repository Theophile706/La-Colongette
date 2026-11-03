import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Clock, ChefHat } from 'lucide-react'
import PageHero from '@/components/PageHero'
import AnimatedSection from '@/components/AnimatedSection'
import SectionHeading from '@/components/SectionHeading'
import ImageGallery from '@/components/ImageGallery'
import { api } from '@/utils/api'
import { useGalleryImages } from '@/hooks/useGallery'
import { useLanguage } from '@/hooks/useLanguage'
import type { MenuSection } from '@/types'

export default function Restaurant() {
  const { t } = useTranslation()
  const { lang } = useLanguage()
  const [menuSections, setMenuSections] = useState<MenuSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const restaurantImages = useGalleryImages('restaurant')

  useEffect(() => {
    async function fetchMenu() {
      const response = await api.getMenu()
      if (response.error) {
        setError(response.error)
      } else if (response.data) {
        setMenuSections(response.data)
      }
      setLoading(false)
    }
    fetchMenu()
  }, [])

  const specialties = ['specialty1', 'specialty2', 'specialty3', 'specialty4']

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load menu: {error}</p>
          <button onClick={() => window.location.reload()} className="btn-gold">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHero image="/images/Photo-Bar-et-Restaurants-1200.jpg" title={t('restaurant.heroTitle')} subtitle={t('restaurant.heroSubtitle')} />

      {/* Section intro */}
      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading
          eyebrow={t('restaurant.sectionEyebrow')}
          title={t('restaurant.sectionTitle')}
          text={t('restaurant.sectionText')}
        />
      </AnimatedSection>

      {/* Warm table + Dishes + Bar (3-column feature) */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { titleKey: 'warmTableTitle', textKey: 'warmTableText', img: '/images/Photo-restaurant-1.jpg' },
            { titleKey: 'dishesTitle', textKey: 'dishesText', img: '/images/restaurant/dish-real.jpg' },
            { titleKey: 'barTitle', textKey: 'barText', img: '/images/restaurant/cocktails-real.jpg' },
          ].map((item, idx) => (
            <AnimatedSection key={item.titleKey} delay={idx * 0.1} className="bg-white rounded-md overflow-hidden shadow-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.img} alt={t(`restaurant.${item.titleKey}`)} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg mb-2">{t(`restaurant.${item.titleKey}`)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(`restaurant.${item.textKey}`)}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Hours + Specialties */}
      <AnimatedSection className="container-luxe py-20 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h3 className="font-serif text-2xl mb-6 flex items-center gap-3">
            <Clock className="text-gold-500" size={24} /> {t('restaurant.hoursTitle')}
          </h3>
          <div className="space-y-4">
            {[
              ['breakfast', 'breakfastHours'],
              ['lunch', 'lunchHours'],
              ['dinner', 'dinnerHours'],
            ].map(([label, hours]) => (
              <div key={label} className="flex justify-between border-b border-gray-100 pb-3">
                <span className="font-medium text-charcoal">{t(`restaurant.${label}`)}</span>
                <span className="text-gray-600">{t(`restaurant.${hours}`)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-serif text-2xl mb-6 flex items-center gap-3">
            <ChefHat className="text-gold-500" size={24} /> {t('restaurant.specialtiesTitle')}
          </h3>
          <ul className="space-y-3">
            {specialties.map((key) => (
              <li key={key} className="flex items-center gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                {t(`restaurant.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/*
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading title={t('restaurant.menuTitle')} text={t('restaurant.menuText')} />

          <div className="mt-14 max-w-5xl mx-auto overflow-hidden rounded-md shadow-card bg-white">
            <img
              src="/images/restaurant/menu-snack-hd.png"
              alt={t('restaurant.menuTitle')}
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="mt-14 max-w-4xl mx-auto space-y-12">
            {menuSections.length > 0 ? menuSections.map((section) => (
              <div key={section.id}>
                <h3 className="font-serif text-2xl text-gold-600 mb-6 text-center">
                  {lang === 'en' ? section.titleEn : section.title}
                </h3>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-3">
                      <div>
                        <div className="font-medium text-charcoal">{lang === 'en' ? item.nameEn : item.name}</div>
                        <div className="text-sm text-gray-500">{lang === 'en' ? item.descriptionEn : item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )) : (
              <p className="text-center text-gray-600">Menu not available at the moment.</p>
            )}
          </div>
        </div>
      </section>
      */}

      {/* Gallery + CTA */}
      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading title={t('restaurant.ctaTitle')} />
        <div className="mt-14">
          <ImageGallery images={restaurantImages.slice(0, 4)} columns={4} />
        </div>
      </AnimatedSection>
    </>
  )
}

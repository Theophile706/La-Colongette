import { useTranslation } from 'react-i18next'
import PageHero from '@/components/PageHero'
import AnimatedSection from '@/components/AnimatedSection'
import SectionHeading from '@/components/SectionHeading'

export default function Discover() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        image="/images/WhatsApp%20Image%202026-11-02%20at%2008.53.36.jpeg"
        title={t('discover.heroTitle')}
        subtitle={t('discover.heroSubtitle')}
        expanded
      />

      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading title={t('discover.introTitle')} text={t('discover.introText')} />
      </AnimatedSection>

      {/*
      {activities.length > 0 && (
        <section className="bg-cream py-20 md:py-24">
          <div className="container-luxe">
            <SectionHeading title={t('discover.activitiesTitle')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-14">
              {activities.map((activity, idx) => {
                const Icon = icons[activity.icon || ''] ?? Sparkles
                return (
                  <AnimatedSection key={activity.id} delay={idx * 0.1}
                    className="bg-white rounded-md overflow-hidden shadow-card flex flex-col sm:flex-row">
                    {activity.image && (
                      <div className="sm:w-1/3 aspect-[4/3] sm:aspect-auto overflow-hidden">
                        <img src={resolveImageUrl(activity.image)} alt={title(activity)}
                          className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    )}
                    <div className="p-6 flex-1">
                      <Icon className="text-gold-500 mb-3" size={22} aria-hidden="true" />
                      <h3 className="font-serif text-lg mb-2">{title(activity)}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{text(activity)}</p>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <AnimatedSection className="container-luxe py-20 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h3 className="font-serif text-2xl mb-6 flex items-center gap-3">
            <MapPin className="text-gold-500" size={24} aria-hidden="true" /> {t('discover.attractionsTitle')}
          </h3>
          <ul className="space-y-3">
            {attractions.map((attraction) => (
              <li key={attraction.id} className="flex items-center gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" aria-hidden="true" />
                {title(attraction)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-2xl mb-6 flex items-center gap-3">
            <Bus className="text-gold-500" size={24} aria-hidden="true" /> {t('discover.transportTitle')}
          </h3>
          <p className="text-gray-600 leading-relaxed">{t('discover.transportText')}</p>
        </div>
      </AnimatedSection>

      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow={t('home.galleryEyebrow')} title={t('discover.heroTitle')} />
          <div className="mt-14">
            <ImageGallery images={discoverImages} columns={4} />
          </div>
        </div>
      </section>
      */}
    </>
  )
}

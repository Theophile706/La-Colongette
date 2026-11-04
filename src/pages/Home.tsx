import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BedDouble, UtensilsCrossed, Waves, PartyPopper, Sparkles, Leaf, HeartHandshake } from 'lucide-react'
import Hero from '@/components/Hero'
import AnimatedSection from '@/components/AnimatedSection'
import SectionHeading from '@/components/SectionHeading'
import ImageGallery from '@/components/ImageGallery'
import { useGalleryImages } from '@/hooks/useGallery'

const services = [
  { key: 'service1', icon: BedDouble, image: '/images/Photo-chambre.jpg', link: '/chambres-suites' },
  { key: 'service2', icon: UtensilsCrossed, image: '/images/Photo-Bar-et-Restaurants-1200.jpg', link: '/restaurant' },
  { key: 'service3', icon: Waves, image: '/images/Photo-Gallerie-2-1200.jpg', link: '/piscine-bien-etre' },
  { key: 'service4', icon: PartyPopper, image: '/images/Photo-Evenements-1200.jpg', link: '/reunions-evenements' },
]

const highlights = [
  { key: 'highlight1', icon: Sparkles },
  { key: 'highlight2', icon: Leaf },
  { key: 'highlight3', icon: HeartHandshake },
]

const sisterHotels = [
  { key: 'sister1', image: '/images/3.jpg' },
  { key: 'sister2', image: '/images/WhatsApp%20Image%202026-11-02%20at%2011.45.41.jpeg' },
  { key: 'sister3', image: '/images/images.jpg' },
]

export default function Home() {
  const { t } = useTranslation()

  const homeGallery = useGalleryImages()
    .filter((img) => ['rooms', 'restaurant', 'pool', 'discover'].includes(img.category))
    .slice(0, 8)

  return (
    <>
      <Hero />

      {/* Breathing room after the inline mobile booking bar and desktop overlap. */}
      <div className="h-8 md:h-14" />

      {/* Introduction */}
      <AnimatedSection className="container-luxe py-20 md:py-28">
        <SectionHeading
          eyebrow={t('home.introEyebrow')}
          title={t('home.introTitle')}
          text={t('home.introText')}
        />
      </AnimatedSection>

      {/* Services showcase */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow={t('home.servicesEyebrow')} title={t('home.servicesTitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {services.map((s, idx) => (
              <AnimatedSection key={s.key} delay={idx * 0.1}>
                <Link to={s.link} className="group block bg-white rounded-md overflow-hidden shadow-card h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={s.image}
                      alt={t(`home.${s.key}Title`)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <s.icon className="text-gold-500 mb-3" size={24} />
                    <h3 className="font-serif text-lg text-charcoal mb-2">{t(`home.${s.key}Title`)}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{t(`home.${s.key}Text`)}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <AnimatedSection className="container-luxe py-20 md:py-28">
        <SectionHeading eyebrow={t('home.highlightsEyebrow')} title={t('home.highlightsTitle')} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-14">
          {highlights.map((h) => (
            <div key={h.key} className="text-center">
              <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-5">
                <h.icon className="text-gold-500" size={26} />
              </div>
              <h3 className="font-serif text-lg mb-2">{t(`home.${h.key}`)}</h3>
              <p className="text-sm text-gray-600">{t(`home.${h.key}Text`)}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Special offers */}
      <section className="relative py-20 md:py-28 bg-charcoal">
        <div className="container-luxe">
          <SectionHeading eyebrow={t('home.offersEyebrow')} title={t('home.offersTitle')} light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {['offer1', 'offer2', 'offer3'].map((key, idx) => (
              <AnimatedSection key={key} delay={idx * 0.1} className="border border-white/15 hover:border-gold-500/60 transition-colors p-8 rounded-md">
                <div className="text-gold-500 text-3xl font-serif mb-4">0{idx + 1}</div>
                <h3 className="font-serif text-xl text-white mb-3">{t(`home.${key}Title`)}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{t(`home.${key}Text`)}</p>
                <Link to="/contact#booking" className="text-gold-500 text-xs uppercase tracking-widest2 hover:text-gold-400">
                  {t('common.discoverMore')} →
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <AnimatedSection className="container-luxe py-20 md:py-28">
        <SectionHeading eyebrow={t('home.galleryEyebrow')} title={t('home.galleryTitle')} />
        <div className="mt-14">
          <ImageGallery images={homeGallery} columns={4} />
        </div>
      </AnimatedSection>

      {/* Sister hotels */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow={t('home.sisterEyebrow')} title={t('home.sisterTitle')} text={t('home.sisterText')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {sisterHotels.map((h) => (
              <div key={h.key} className="bg-white rounded-md overflow-hidden shadow-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={h.image} alt={t(`home.${h.key}Name`)} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg mb-1">{t(`home.${h.key}Name`)}</h3>
                  <div className="text-gold-600 text-xs uppercase tracking-widest2 mb-3">{t(`home.${h.key}Location`)}</div>
                  <p className="text-sm text-gray-600">{t(`home.${h.key}Text`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        <img src="/images/Photo-Gallerie-2-1200.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 container-luxe text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{t('home.ctaTitle')}</h2>
          <p className="text-white/80 mb-8">{t('home.ctaText')}</p>
          <Link to="/contact#booking" className="btn-gold">
            {t('common.bookNow')}
          </Link>
        </div>
      </section>
    </>
  )
}

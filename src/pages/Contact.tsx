import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react'
import PageHero from '@/components/PageHero'
import AnimatedSection from '@/components/AnimatedSection'
import SectionHeading from '@/components/SectionHeading'
import ContactForm from '@/components/ContactForm'
import GoogleMap from '@/components/GoogleMap'
import BookingBar from '@/components/BookingBar'
import BookingReservationForm from '@/components/BookingReservationForm'
import { BookingProvider } from '@/hooks/useBooking'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero image="/images/hero/hero-building.jpg" title={t('contact.heroTitle')} subtitle={t('contact.heroSubtitle')} />

      {/* Booking section */}
      <section id="booking" className="container-luxe -mt-10 relative z-20">
        <AnimatedSection>
          <BookingProvider>
            <div className="bg-white rounded-md shadow-soft-lg p-6 md:p-8">
              <h2 className="font-serif text-xl mb-1">{t('booking.title')}</h2>
              <p className="text-sm text-gray-500 mb-6">{t('booking.subtitle')}</p>
              <BookingBar floating={false} />
              <BookingReservationForm />
            </div>
          </BookingProvider>
        </AnimatedSection>
      </section>

      {/* Contact form + info */}
      <AnimatedSection className="container-luxe py-20 md:py-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <SectionHeading center={false} title={t('contact.formTitle')} text={t('contact.formText')} />
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-6">{t('contact.infoTitle')}</h3>
          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gold-500 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium text-charcoal">{t('contact.addressLabel')}</div>
                <div className="text-gray-600">{t('contact.address')}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-gold-500 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium text-charcoal">{t('contact.phoneInfoLabel')}</div>
                <a href="tel:+261344904040" className="text-gray-600 hover:text-gold-600 block">+261 34 49 040 40</a>
                <a href="tel:+261204449040" className="text-gray-600 hover:text-gold-600 block">+261 20 44 490 40</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-gold-500 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium text-charcoal">{t('contact.emailInfoLabel')}</div>
                <a href="mailto:royalpalace.resa@moov.mg" className="text-gray-600 hover:text-gold-600 block">
                  royalpalace.resa@moov.mg
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-xl mb-4">{t('contact.socialTitle')}</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/hotelroyalpalaceantsirabe"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-gold-600 hover:bg-gold-500 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/hotelroyalpalace_antsirabe/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-gold-600 hover:bg-gold-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Map */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading title={t('contact.mapTitle')} />
          <div className="mt-10">
            <GoogleMap />
          </div>
        </div>
      </section>
    </>
  )
}

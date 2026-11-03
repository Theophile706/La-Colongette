// ============================================================
// Global TypeScript type definitions for La Colongette Antsirabe
// ============================================================

export interface Room {
  id: string
  slug: string
  translationKey: string // key in roomsData.* translations
  name?: string | null
  nameEn?: string | null
  description?: string | null
  descriptionEn?: string | null
  view?: string | null
  viewEn?: string | null
  bedType?: string | null
  bedTypeEn?: string | null
  price: number // in EUR per night (base price)
  currency: string
  images: string[] // paths under /images/rooms/
  size: number // in m²
  maxGuests: number
  amenities: string[] // icon keys, see RoomCard
  createdAt?: string
  updatedAt?: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'hero' | 'rooms' | 'restaurant' | 'pool' | 'spa' | 'events' | 'discover' | 'gallery'
}

export interface MenuItem {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  price: number
  order?: number
}

export interface MenuSection {
  id: string
  title: string
  titleEn: string
  items: MenuItem[]
  order?: number
}

export interface SpaTreatment {
  id: string
  key: string // i18n key suffix e.g. 'treatment1'
  durationKey: string
  /** Libellés saisis au back-office ; absents, on retombe sur les clés i18n. */
  name?: string | null
  nameEn?: string | null
  duration?: string | null
  durationEn?: string | null
  description?: string | null
  descriptionEn?: string | null
  price: number
  order?: number
}

export interface DiscoverItem {
  id: string
  type: 'activity' | 'attraction'
  key?: string | null
  title?: string | null
  titleEn?: string | null
  text?: string | null
  textEn?: string | null
  icon?: string | null
  image?: string | null
  order?: number
}

export interface EventRoom {
  id: string
  key: string
  image: string
  name?: string | null
  nameEn?: string | null
  description?: string | null
  descriptionEn?: string | null
  capacity?: number | null
  schedule?: string | null
  price?: number | null
  currency?: string | null
  order?: number
}

export interface BookingState {
  checkIn: Date | null
  checkOut: Date | null
  rooms: number
  adults: number
  children: number
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface EventFormData extends ContactFormData {
  eventDate: string
  guestCount: string
}

import type { GalleryImage } from '@/types'

/**
 * GALLERY IMAGES
 * --------------
 * Central registry of all photos used across the site.
 * EASY TO REPLACE: simply swap the file under /public/images/<category>/
 * keeping the same filename, or update the `src` path here.
 * Recommended format: JPG, landscape 3:2, min. 1600px wide.
 */
export const galleryImages: GalleryImage[] = [
  { id: 'hero-1', src: '/images/Photo-Gallerie-1-1200.jpg', alt: 'Façade de La Colongette', category: 'hero' },

  { id: 'room-1', src: '/images/Photo-chambre.jpg', alt: 'Chambre supérieure avec lit confortable', category: 'rooms' },
  { id: 'room-2', src: '/images/Photo-Bloc-1.webp', alt: 'Chambre deluxe élégante', category: 'rooms' },
  { id: 'room-3', src: '/images/Image-GYX72HV.jpg', alt: 'Suite royale avec décoration raffinée', category: 'rooms' },
  { id: 'room-4', src: '/images/Photo-Gallerie-5-1200.jpg', alt: 'Chambre classique lumineuse', category: 'rooms' },

  { id: 'restaurant-1', src: '/images/restaurant/terrace-real.jpg', alt: 'Terrasse du restaurant La Colongette', category: 'restaurant' },
  { id: 'restaurant-2', src: '/images/restaurant/dish-real.jpg', alt: 'Plat raffiné du restaurant La Colongette', category: 'restaurant' },
  { id: 'restaurant-3', src: '/images/restaurant/cocktails-real.jpg', alt: 'Cocktails et boissons fraîches', category: 'restaurant' },
  { id: 'restaurant-4', src: '/images/Photo-nourriture-1.webp', alt: 'Création culinaire du restaurant', category: 'restaurant' },
  { id: 'restaurant-5', src: '/images/Photo-restaurant-1.webp', alt: 'Ambiance du restaurant La Colongette', category: 'restaurant' },

  { id: 'spa-1', src: '/images/Photo-Gallerie-3-1200.jpg', alt: 'Cabine de soin du spa', category: 'spa' },
  { id: 'spa-2', src: '/images/spa/spa-2.jpg', alt: 'Ambiance zen du spa', category: 'spa' },
  { id: 'spa-3', src: '/images/spa/spa-3.jpg', alt: 'Salle de massage apaisante', category: 'spa' },

  { id: 'events-1', src: '/images/Photo-Evenements-1200.jpg', alt: 'Salle de réunion et événements', category: 'events' },
  { id: 'events-2', src: '/images/Photo-Gallerie-1-1200.jpg', alt: 'Salle de conférence professionnelle', category: 'events' },
  { id: 'events-3', src: '/images/Photo-Gallerie-2-1200.jpg', alt: 'Espace de réception pour événements', category: 'events' },

  { id: 'discover-1', src: '/images/discover/antsirabe-1.jpg', alt: "Rue d'Antsirabe avec architecture coloniale", category: 'discover' },
  { id: 'discover-2', src: '/images/discover/antsirabe-2.jpg', alt: 'Paysage des hauts-plateaux malgaches', category: 'discover' },
  { id: 'discover-3', src: '/images/discover/antsirabe-3.jpg', alt: "Vue d'Antsirabe", category: 'discover' },
  { id: 'discover-4', src: '/images/discover/garden-1.jpg', alt: 'Jardin tropical luxuriant', category: 'discover' },

  { id: 'gallery-1', src: '/images/Photo-Gallerie-4-1200.jpg', alt: "Hall d'accueil élégant de La Colongette", category: 'gallery' },
]

export const getImagesByCategory = (category: GalleryImage['category']) =>
  galleryImages.filter((img) => img.category === category)

export default galleryImages

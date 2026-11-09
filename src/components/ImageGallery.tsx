import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { resolveImageUrl } from '@/utils/api'
import type { GalleryImage } from '@/types'

interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  /** Centre les images horizontalement, y compris la dernière rangée incomplète. */
  center?: boolean
}

/**
 * ImageGallery
 * ------------
 * Responsive image grid with a fullscreen lightbox (prev/next/close,
 * keyboard navigation). Lazy-loads images via native `loading="lazy"`.
 */
export default function ImageGallery({ images, columns = 3, center = false }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const next = useCallback(() => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)), [images.length])
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  )

  useEffect(() => {
    if (activeIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex, close, next, prev])

  const gridCols =
    columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'

  // Largeur des vignettes en mode centré (flex) : on reproduit les colonnes de
  // la grille en retirant la part de `gap` correspondante à chaque point de rupture.
  const centeredItemWidth =
    columns === 2
      ? 'w-[calc(50%-0.375rem)] md:w-[calc(50%-0.5rem)]'
      : columns === 3
        ? 'w-[calc(50%-0.375rem)] sm:w-[calc(33.3333%-0.5rem)] md:w-[calc(33.3333%-0.6667rem)]'
        : 'w-[calc(50%-0.375rem)] sm:w-[calc(33.3333%-0.5rem)] md:w-[calc(33.3333%-0.6667rem)] lg:w-[calc(25%-0.75rem)]'

  return (
    <>
      <div className={center ? 'flex flex-wrap justify-center gap-3 md:gap-4' : `grid ${gridCols} gap-3 md:gap-4`}>
        {images.map((img, idx) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`group relative aspect-[4/3] overflow-hidden rounded-md bg-gray-100 ${center ? centeredItemWidth : ''}`}
          >
            <img
              src={resolveImageUrl(img.src)}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-4"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white p-2"
              aria-label="Previous"
            >
              <ChevronLeft size={32} />
            </button>
            <motion.img
              key={images[activeIndex].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              src={resolveImageUrl(images[activeIndex].src)}
              alt={images[activeIndex].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white p-2"
              aria-label="Next"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

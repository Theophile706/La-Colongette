const SHELL_CACHE = 'colongette-shell-v1'
const ASSET_CACHE = 'colongette-assets-v1'
const IMAGE_CACHE = 'colongette-images-v1'
const SHELL_URLS = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.webmanifest',
    '/favicon.svg',
    '/loho-maison-small.ico',
    '/images/hero/hero-building.jpg',
    '/images/logo.png',
    '/images/logo-dark.png',
]
const MAX_IMAGE_ENTRIES = 35
const MAX_IMAGE_BYTES = 4 * 1024 * 1024

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(SHELL_CACHE).then(async (cache) => {
            await cache.addAll(SHELL_URLS)
            const index = await cache.match('/index.html')
            const html = await index.text()
            const assets = [...html.matchAll(/(?:src|href)=["'](\/assets\/[^"']+)["']/g)].map((match) => match[1])
            await cache.addAll(assets)
        })
    )
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            caches.keys().then((keys) => Promise.all(
                keys
                    .filter((key) => key.startsWith('colongette-') && ![SHELL_CACHE, ASSET_CACHE, IMAGE_CACHE].includes(key))
                    .map((key) => caches.delete(key))
            )),
            self.clients.claim(),
        ])
    )
})

self.addEventListener('fetch', (event) => {
    const request = event.request
    if (request.method !== 'GET') return

    const url = new URL(request.url)
    if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return

    if (request.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                    const response = await fetch(request)
                    if (response.ok) {
                        const cache = await caches.open(SHELL_CACHE)
                        await cache.put('/index.html', response.clone())
                    }
                    return response
                } catch {
                    return await caches.match(request)
                        || await caches.match('/index.html')
                        || await caches.match('/offline.html')
                }
            })()
        )
        return
    }

    if (!['image', 'style', 'script', 'font'].includes(request.destination)) return

    const cacheName = request.destination === 'image' ? IMAGE_CACHE : ASSET_CACHE
    const cachePromise = caches.open(cacheName)
    const cachedPromise = caches.match(request)
    const refreshPromise = cachePromise.then(async (cache) => {
        const response = await fetch(request)
        const size = Number(response.headers.get('content-length'))
        const smallEnough = !size || size <= MAX_IMAGE_BYTES
        if (response.ok && smallEnough) {
            await cache.put(request, response.clone())
            if (request.destination === 'image') {
                const keys = await cache.keys()
                await Promise.all(keys.slice(0, Math.max(0, keys.length - MAX_IMAGE_ENTRIES)).map((key) => cache.delete(key)))
            }
        }
        return response
    })

    event.waitUntil(refreshPromise.then(() => undefined, () => undefined))
    event.respondWith(cachedPromise.then((cached) => cached || refreshPromise).catch(async () => (
        await caches.match(request) || Response.error()
    )))
})
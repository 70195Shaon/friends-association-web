/**
 * Service Worker for Friends Association PWA
 * Enables offline support and app-like experience
 */

const CACHE_NAME = 'friends-association-v2.0.0'
const STATIC_CACHE = 'friends-association-static-v1'
const DYNAMIC_CACHE = 'friends-association-dynamic-v1'

const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/shadcn.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847972f702e9eb3765e2af/resource/6da62bc0-9a63-492b-be95-a8c8f1de3dd1.png'
]

const CACHE_STRATEGIES = {
  NETWORK_FIRST: 'networkFirst',
  CACHE_FIRST: 'cacheFirst',
  STALE_WHILE_REVALIDATE: 'staleWhileRevalidate'
}

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...')
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static files')
        return cache.addAll(STATIC_FILES)
      }),
      self.skipWaiting()
    ])
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...')
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE &&
                     cacheName !== CACHE_NAME
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      }),
      self.clients.claim()
    ])
  )
})

// Fetch event - serve from cache with fallback strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same origin requests
    if (request.url.includes('/api/')) {
      // API requests - Network first
      event.respondWith(networkFirst(request))
    } else if (request.destination === 'image') {
      // Images - Cache first
      event.respondWith(cacheFirst(request))
    } else {
      // HTML/CSS/JS - Stale while revalidate
      event.respondWith(staleWhileRevalidate(request))
    }
  } else {
    // External requests (fonts, CDN)
    if (url.hostname.includes('fonts.googleapis.com') || 
        url.hostname.includes('pub-cdn.sider.ai')) {
      event.respondWith(cacheFirst(request))
    }
  }
})

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    const cache = await caches.open(DYNAMIC_CACHE)
    cache.put(request, networkResponse.clone())
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    return cachedResponse || new Response('অফলাইন - নেটওয়ার্ক সংযোগ নেই', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  }
}

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    const cache = await caches.open(DYNAMIC_CACHE)
    cache.put(request, networkResponse.clone())
    return networkResponse
  } catch (error) {
    return new Response('রিসোর্স পাওয়া যায়নি', {
      status: 404,
      statusText: 'Not Found',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request)

  const fetchPromise = fetch(request).then((networkResponse) => {
    const cache = caches.open(DYNAMIC_CACHE)
    cache.then((c) => c.put(request, networkResponse.clone()))
    return networkResponse
  }).catch(() => {
    // If network fails and we have no cache, return offline page
    if (!cachedResponse) {
      return new Response(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>অফলাইন - ফ্রেন্ডস এসোসিয়েশন</title>
          <style>
            body { 
              font-family: 'Tahoma', sans-serif; 
              text-align: center; 
              padding: 50px; 
              background: linear-gradient(135deg, #dc2626, #ea580c, #2563eb);
              color: white;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }
            .offline-container {
              background: rgba(255,255,255,0.1);
              padding: 40px;
              border-radius: 20px;
              backdrop-filter: blur(10px);
            }
            .logo {
              width: 80px;
              height: 80px;
              margin-bottom: 20px;
            }
            h1 { font-size: 2rem; margin-bottom: 20px; }
            p { font-size: 1.1rem; margin: 10px 0; }
            .retry-btn {
              background: white;
              color: #dc2626;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-size: 1rem;
              font-weight: bold;
              cursor: pointer;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="offline-container">
            <img class="logo" src="https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847972f702e9eb3765e2af/resource/6da62bc0-9a63-492b-be95-a8c8f1de3dd1.png" alt="লোগো">
            <h1>🌐 অফলাইন মোড</h1>
            <p>ইন্টারনেট সংযোগ নেই</p>
            <p>দয়া করে আপনার নেটওয়ার্ক সংযোগ চেক করুন</p>
            <button class="retry-btn" onclick="window.location.reload()">🔄 পুনরায় চেষ্টা করুন</button>
          </div>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    }
  })

  return cachedResponse || fetchPromise
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag)
  
  if (event.tag === 'payment-sync') {
    event.waitUntil(syncPayments())
  }
})

async function syncPayments() {
  try {
    // Sync offline payment data when online
    const offlineData = await getOfflineData('payments')
    if (offlineData.length > 0) {
      for (const payment of offlineData) {
        await fetch('/api/payments', {
          method: 'POST',
          body: JSON.stringify(payment),
          headers: { 'Content-Type': 'application/json' }
        })
      }
      await clearOfflineData('payments')
      console.log('[SW] Payments synced successfully')
    }
  } catch (error) {
    console.error('[SW] Payment sync failed:', error)
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event)
  
  const options = {
    body: event.data ? event.data.text() : 'নতুন বার্তা পেয়েছেন',
    icon: 'https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847972f702e9eb3765e2af/resource/6da62bc0-9a63-492b-be95-a8c8f1de3dd1.png',
    badge: 'https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847972f702e9eb3765e2af/resource/6da62bc0-9a63-492b-be95-a8c8f1de3dd1.png',
    vibrate: [100, 50, 100],
    data: event.data ? event.data.json() : {},
    actions: [
      {
        action: 'view',
        title: 'দেখুন',
        icon: 'https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847972f702e9eb3765e2af/resource/6da62bc0-9a63-492b-be95-a8c8f1de3dd1.png'
      },
      {
        action: 'close',
        title: 'বন্ধ করুন'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('ফ্রেন্ডস এসোসিয়েশন', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event)
  
  event.notification.close()

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Utility functions for offline data storage
async function getOfflineData(key) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE)
    const response = await cache.match(`/offline-data/${key}`)
    return response ? await response.json() : []
  } catch (error) {
    return []
  }
}

async function clearOfflineData(key) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE)
    await cache.delete(`/offline-data/${key}`)
  } catch (error) {
    console.error('Failed to clear offline data:', error)
  }
}

console.log('[SW] Service Worker loaded successfully - ফ্রেন্ডস এসোসিয়েশন v2.0.0')

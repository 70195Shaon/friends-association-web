/**
 * Service Worker registration for PWA functionality
 * Enables offline support and app-like experience
 */

const CACHE_NAME = 'friends-association-v2.0.0'

// Register service worker
export const register = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js'
      
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('✅ SW registered successfully:', registration.scope)
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available
                  if (confirm('নতুন আপডেট পাওয়া গেছে। এখনই রিফ্রেশ করবেন?')) {
                    window.location.reload()
                  }
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error('❌ SW registration failed:', error)
        })
    })
  }
}

// Unregister service worker
export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister()
        console.log('🗑️ SW unregistered')
      })
      .catch((error) => {
        console.error('❌ SW unregistration failed:', error)
      })
  }
}

// Enable push notifications
export const enableNotifications = async () => {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        console.log('🔔 Notifications enabled')
        return true
      }
    } catch (error) {
      console.error('❌ Notification permission failed:', error)
    }
  }
  return false
}

// Show notification
export const showNotification = (title: string, options?: NotificationOptions) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: 'https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847972f702e9eb3765e2af/resource/6da62bc0-9a63-492b-be95-a8c8f1de3dd1.png',
      badge: 'https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847972f702e9eb3765e2af/resource/6da62bc0-9a63-492b-be95-a8c8f1de3dd1.png',
      ...options
    })
  }
}

// Check if app is running in standalone mode (PWA)
export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true
}

// Install PWA prompt
export let deferredPrompt: any = null

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
  console.log('💾 PWA install prompt available')
})

export const promptInstall = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log(`🏠 PWA install: ${outcome}`)
    deferredPrompt = null
    return outcome === 'accepted'
  }
  return false
}

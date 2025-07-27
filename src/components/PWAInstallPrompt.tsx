/**
 * PWA Install Prompt Component
 * Shows installation prompt for mobile app-like experience
 */
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { X, Download, Smartphone } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  if (!showPrompt || !deferredPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Smartphone className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              মোবাইল অ্যাপ ইনস্টল করুন
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              ফ্রেন্ডস এসোসিয়েশন অ্যাপটি আপনার ফোনে ইনস্টল করুন দ্রুত অ্যাক্সেসের জন্য
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex space-x-2 mt-3">
        <Button onClick={handleInstall} size="sm" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          ইনস্টল করুন
        </Button>
        <Button variant="outline" onClick={handleDismiss} size="sm">
          পরে করব
        </Button>
      </div>
    </div>
  )
}
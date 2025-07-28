/**
 * Login Component
 * Simple login form with authentication
 */
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { LogIn, Eye, EyeOff, ExternalLink, AlertCircle } from 'lucide-react'

export default function Login() {
  const { login, loading } = useAuth()
  const [credentials, setCredentials] = useState({
    userId: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const success = await login(credentials.userId, credentials.password)
    if (!success) {
      setError('ভুল ইউজার আইডি বা পাসওয়ার্ড')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847972f702e9eb3765e2af/resource/6da62bc0-9a63-492b-be95-a8c8f1de3dd1.png" 
              alt="ফ্রেন্ডস এসোসিয়েশন লোগো"
              className="w-24 h-24 object-contain logo-glow"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-blue-600 bg-clip-text text-transparent mb-2">
            ফ্রেন্ডস এসোসিয়েশন
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              PLACED : 2023
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            বড়-ছোট মিলে বন্ধুত্বের বন্ধন, সমাজের সেবাই বাণিজ্যিক সংঘটন
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-800">
              সদস্য প্রবেশ
            </CardTitle>
            <p className="text-sm text-gray-600">
              আপনার অ্যাকাউন্টে প্রবেশ করুন
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <div>
                <Label htmlFor="userId">ইউজার আইডি</Label>
                <Input
                  id="userId"
                  type="text"
                  value={credentials.userId}
                  onChange={(e) => setCredentials({ ...credentials, userId: e.target.value })}
                  placeholder="আপনার ইউজার আইডি লিখুন"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-logo-gradient hover:opacity-90 transition-opacity"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>প্রবেশ করছি...</span>
                  </div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    প্রবেশ করুন
                  </>
                )}
              </Button>
            </form>

            {/* Help Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600 font-medium">
                  সাহায্য প্রয়োজন?
                </p>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">
                    পাসওয়ার্ড ভুলে গেলে এডমিনের সাথে যোগাযোগ করুন
                  </p>
                  <p className="text-xs text-blue-600">
                    📞 মোবাইল: ০১৩২৮৩৬০৩৫০
                  </p>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://sites.google.com/view/friendsassociation2023/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>ওয়েবসাইট</span>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61569809423952"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-xs text-orange-600 hover:text-orange-800 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>ফেসবুক</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © ২০২৩ ফ্রেন্ডস এসোসিয়েশন। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-xs text-gray-400 mt-1">
            প্রস্তুতকারী: মুহিব্বুর রহমান শাওন
          </p>
        </div>
      </div>
    </div>
  )
}

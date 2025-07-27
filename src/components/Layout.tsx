/**
 * Main Layout Component
 * Navigation and sidebar layout for the application
 */
import React, { useState, ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from './ui/button'
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  FileText, 
  Bell, 
  User, 
  LogOut,
  Settings,
  DollarSign,
  BarChart3,
  ExternalLink,
  Shield,
  Calendar,
  MessageSquare
} from 'lucide-react'

interface LayoutProps {
  children: (props: { currentView: string, user: any, setCurrentView: (view: string) => void }) => ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth()
  const [currentView, setCurrentView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = user?.role === 'super_admin' ? [
    { name: 'ড্যাশবোর্ড', id: 'dashboard', icon: Home },
    { name: 'সদস্য ব্যবস্থাপনা', id: 'members', icon: Users },
    { name: 'আর্থিক রিপোর্ট', id: 'financial', icon: BarChart3 },
    { name: 'আর্থিক বছর', id: 'financial-year', icon: Calendar },
    { name: 'এডমিন ব্যবস্থাপনা', id: 'admin-management', icon: Shield },
    { name: 'নোটিশ বোর্ড', id: 'notices', icon: Bell },
    { name: 'মেসেজ সিস্টেম', id: 'messages', icon: MessageSquare },
    { name: 'প্রোফাইল', id: 'profile', icon: User },
  ] : user?.role === 'admin' ? [
    { name: 'ড্যাশবোর্ড', id: 'dashboard', icon: Home },
    { name: 'সদস্য ব্যবস্থাপনা', id: 'members', icon: Users },
    { name: 'আর্থিক রিপোর্ট', id: 'financial', icon: BarChart3 },
    { name: 'নোটিশ বোর্ড', id: 'notices', icon: Bell },
    { name: 'মেসেজ সিস্টেম', id: 'messages', icon: MessageSquare },
    { name: 'প্রোফাইল', id: 'profile', icon: User },
  ] : [
    { name: 'ড্যাশবোর্ড', id: 'dashboard', icon: Home },
    { name: 'চাঁদার বিবরণী', id: 'dues', icon: DollarSign },
    { name: 'নোটিশ বোর্ড', id: 'notices', icon: Bell },
    { name: 'মেসেজ সিস্টেম', id: 'messages', icon: MessageSquare },
    { name: 'প্রোফাইল', id: 'profile', icon: User },
  ]

  const handleLogout = () => {
    logout()
    setSidebarOpen(false)
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 sidebar-gradient ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-red-100">
          <div className="flex items-center space-x-3">
            <img 
              src="https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847972f702e9eb3765e2af/resource/6da62bc0-9a63-492b-be95-a8c8f1de3dd1.png" 
              alt="ফ্রেন্ডস এসোসিয়েশন লোগো"
              className="w-10 h-10 object-contain logo-glow"
            />
            <div>
              <span className="text-sm font-bold bg-gradient-to-r from-red-600 via-orange-600 to-blue-600 bg-clip-text text-transparent">
                ফ্রেন্ডস এসোসিয়েশন
              </span>
              <p className="text-xs text-orange-600 font-medium">PLACED : 2023</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-red-100 card-red">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-logo-gradient rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user?.name.split(' ')[0].charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs flex items-center space-x-1">
                {user?.role === 'super_admin' && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    প্রধান এডমিন
                  </span>
                )}
                {user?.role === 'admin' && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    এডমিন
                  </span>
                )}
                {user?.role === 'member' && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    সদস্য #{user.memberNumber}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-logo-gradient text-white shadow-md'
                    : 'text-gray-700 hover:bg-logo-gradient-light hover:text-red-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </button>
            )
          })}
        </nav>

        {/* Links & Logout */}
        <div className="p-4 border-t border-red-100">
          <div className="space-y-2 mb-4">
            <a 
              href="https://sites.google.com/view/friendsassociation2023/home"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>আমাদের ওয়েবসাইট</span>
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61569809423952"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-orange-600 hover:text-orange-800 hover:bg-orange-50 px-2 py-1 rounded transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>ফেসবুক পেজ</span>
            </a>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full bg-transparent border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="h-4 w-4 mr-2" />
            লগআউট
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="h-16 bg-white shadow-sm border-b lg:hidden">
          <div className="h-full px-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="hover:bg-red-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <img 
                src="https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847972f702e9eb3765e2af/resource/6da62bc0-9a63-492b-be95-a8c8f1de3dd1.png" 
                alt="লোগো"
                className="w-8 h-8 object-contain"
              />
              <h1 className="text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                ফ্রেন্ডস এসোসিয়েশন
              </h1>
            </div>
            <div className="w-8" />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children({ currentView, user, setCurrentView })}
        </main>
      </div>
    </div>
  )
}

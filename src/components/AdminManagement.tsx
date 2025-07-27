/**
 * Admin Management Component
 * Super Admin can add/remove admins, view password change logs
 */
import React, { useState } from 'react'
import { User, PasswordChangeLog } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  EyeOff,
  UserCheck,
  AlertCircle,
  Key,
  Clock
} from 'lucide-react'

export default function AdminManagement() {
  const { user, passwordChangeLogs } = useAuth()
  const [showAddForm, setShowAddForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordLogs, setShowPasswordLogs] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    password: '',
    confirmPassword: ''
  })

  // Admin list with মুহিব্বুর রহমান শাওন as Super Admin
  const [admins, setAdmins] = useState<User[]>([
    {
      id: 'super_admin001',
      userId: 'admin',
      password: 'admin123',
      name: 'মুহিব্বুর রহমান শাওন',
      role: 'super_admin', // প্রধান এডমিন
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2023-08-01')
    }
  ])

  // Only Super Admin can access this component
  if (user?.role !== 'super_admin') {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="text-center py-12">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">অ্যাক্সেস অস্বীকৃত</h3>
            <p className="text-gray-600">শুধুমাত্র প্রধান এডমিন এই পাতা দেখতে পারেন</p>
            <p className="text-sm text-blue-600 mt-2">
              প্রধান এডমিন: মুহিব্বুর রহমান শাওন
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('পাসওয়ার্ড দুটি মিলছে না!')
      return
    }

    if (formData.password.length < 6) {
      alert('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!')
      return
    }

    if (admins.some(admin => admin.userId === formData.userId)) {
      alert('এই ইউজার আইডি ইতিমধ্যে ব্যবহৃত হয়েছে!')
      return
    }

    const newAdmin: User = {
      id: Date.now().toString(),
      userId: formData.userId,
      password: formData.password,
      name: formData.name,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setAdmins([...admins, newAdmin])
    setFormData({ name: '', userId: '', password: '', confirmPassword: '' })
    setShowAddForm(false)
    alert(`নতুন এডমিন "${formData.name}" সফলভাবে যোগ করা হয়েছে!`)
  }

  const handleDeleteAdmin = (adminId: string) => {
    const adminToDelete = admins.find(a => a.id === adminId)
    
    if (!adminToDelete) return
    
    if (adminToDelete.role === 'super_admin') {
      alert('প্রধান এডমিনকে মুছে ফেলা যাবে না!')
      return
    }

    if (confirm(`আপনি কি নিশ্চিত যে "${adminToDelete.name}" কে এডমিন তালিকা থেকে সরাতে চান?`)) {
      setAdmins(admins.filter(a => a.id !== adminId))
      alert('এডমিন সফলভাবে সরানো হয়েছে!')
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">এডমিন ব্যবস্থাপনা</h1>
          <p className="text-gray-600">সিস্টেম এডমিনদের তালিকা ও নতুন এডমিন যোগ করুন</p>
          <p className="text-sm text-red-600 font-medium">
            প্রধান এডমিন: {user?.name}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={() => setShowPasswordLogs(!showPasswordLogs)}
            variant="outline"
            className="bg-transparent"
          >
            <Key className="h-4 w-4 mr-2" />
            পাসওয়ার্ড লগ
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            নতুন এডমিন
          </Button>
        </div>
      </div>

      {/* Super Admin Info */}
      <Card className="mb-6 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <Shield className="h-5 w-5 mr-2" />
            প্রধান এডমিন তথ্য
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800">{user?.name}</h3>
              <p className="text-sm text-red-600">ইউজার আইডি: {user?.userId}</p>
              <p className="text-xs text-red-500">
                ২০২৩ সালে প্রতিষ্ঠিত ফ্রেন্ডস এসোসিয়েশনের প্রধান এডমিন
              </p>
              <Badge className="mt-2 bg-red-100 text-red-800">
                সর্বোচ্চ নিয়ন্ত্রণ ক্ষমতা
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change Logs */}
      {showPasswordLogs && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              পাসওয়ার্ড পরিবর্তনের লগ
            </CardTitle>
          </CardHeader>
          <CardContent>
            {passwordChangeLogs.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">কোনো পাসওয়ার্ড পরিবর্তনের রেকর্ড নেই</p>
              </div>
            ) : (
              <div className="space-y-3">
                {passwordChangeLogs.map((log) => (
                  <div key={log.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{log.userName}</h4>
                        <p className="text-sm text-gray-600">
                          ইউজার আইডি: {log.userId} | 
                          ভূমিকা: {log.userRole === 'admin' ? 'এডমিন' : 'সদস্য'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {log.changedAt.toLocaleString('bn-BD')}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        পাসওয়ার্ড পরিবর্তিত
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Admin Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>নতুন এডমিন যোগ করুন</CardTitle>
            <p className="text-sm text-gray-600">
              প্রধান এডমিন {user?.name} নতুন এডমিন নিযুক্ত করছেন
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">নাম *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="এডমিনের নাম লিখুন"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="userId">ইউজার আইডি *</Label>
                  <Input
                    id="userId"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    placeholder="admin2, admin_name ইত্যাদি"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">পাসওয়ার্ড *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="কমপক্ষে ৬ অক্ষর"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন *</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="পাসওয়ার্ড আবার লিখুন"
                    required
                  />
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-700">
                    <strong>সতর্কতা:</strong> নতুন এডমিনের সকল ধরনের অ্যাক্সেস থাকবে যেমন সদস্য ব্যবস্থাপনা, 
                    আর্থিক রিপোর্ট ইত্যাদি। তবে তারা অন্য এডমিন যোগ/ডিলেট করতে পারবে না।
                    শুধুমাত্র আপনি ({user?.name}) এই অধিকার রাখেন।
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button type="submit">
                  <UserCheck className="h-4 w-4 mr-2" />
                  এডমিন যোগ করুন
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false)
                    setFormData({ name: '', userId: '', password: '', confirmPassword: '' })
                  }}
                >
                  বাতিল
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Admin List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            বর্তমান এডমিনগণ ({admins.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {admins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${admin.role === 'super_admin' ? 'bg-red-100' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
                    <Shield className={`h-6 w-6 ${admin.role === 'super_admin' ? 'text-red-600' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{admin.name}</h3>
                    <p className="text-sm text-gray-600">ইউজার আইডি: {admin.userId}</p>
                    <p className="text-xs text-gray-500">
                      যোগদান: {admin.createdAt.toLocaleDateString('bn-BD')}
                    </p>
                    {admin.passwordChangedAt && (
                      <p className="text-xs text-blue-600">
                        পাসওয়ার্ড পরিবর্তন: {admin.passwordChangedAt.toLocaleDateString('bn-BD')}
                      </p>
                    )}
                    {admin.role === 'super_admin' && (
                      <p className="text-xs text-red-600 font-medium">
                        ফ্রেন্ডস এসোসিয়েশন প্রতিষ্ঠাতা ও প্রধান এডমিন
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={admin.role === 'super_admin' ? 'destructive' : 'default'}
                    className={admin.role === 'super_admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}
                  >
                    {admin.role === 'super_admin' ? 'প্রধান এডমিন' : 'সক্রিয় এডমিন'}
                  </Badge>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    {admin.role !== 'super_admin' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admin Privileges */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>এডমিন ভূমিকা ও অধিকার</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-800 mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                প্রধান এডমিন ({user?.name})
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• সকল সাধারণ এডমিনের অধিকার</li>
                <li>• নতুন এডমিন যোগ করা</li>
                <li>• অন্যান্য এডমিন ডিলেট করা</li>
                <li>• আর্থিক বছর বন্ধ করা</li>
                <li>• পাসওয়ার্ড পরিবর্তনের লগ দেখা</li>
                <li>• সিস্টেমের সর্বোচ্চ নিয়ন্ত্রণ</li>
                <li>• ফ্রেন্ডস এসোসিয়েশনের প্রতিষ্ঠাতা</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                <UserCheck className="h-4 w-4 mr-2" />
                সাধারণ এডমিন
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• সদস্য ব্যবস্থাপনা (যোগ/সম্পাদনা)</li>
                <li>• চাঁদা আদায় এন্ট্রি</li>
                <li>• আর্থিক রিপোর্ট তৈরি</li>
                <li>• নোটিশ বোর্ড ব্যবস্থাপনা</li>
                <li>• সদস্যদের মেসেজের জবাব</li>
                <li>• রিপোর্ট প্রিন্ট ও ডাউনলোড</li>
                <li>• প্রধান এডমিন কর্তৃক নিযুক্ত</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

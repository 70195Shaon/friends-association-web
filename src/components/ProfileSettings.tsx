/**
 * Profile Settings Component
 * User profile management and password change functionality
 */
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { 
  User, 
  Lock, 
  Camera, 
  Phone, 
  MapPin, 
  Mail, 
  Calendar,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function ProfileSettings() {
  const { user, updatePassword } = useAuth()
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  // Sample member data - in real app this would come from database
  const memberData = {
    memberNumber: user?.memberNumber || 1,
    name: user?.name || 'মো: আকতার হোসেন',
    type: 'permanent',
    joinDate: new Date('2024-08-01'),
    monthlyDues: 500,
    phone: '01700000001',
    address: 'ঢাকা, বাংলাদেশ',
    email: 'aktar@email.com',
    isActive: true,
    totalPaid: 5500,
    pendingAmount: 500
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'নতুন পাসওয়ার্ড দুটি মিলছে না' })
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' })
      return
    }

    if (passwordForm.currentPassword !== user?.password) {
      setMessage({ type: 'error', text: 'বর্তমান পাসওয়ার্ড ভুল' })
      return
    }

    // Update password
    const success = await updatePassword(passwordForm.newPassword)
    if (success) {
      setMessage({ type: 'success', text: 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে' })
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setIsChangingPassword(false)
    } else {
      setMessage({ type: 'error', text: 'পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে' })
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">প্রোফাইল সেটিংস</h1>
        <p className="text-gray-600">আপনার প্রোফাইল তথ্য ও সেটিংস</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>ব্যক্তিগত তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847778f2d3a0ac8dc62024/resource/504669c7-423c-4ae8-a722-92e5bb8f3b7a.jpg" />
                  <AvatarFallback className="text-xl">
                    {memberData.name.split(' ')[0].charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{memberData.name}</h3>
                  <p className="text-gray-600">সদস্য #{memberData.memberNumber}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Camera className="h-4 w-4 mr-2" />
                    ছবি পরিবর্তন করুন
                  </Button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">নাম</label>
                  <Input value={memberData.name} disabled />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">সদস্য নম্বর</label>
                  <Input value={memberData.memberNumber.toString()} disabled />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">ফোন নম্বর</label>
                  <Input value={memberData.phone} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">ইমেইল</label>
                  <Input type="email" value={memberData.email} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">ঠিকানা</label>
                  <Input value={memberData.address} />
                </div>
              </div>

              {/* Membership Info */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">সদস্যপদ তথ্য</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">সদস্যের ধরন</p>
                      <Badge variant="default">
                        {memberData.type === 'permanent' ? 'স্থায়ী সদস্য' : 'প্রাথমিক সদস্য'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">যোগদানের তারিখ</p>
                      <p className="font-medium">{memberData.joinDate.toLocaleDateString('bn-BD')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  তথ্য আপডেট করুন
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>পাসওয়ার্ড পরিবর্তন</span>
                {!isChangingPassword && (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsChangingPassword(true)}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    পাসওয়ার্ড পরিবর্তন করুন
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            {isChangingPassword && (
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  {message && (
                    <div className={`p-3 rounded-md flex items-center space-x-2 ${
                      message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      {message.type === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className={message.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                        {message.text}
                      </span>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">বর্তমান পাসওয়ার্ড</label>
                    <div className="relative">
                      <Input
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      >
                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">নতুন পাসওয়ার্ড</label>
                    <div className="relative">
                      <Input
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      >
                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                    <div className="relative">
                      <Input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button type="submit">
                      পাসওয়ার্ড পরিবর্তন করুন
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsChangingPassword(false)
                        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
                        setMessage(null)
                      }}
                    >
                      বাতিল
                    </Button>
                  </div>
                </form>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Account Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>একাউন্ট সারসংক্ষেপ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">মোট পরিশোধিত</span>
                  <span className="font-bold text-green-800">৳{memberData.totalPaid.toLocaleString('bn-BD')}</span>
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-700">বকেয়া</span>
                  <span className="font-bold text-red-800">৳{memberData.pendingAmount.toLocaleString('bn-BD')}</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">মাসিক চাঁদা</span>
                  <span className="font-bold text-blue-800">৳{memberData.monthlyDues.toLocaleString('bn-BD')}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-700">সক্রিয় সদস্য</span>
                </div>
                <p className="text-xs text-gray-600">
                  আপনার সদস্যপদ সক্রিয় রয়েছে এবং সকল সুবিধা উপভোগ করতে পারবেন।
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Admin */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>সাহায্য প্রয়োজন?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                কোনো সমস্যা বা প্রশ্ন থাকলে অ্যাডমিনের সাথে যোগাযোগ করুন।
              </p>
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                অ্যাডমিনকে বার্তা পাঠান
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

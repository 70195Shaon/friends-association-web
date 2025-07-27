/**
 * Financial Year Management Component
 * Handles closing current financial year and starting new one with admin password
 */
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Calendar, 
  Lock, 
  AlertTriangle,
  CheckCircle,
  Download,
  Eye,
  EyeOff
} from 'lucide-react'

export default function FinancialYearManagement() {
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Current financial year data
  const currentYear = {
    id: '2025-2026',
    startMonth: 'আগস্ট',
    startYear: 2025,
    endMonth: 'জুলাই',
    endYear: 2026,
    isActive: true,
    totalIncome: 175000,
    totalExpense: 125000,
    balance: 50000,
    totalMembers: 35,
    membersWithDues: 33, // Members who have paid all dues
    progress: 94 // Percentage of completion
  }

  const handleCloseFinancialYear = async () => {
    if (password !== 'admin123') {
      alert('ভুল এডমিন পাসওয়ার্ড!')
      return
    }

    if (currentYear.membersWithDues < currentYear.totalMembers) {
      const remainingMembers = currentYear.totalMembers - currentYear.membersWithDues
      const confirmClose = confirm(
        `এখনও ${remainingMembers} জন সদস্যের চাঁদা বাকি রয়েছে। আপনি কি নিশ্চিত যে আর্থিক বছর বন্ধ করতে চান?`
      )
      if (!confirmClose) return
    }

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      alert(`আর্থিক বছর ${currentYear.startYear}-${currentYear.endYear} সফলভাবে বন্ধ করা হয়েছে!

📊 চূড়ান্ত রিপোর্ট:
• মোট আয়: ৳${currentYear.totalIncome.toLocaleString('bn-BD')}
• মোট ব্যয়: ৳${currentYear.totalExpense.toLocaleString('bn-BD')}
• নিট ব্যালেন্স: ৳${currentYear.balance.toLocaleString('bn-BD')}

🆕 নতুন আর্থিক বছর শুরু হয়েছে: ${currentYear.endYear}-${currentYear.endYear + 1}`)
      
      setIsProcessing(false)
      setShowPasswordForm(false)
      setPassword('')
    }, 2000)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">আর্থিক বছর ব্যবস্থাপনা</h1>
        <p className="text-gray-600">বর্তমান আর্থিক বছর বন্ধ করে নতুন বছর শুরু করুন</p>
      </div>

      {/* Current Financial Year Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              বর্তমান আর্থিক বছর
            </span>
            <Badge variant="default" className="bg-green-100 text-green-800">সক্রিয়</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {currentYear.startYear}-{currentYear.endYear}
              </div>
              <div className="text-sm text-blue-700">
                {currentYear.startMonth} {currentYear.startYear} - {currentYear.endMonth} {currentYear.endYear}
              </div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ৳{currentYear.totalIncome.toLocaleString('bn-BD')}
              </div>
              <div className="text-sm text-green-700">মোট আয়</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                ৳{currentYear.totalExpense.toLocaleString('bn-BD')}
              </div>
              <div className="text-sm text-red-700">মোট ব্যয়</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                ৳{currentYear.balance.toLocaleString('bn-BD')}
              </div>
              <div className="text-sm text-purple-700">নিট ব্যালেন্স</div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">চাঁদা আদায়ের অগ্রগতি</span>
              <span className="text-sm text-gray-500">{currentYear.membersWithDues}/{currentYear.totalMembers} সদস্য</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full" 
                style={{ width: `${currentYear.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{currentYear.progress}% সম্পন্ন</p>
          </div>

          {/* Warnings */}
          {currentYear.membersWithDues < currentYear.totalMembers && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">সতর্কতা</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    এখনও {currentYear.totalMembers - currentYear.membersWithDues} জন সদস্যের চাঁদা বকেয়া রয়েছে। 
                    আর্থিক বছর বন্ধ করার আগে সকল সদস্যের চাঁদা আদায় করার পরামর্শ দেওয়া হচ্ছে।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              onClick={() => setShowPasswordForm(true)}
              variant={currentYear.membersWithDues === currentYear.totalMembers ? "default" : "destructive"}
              disabled={isProcessing}
            >
              <Lock className="h-4 w-4 mr-2" />
              আর্থিক বছর বন্ধ করুন
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              বার্ষিক রিপোর্ট ডাউনলোড
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password Confirmation Form */}
      {showPasswordForm && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              এডমিন অনুমোদন প্রয়োজন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">গুরুত্বপূর্ণ সতর্কতা</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• আর্থিক বছর বন্ধ করার পর আর কোনো পরিবর্তন করা যাবে না</li>
                  <li>• সকল রিপোর্ট চূড়ান্ত হয়ে যাবে</li>
                  <li>• নতুন আর্থিক বছর স্বয়ংক্রিয়ভাবে শুরু হবে</li>
                  <li>• এই কাজটি শুধুমাত্র মূল এডমিন করতে পারবেন</li>
                </ul>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  এডমিন পাসওয়ার্ড *
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="এডমিন পাসওয়ার্ড লিখুন"
                    className="pr-10"
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

              <div className="flex space-x-3">
                <Button 
                  onClick={handleCloseFinancialYear}
                  disabled={!password || isProcessing}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      প্রক্রিয়াকরণ...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      নিশ্চিত করুন
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowPasswordForm(false)
                    setPassword('')
                  }}
                  disabled={isProcessing}
                >
                  বাতিল
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previous Financial Years */}
      <Card>
        <CardHeader>
          <CardTitle>পূর্ববর্তী আর্থিক বছরসমূহ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">২০২৪-২০২৫</h4>
                <p className="text-sm text-gray-600">আগস্ট ২০২৪ - জুলাই ২০২৫</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary">সম্পন্ন</Badge>
                <div className="text-sm text-gray-600 mt-1">
                  নিট ব্যালেন্স: ৳২৫,০০০
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
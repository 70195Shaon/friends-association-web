/**
 * Dues History Component
 * Shows member's payment history - CLEAN with no demo data
 */
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Payment } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  DollarSign, 
  Calendar, 
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  FileText,
  TrendingUp
} from 'lucide-react'

export default function DuesHistory() {
  const { user } = useAuth()

  // CLEAN payment history - will only show admin entered data
  const [paymentHistory] = useState<Payment[]>([])

  // Calculate statistics from actual payment data
  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)
  const monthlyDuesPaid = paymentHistory
    .filter(p => p.type === 'monthly_dues')
    .reduce((sum, payment) => sum + payment.amount, 0)
  const developmentFeesPaid = paymentHistory
    .filter(p => p.type === 'development_fee')
    .reduce((sum, payment) => sum + payment.amount, 0)
  const otherFeesPaid = paymentHistory
    .filter(p => p.type === 'other')
    .reduce((sum, payment) => sum + payment.amount, 0)

  const monthlyDuesAmount = 500
  const paidMonths = Math.floor(monthlyDuesPaid / monthlyDuesAmount)
  const pendingAmount = monthlyDuesAmount // Assuming current month is pending

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">পরিশোধিত</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">অপেক্ষমাণ</Badge>
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">বকেয়া</Badge>
      default:
        return <Badge variant="secondary">অজানা</Badge>
    }
  }

  const getTypeText = (type: string, otherFeeDescription?: string) => {
    switch (type) {
      case 'monthly_dues':
        return 'মাসিক চাঁদা'
      case 'development_fee':
        return 'উন্নয়ন ফি'
      case 'other':
        return otherFeeDescription || 'অন্যান্য ফি'
      default:
        return 'অজানা'
    }
  }

  const handleDownloadReport = () => {
    if (paymentHistory.length === 0) {
      alert('কোনো পেমেন্ট ডেটা নেই রিপোর্ট তৈরি করার জন্য')
      return
    }
    
    // In a real app, this would generate and download a PDF
    alert('পেমেন্ট রিপোর্ট ডাউনলোড ফিচার শীঘ্রই যোগ করা হবে')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">চাঁদার বিবরণী</h1>
        <p className="text-gray-600">আপনার পেমেন্ট ইতিহাস ও বকেয়া তথ্য</p>
        <p className="text-sm text-blue-600">সদস্য #{user?.memberNumber} - {user?.name}</p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">মাসিক চাঁদা</p>
                <p className="text-2xl font-bold text-gray-900">৳{monthlyDuesAmount}</p>
                <p className="text-xs text-gray-500">প্রতি মাসের ৮ তারিখের মধ্যে</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">মোট পরিশোধিত</p>
                <p className="text-2xl font-bold text-gray-900">৳{totalPaid.toLocaleString('bn-BD')}</p>
                <p className="text-xs text-gray-500">{paidMonths} মাস চাঁদা</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">বর্তমান বকেয়া</p>
                <p className="text-2xl font-bold text-gray-900">৳{pendingAmount.toLocaleString('bn-BD')}</p>
                <p className="text-xs text-gray-500">দ্রুত পরিশোধ করুন</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">অন্যান্য ফি</p>
                <p className="text-2xl font-bold text-gray-900">৳{otherFeesPaid.toLocaleString('bn-BD')}</p>
                <p className="text-xs text-gray-500">বিশেষ প্রকল্প</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>পেমেন্ট ইতিহাস</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDownloadReport}
                  disabled={paymentHistory.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  রিপোর্ট ডাউনলোড
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {paymentHistory.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">কোনো পেমেন্ট এন্ট্রি নেই</h3>
                  <p className="text-gray-600 mb-4">
                    এডমিন আপনার চাঁদা এন্ট্রি করলে এখানে দেখতে পাবেন
                  </p>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
                    <h4 className="font-medium text-yellow-800 mb-2">চাঁদা পরিশোধের নিয়ম</h4>
                    <ul className="text-sm text-yellow-700 space-y-1 text-left">
                      <li>• প্রতি মাসের ৮ তারিখের মধ্যে চাঁদা দিন</li>
                      <li>• এডমিনের হাতে সরাসরি প্রদান করুন</li>
                      <li>• এডমিন সিস্টেমে এন্ট্রি করে দেবেন</li>
                      <li>• তারপর এখানে দেখতে পাবেন</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(payment.status)}
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {getTypeText(payment.type, payment.otherFeeDescription)}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {payment.month} {payment.year} - {payment.date.toLocaleDateString('bn-BD')}
                          </p>
                          {payment.notes && (
                            <p className="text-sm text-gray-600 mt-1">{payment.notes}</p>
                          )}
                          <p className="text-xs text-green-600">গ্রহণকারী: {payment.receivedBy}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          ৳{payment.amount.toLocaleString('bn-BD')}
                        </div>
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment Breakdown */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>পেমেন্ট ব্রেকডাউন</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-700">মাসিক চাঁদা</span>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-xl font-bold text-blue-800">৳{monthlyDuesPaid.toLocaleString('bn-BD')}</span>
                <p className="text-xs text-blue-600 mt-1">{paidMonths} মাস পরিশোধিত</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-700">উন্নয়ন ফি</span>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-xl font-bold text-purple-800">৳{developmentFeesPaid.toLocaleString('bn-BD')}</span>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-700">অন্যান্য ফি</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-xl font-bold text-green-800">৳{otherFeesPaid.toLocaleString('bn-BD')}</span>
                <p className="text-xs text-green-600 mt-1">বিশেষ প্রকল্প</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">মোট পরিশোধিত</span>
                  <span className="text-2xl font-bold text-gray-900">৳{totalPaid.toLocaleString('bn-BD')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>পেমেন্ট নির্দেশনা</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span>প্রতি মাসের ৮ তারিখের মধ্যে</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span>মাসিক চাঁদা: ৳৫০০</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>এডমিনের হাতে সরাসরি প্রদান</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span>বিলম্বে অতিরিক্ত ফি হতে পারে</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
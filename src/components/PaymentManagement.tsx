/**
 * Payment Management Component
 * Handles all types of payments with edit/delete functionality
 */
import React, { useState } from 'react'
import { Member, Payment, OtherFee } from '../types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { 
  DollarSign, 
  Plus, 
  Calendar, 
  User,
  CheckCircle,
  AlertCircle,
  Receipt,
  ArrowLeft,
  Edit,
  Trash2
} from 'lucide-react'

interface PaymentManagementProps {
  member: Member
  onClose: () => void
  onPaymentSave: () => void
}

export default function PaymentManagement({ member, onClose, onPaymentSave }: PaymentManagementProps) {
  const [paymentType, setPaymentType] = useState<'monthly_dues' | 'development_fee' | 'other'>('monthly_dues')
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null)
  const [paymentData, setPaymentData] = useState({
    amount: paymentType === 'monthly_dues' ? member.monthlyDues : 0,
    month: new Date().toLocaleString('bn-BD', { month: 'long' }),
    year: new Date().getFullYear(),
    otherFeeDescription: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  })

  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  // CLEAN payment history - only admin entered data will show
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([])

  const handlePaymentTypeChange = (type: 'monthly_dues' | 'development_fee' | 'other') => {
    setPaymentType(type)
    setPaymentData({
      ...paymentData,
      amount: type === 'monthly_dues' ? member.monthlyDues : 
              type === 'development_fee' ? member.developmentFee : 0,
      otherFeeDescription: type === 'other' ? paymentData.otherFeeDescription : ''
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingPayment) {
      // Update existing payment
      const updatedPayment: Payment = {
        ...editingPayment,
        amount: paymentData.amount,
        month: paymentData.month,
        year: paymentData.year,
        type: paymentType,
        otherFeeDescription: paymentType === 'other' ? paymentData.otherFeeDescription : undefined,
        date: new Date(paymentData.date),
        notes: paymentData.notes,
        updatedAt: new Date()
      }
      
      setPaymentHistory(paymentHistory.map(p => 
        p.id === editingPayment.id ? updatedPayment : p
      ))
      
      alert(`${member.name} এর পেমেন্ট তথ্য আপডেট করা হয়েছে`)
      setEditingPayment(null)
    } else {
      // Add new payment
      const payment: Payment = {
        id: Date.now().toString(),
        memberId: member.id,
        memberNumber: member.memberNumber,
        memberName: member.name,
        amount: paymentData.amount,
        month: paymentData.month,
        year: paymentData.year,
        type: paymentType,
        otherFeeDescription: paymentType === 'other' ? paymentData.otherFeeDescription : undefined,
        date: new Date(paymentData.date),
        receivedBy: 'admin',
        notes: paymentData.notes,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      setPaymentHistory([payment, ...paymentHistory])
      alert(`${member.name} এর জন্য ৳${paymentData.amount} টাকা পেমেন্ট যোগ করা হয়েছে`)
    }

    // Reset form
    setPaymentData({
      amount: paymentType === 'monthly_dues' ? member.monthlyDues : 0,
      month: new Date().toLocaleString('bn-BD', { month: 'long' }),
      year: new Date().getFullYear(),
      otherFeeDescription: '',
      notes: '',
      date: new Date().toISOString().split('T')[0]
    })
    
    onPaymentSave()
  }

  const handleEditPayment = (payment: Payment) => {
    setEditingPayment(payment)
    setPaymentType(payment.type)
    setPaymentData({
      amount: payment.amount,
      month: payment.month,
      year: payment.year,
      otherFeeDescription: payment.otherFeeDescription || '',
      notes: payment.notes,
      date: payment.date.toISOString().split('T')[0]
    })
  }

  const handleDeletePayment = (paymentId: string) => {
    const payment = paymentHistory.find(p => p.id === paymentId)
    if (payment && confirm(`আপনি কি নিশ্চিত যে এই পেমেন্ট এন্ট্রি মুছে ফেলতে চান?\n\nপরিমাণ: ৳${payment.amount}\nমাস: ${payment.month} ${payment.year}`)) {
      setPaymentHistory(paymentHistory.filter(p => p.id !== paymentId))
      alert('পেমেন্ট এন্ট্রি মুছে ফেলা হয়েছে')
    }
  }

  const getPaymentTypeText = (type: string) => {
    switch (type) {
      case 'monthly_dues': return 'মাসিক চাঁদা'
      case 'development_fee': return 'উন্নয়ন ফি'
      case 'other': return 'অন্যান্য ফি'
      default: return 'অজানা'
    }
  }

  // Calculate totals from actual payment history
  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)
  const monthlyDuesPaid = paymentHistory
    .filter(p => p.type === 'monthly_dues')
    .reduce((sum, payment) => sum + payment.amount, 0)
  const otherFeesPaid = paymentHistory
    .filter(p => p.type === 'other')
    .reduce((sum, payment) => sum + payment.amount, 0)
  const developmentFeesPaid = paymentHistory
    .filter(p => p.type === 'development_fee')
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button onClick={onClose} variant="outline" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          ফিরে যান
        </Button>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
            <p className="text-gray-600">সদস্য #{member.memberNumber} - চাঁদা আদায় ব্যবস্থাপনা</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                {editingPayment ? 'পেমেন্ট সম্পাদনা করুন' : 'চাঁদা আদায় যোগ করুন'}
              </CardTitle>
              <p className="text-sm text-gray-600">
                {editingPayment 
                  ? 'পেমেন্টের তথ্য আপডেট করুন'
                  : 'সদস্য হাতে চাঁদা দিলে এখানে এন্ট্রি করুন। প্রতি মাসের ৮ তারিখের মধ্যে চাঁদা পরিশোধ করতে হবে।'
                }
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>পেমেন্টের ধরন *</Label>
                  <Select value={paymentType} onValueChange={handlePaymentTypeChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly_dues">মাসিক চাঁদা</SelectItem>
                      <SelectItem value="development_fee">উন্নয়ন ফি</SelectItem>
                      <SelectItem value="other">অন্যান্য ফি</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentType === 'other' && (
                  <div>
                    <Label htmlFor="otherFeeDescription">ফি এর বিবরণ *</Label>
                    <Input
                      id="otherFeeDescription"
                      value={paymentData.otherFeeDescription}
                      onChange={(e) => setPaymentData({ ...paymentData, otherFeeDescription: e.target.value })}
                      placeholder="যেমন: বার্ষিক অনুষ্ঠান ফি, মসজিদ নির্মাণ চাঁদা"
                      required
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>মাস</Label>
                    <Select value={paymentData.month} onValueChange={(value) => setPaymentData({ ...paymentData, month: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>{month}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>বছর</Label>
                    <Select value={paymentData.year.toString()} onValueChange={(value) => setPaymentData({ ...paymentData, year: parseInt(value) })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="amount">পরিমাণ (টাকা) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData({ ...paymentData, amount: parseInt(e.target.value) || 0 })}
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="date">প্রদানের তারিখ</Label>
                  <Input
                    id="date"
                    type="date"
                    value={paymentData.date}
                    onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">মন্তব্য</Label>
                  <Textarea
                    id="notes"
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                    placeholder="অতিরিক্ত মন্তব্য (যেমন: হাতে প্রদান, ব্যাংক ট্রান্সফার ইত্যাদি)"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button type="submit" className="flex-1">
                    <Receipt className="h-4 w-4 mr-2" />
                    {editingPayment ? 'আপডেট করুন' : 'চাঁদা আদায় সংরক্ষণ করুন'}
                  </Button>
                  {editingPayment && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setEditingPayment(null)
                        setPaymentData({
                          amount: paymentType === 'monthly_dues' ? member.monthlyDues : 0,
                          month: new Date().toLocaleString('bn-BD', { month: 'long' }),
                          year: new Date().getFullYear(),
                          otherFeeDescription: '',
                          notes: '',
                          date: new Date().toISOString().split('T')[0]
                        })
                      }}
                    >
                      বাতিল
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>চাঁদা আদায়ের ইতিহাস</CardTitle>
            </CardHeader>
            <CardContent>
              {paymentHistory.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">কোনো পেমেন্ট এন্ট্রি নেই</h3>
                  <p className="text-gray-600">প্রথম পেমেন্ট এন্ট্রি করুন</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {getPaymentTypeText(payment.type)}
                            {payment.otherFeeDescription && ` - ${payment.otherFeeDescription}`}
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
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            ৳{payment.amount.toLocaleString('bn-BD')}
                          </div>
                          <Badge className="bg-green-100 text-green-800">আদায় সম্পন্ন</Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditPayment(payment)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeletePayment(payment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>চাঁদার সারসংক্ষেপ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-700">মাসিক চাঁদা</span>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-xl font-bold text-blue-800">৳{member.monthlyDues.toLocaleString('bn-BD')}</span>
                <p className="text-xs text-blue-600 mt-1">প্রতি মাসের ৮ তারিখের মধ্যে</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-700">মোট আদায়</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-xl font-bold text-green-800">৳{totalPaid.toLocaleString('bn-BD')}</span>
                <div className="text-xs text-green-600 mt-1">
                  চাঁদা: ৳{monthlyDuesPaid.toLocaleString('bn-BD')} | উন্নয়ন: ৳{developmentFeesPaid.toLocaleString('bn-BD')} | অন্যান্য: ৳{otherFeesPaid.toLocaleString('bn-BD')}
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-red-700">মাসিক বকেয়া</span>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
                <span className="text-xl font-bold text-red-800">
                  ৳{Math.max(0, member.monthlyDues - (monthlyDuesPaid % member.monthlyDues)).toLocaleString('bn-BD')}
                </span>
                <div className="text-xs text-red-600 mt-1">বর্তমান মাসের জন্য</div>
              </div>

              {/* Payment Instructions */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">চাঁদা প্রদানের নিয়ম</h4>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• প্রতি মাসের ৮ তারিখের মধ্যে চাঁদা পরিশোধ করতে হবে</li>
                  <li>• সদস্য এডমিনের হাতে চাঁদা প্রদান করবেন</li>
                  <li>• এডমিন সিস্টেমে এন্ট্রি করে দেবেন</li>
                  <li>• সদস্য তার প্রোফাইলে আদায়ের তথ্য দেখতে পাবেন</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
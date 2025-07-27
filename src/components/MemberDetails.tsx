/**
 * Member Details Component
 * Detailed view of member information and payment history
 */
import React from 'react'
import { Member, Payment } from '../types'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { 
  ArrowLeft, 
  Edit, 
  Phone, 
  MapPin, 
  Mail, 
  Calendar,
  DollarSign,
  User,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react'

interface MemberDetailsProps {
  member: Member
  onClose: () => void
  onEdit: () => void
  onPaymentManage?: () => void
}

export default function MemberDetails({ member, onClose, onEdit, onPaymentManage }: MemberDetailsProps) {
  // Sample payment history for this member
  const paymentHistory: Payment[] = [
    {
      id: '1',
      memberId: member.id,
      memberNumber: member.memberNumber,
      memberName: member.name,
      amount: 500,
      month: 'আগস্ট',
      year: 2025,
      type: 'monthly_dues',
      date: new Date('2025-08-05'),
      receivedBy: 'admin',
      notes: 'নিয়মিত মাসিক চাঁদা - হাতে প্রদান',
      status: 'paid'
    },
    {
      id: '2',
      memberId: member.id,
      memberNumber: member.memberNumber,
      memberName: member.name,
      amount: 500,
      month: 'সেপ্টেম্বর',
      year: 2025,
      type: 'monthly_dues',
      date: new Date('2025-09-03'),
      receivedBy: 'admin',
      notes: 'নিয়মিত মাসিক চাঁদা - হাতে প্রদান',
      status: 'paid'
    },
    {
      id: '3',
      memberId: member.id,
      memberNumber: member.memberNumber,
      memberName: member.name,
      amount: 500,
      month: 'অক্টোবর',
      year: 2025,
      type: 'monthly_dues',
      date: new Date('2025-10-07'),
      receivedBy: 'admin',
      notes: 'নিয়মিত মাসিক চাঁদা - হাতে প্রদান',
      status: 'paid'
    },
    {
      id: '4',
      memberId: member.id,
      memberNumber: member.memberNumber,
      memberName: member.name,
      amount: 500,
      month: 'নভেম্বর',
      year: 2025,
      type: 'monthly_dues',
      date: new Date('2025-11-05'),
      receivedBy: 'admin',
      notes: 'নিয়মিত মাসিক চাঁদা - হাতে প্রদান',
      status: 'paid'
    },
    {
      id: '5',
      memberId: member.id,
      memberNumber: member.memberNumber,
      memberName: member.name,
      amount: 500,
      month: 'ডিসেম্বর',
      year: 2025,
      type: 'monthly_dues',
      date: new Date('2025-12-08'),
      receivedBy: 'admin',
      notes: 'বকেয়া চাঁদা - ৮ তারিখের পর',
      status: 'overdue'
    },
    {
      id: '6',
      memberId: member.id,
      memberNumber: member.memberNumber,
      memberName: member.name,
      amount: 1000,
      month: 'সেপ্টেম্বর',
      year: 2025,
      type: 'other',
      otherFeeDescription: 'বার্ষিক অনুষ্ঠান ফি',
      date: new Date('2025-09-15'),
      receivedBy: 'admin',
      notes: 'বার্ষিক অনুষ্ঠানের জন্য বিশেষ ফি - হাতে প্রদান',
      status: 'paid'
    }
  ]

  const totalPaid = paymentHistory.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0)
  const totalPending = paymentHistory.filter(p => p.status !== 'paid').reduce((sum, payment) => sum + payment.amount, 0)

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

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button onClick={onClose} variant="outline" className="mb-4 bg-transparent">
          <ArrowLeft className="h-4 w-4 mr-2" />
          ফিরে যান
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">সদস্যের বিস্তারিত তথ্য</h1>
            <p className="text-gray-600">সদস্য #{member.memberNumber} এর সম্পূর্ণ প্রোফাইল</p>
          </div>
          <div className="flex space-x-3">
            {onPaymentManage && (
              <Button onClick={onPaymentManage} variant="outline" className="bg-transparent">
                <DollarSign className="h-4 w-4 mr-2" />
                চাঁদা আদায়
              </Button>
            )}
            <Button onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              সম্পাদনা
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Member Profile */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>ব্যক্তিগত তথ্য</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={member.profilePicture || "https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847778f2d3a0ac8dc62024/resource/908a45b6-c069-4b6f-b7d5-80ff58a9b667.jpg"} />
                  <AvatarFallback className="text-2xl">
                    {member.name.split(' ')[0].charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                    <Badge variant={member.type === 'permanent' ? 'default' : 'secondary'}>
                      {member.type === 'permanent' ? 'স্থায়ী সদস্য' : 'প্রাথমিক সদস্য'}
                    </Badge>
                    <Badge variant={member.isActive ? 'default' : 'secondary'}>
                      {member.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>সদস্য নম্বর: #{member.memberNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>যোগদান: {member.joinDate.toLocaleDateString('bn-BD')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{member.email || 'ইমেইল নেই'}</span>
                    </div>
                    <div className="flex items-start space-x-2 md:col-span-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <span>{member.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {member.comments && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">মন্তব্য</h4>
                  <p className="text-gray-700">{member.comments}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>পেমেন্ট ইতিহাস</CardTitle>
              <p className="text-sm text-gray-600">
                এডমিন কর্তৃক যোগ করা চাঁদা ও অন্যান্য ফি এর তথ্য। প্রতি মাসের ৮ তারিখের মধ্যে চাঁদা পরিশোধ করতে হবে।
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(payment.status)}
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {getTypeText(payment.type, payment.otherFeeDescription)} - {payment.month} {payment.year}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {payment.date.toLocaleDateString('bn-BD')} | গ্রহণকারী: {payment.receivedBy}
                        </p>
                        {payment.notes && (
                          <p className="text-sm text-gray-600 mt-1">{payment.notes}</p>
                        )}
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
            </CardContent>
          </Card>
        </div>

        {/* Financial Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>আর্থিক সারসংক্ষেপ</CardTitle>
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
                  <span className="text-sm text-green-700">মোট পরিশোধিত</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-xl font-bold text-green-800">৳{totalPaid.toLocaleString('bn-BD')}</span>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-red-700">মোট বকেয়া</span>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
                <span className="text-xl font-bold text-red-800">৳{totalPending.toLocaleString('bn-BD')}</span>
              </div>

              {member.developmentFee > 0 && (
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-yellow-700">উন্নয়ন ফি</span>
                  </div>
                  <span className="text-lg font-semibold text-yellow-800">৳{member.developmentFee.toLocaleString('bn-BD')}</span>
                </div>
              )}

              {member.otherFees > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">অন্যান্য ফি</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">৳{member.otherFees.toLocaleString('bn-BD')}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Login Information */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>লগইন তথ্য</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">ইউজার আইডি</label>
                  <p className="font-medium">{member.userId}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">স্ট্যাটাস</label>
                  <div className="mt-1">
                    <Badge variant={member.isActive ? 'default' : 'secondary'}>
                      {member.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>কার্যক্রম</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={onEdit} className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                তথ্য সম্পাদনা করুন
              </Button>
              {onPaymentManage && (
                <Button onClick={onPaymentManage} variant="outline" className="w-full bg-transparent">
                  <DollarSign className="h-4 w-4 mr-2" />
                  চাঁদা আদায় করুন
                </Button>
              )}
              <Button variant="outline" className="w-full bg-transparent">
                পেমেন্ট রিপোর্ট প্রিন্ট
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
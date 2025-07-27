/**
 * Dashboard Component
 * Main dashboard showing key statistics with CLEAN data (no demo data)
 */
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Bell,
  UserCheck,
  Calendar,
  FileText,
  AlertCircle,
  Calculator,
  Plus,
  BarChart3,
  Shield,
  MessageSquare
} from 'lucide-react'

interface DashboardProps {
  onNavigate?: (view: string) => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth()
  
  // CLEAN initial data - all calculations will be based on real entries
  const members = 35
  const monthlyDuesPerMember = 500
  const expectedMonthlyIncome = members * monthlyDuesPerMember // 17,500
  
  // CLEAN data - no demo payments initially
  const currentMonthPayments = 0 // Will be calculated from real payments
  const totalYearlyIncome = 0 // Will be calculated from real data
  const totalYearlyExpense = 0 // Will be calculated from real data
  const currentBalance = totalYearlyIncome - totalYearlyExpense // 0 initially
  const pendingDues = expectedMonthlyIncome - currentMonthPayments // 17,500 initially
  const paidMembers = Math.floor(currentMonthPayments / monthlyDuesPerMember) // 0 initially
  const unpaidMembers = members - paidMembers // 35 initially

  const stats = {
    totalMembers: members,
    activeMembers: members, // All members are active by default
    totalIncome: totalYearlyIncome,
    totalExpense: totalYearlyExpense,
    currentBalance: currentBalance,
    pendingDues: pendingDues,
    thisMonthCollection: currentMonthPayments,
    notices: 0, // Will be calculated from real notices
    paidMembers: paidMembers,
    unpaidMembers: unpaidMembers,
    monthlyTarget: expectedMonthlyIncome
  }

  // CLEAN activity data - will be populated from real entries
  const recentActivities = [
    { 
      type: 'system', 
      message: 'সিস্টেম প্রস্তুত! এডমিন চাঁদা এন্ট্রি করুন', 
      time: 'এখনই' 
    }
  ]

  // Calculate collection percentage
  const collectionPercentage = currentMonthPayments > 0 
    ? Math.round((currentMonthPayments / expectedMonthlyIncome) * 100) 
    : 0

  const handleQuickAction = (action: string) => {
    if (onNavigate) {
      switch (action) {
        case 'add_member':
          onNavigate('members')
          break
        case 'collect_dues':
          onNavigate('members')
          break
        case 'generate_report':
          onNavigate('financial')
          break
        case 'add_notice':
          onNavigate('notices')
          break
        case 'manage_admins':
          onNavigate('admin-management')
          break
        case 'financial_year':
          onNavigate('financial-year')
          break
        case 'messages':
          onNavigate('messages')
          break
        default:
          console.log('Unknown action:', action)
      }
    }
  }

  if (user?.role === 'super_admin' || user?.role === 'admin') {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">ড্যাশবোর্ড</h1>
          <p className="text-gray-600">ফ্রেন্ডস এসোসিয়েশন প্রশাসনিক প্যানেল</p>
          {user.role === 'super_admin' && (
            <p className="text-sm text-blue-600 font-medium">প্রধান এডমিন অ্যাকাউন্ট</p>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">মোট সদস্য</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">সক্রিয় সদস্য</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">এই মাসের আয়</p>
                  <p className="text-2xl font-bold text-gray-900">৳{stats.thisMonthCollection.toLocaleString('bn-BD')}</p>
                  <p className="text-xs text-gray-500">{collectionPercentage}% লক্ষ্য অর্জন</p>
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
                  <p className="text-sm font-medium text-gray-600">বকেয়া চাঁদা</p>
                  <p className="text-2xl font-bold text-gray-900">৳{stats.pendingDues.toLocaleString('bn-BD')}</p>
                  <p className="text-xs text-gray-500">{stats.unpaidMembers} জন বাকি</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">মাসিক লক্ষ্য</p>
                  <p className="text-xl font-bold text-blue-600">৳{stats.monthlyTarget.toLocaleString('bn-BD')}</p>
                </div>
                <Calculator className="h-8 w-8 text-blue-500" />
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${collectionPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stats.paidMembers}/{stats.totalMembers} সদস্য পরিশোধ করেছেন</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">বার্ষিক আয়</p>
                  <p className="text-xl font-bold text-green-600">৳{stats.totalIncome.toLocaleString('bn-BD')}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">নিট ব্যালেন্স</p>
                  <p className="text-xl font-bold text-purple-600">৳{stats.currentBalance.toLocaleString('bn-BD')}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-1 bg-blue-100 rounded-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>দ্রুত কার্যক্রম</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className="h-20 flex flex-col space-y-2" 
                  onClick={() => handleQuickAction('add_member')}
                >
                  <Users className="h-6 w-6" />
                  <span className="text-sm">নতুন সদস্য</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col space-y-2 bg-transparent"
                  onClick={() => handleQuickAction('collect_dues')}
                >
                  <DollarSign className="h-6 w-6" />
                  <span className="text-sm">চাঁদা আদায়</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col space-y-2 bg-transparent"
                  onClick={() => handleQuickAction('generate_report')}
                >
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">রিপোর্ট তৈরি</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col space-y-2 bg-transparent"
                  onClick={() => handleQuickAction('add_notice')}
                >
                  <Bell className="h-6 w-6" />
                  <span className="text-sm">নোটিশ দিন</span>
                </Button>
                {user.role === 'super_admin' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col space-y-2 bg-transparent"
                      onClick={() => handleQuickAction('manage_admins')}
                    >
                      <Shield className="h-6 w-6" />
                      <span className="text-sm">এডমিন ব্যবস্থাপনা</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col space-y-2 bg-transparent"
                      onClick={() => handleQuickAction('financial_year')}
                    >
                      <BarChart3 className="h-6 w-6" />
                      <span className="text-sm">আর্থিক বছর</span>
                    </Button>
                  </>
                )}
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col space-y-2 bg-transparent"
                  onClick={() => handleQuickAction('messages')}
                >
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-sm">মেসেজ</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Member Dashboard - CLEAN with no demo data
  const memberStats = {
    monthlyDues: 500,
    totalPaid: 0, // Will be calculated from real payments
    pendingAmount: 500, // Initially all dues are pending
    paidMonths: 0, // Will be calculated from real payments
    pendingMonths: 1 // Initially 1 month pending
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">স্বাগতম, {user?.name}</h1>
        <p className="text-gray-600">আপনার একাউন্ট ড্যাশবোর্ড</p>
      </div>

      {/* Member Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">সদস্য নম্বর</p>
                <p className="text-2xl font-bold text-gray-900">#{user?.memberNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">মাসিক চাঁদা</p>
                <p className="text-2xl font-bold text-gray-900">৳{memberStats.monthlyDues}</p>
                <p className="text-xs text-gray-500">প্রতি মাসের ৮ তারিখের মধ্যে</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">মোট পরিশোধ</p>
                <p className="text-2xl font-bold text-gray-900">৳{memberStats.totalPaid.toLocaleString('bn-BD')}</p>
                <p className="text-xs text-gray-500">{memberStats.paidMonths} মাস পরিশোধিত</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>দ্রুত লিংক</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start bg-transparent"
                onClick={() => onNavigate && onNavigate('dues')}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                চাঁদার বিবরণী দেখুন
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-transparent"
                onClick={() => onNavigate && onNavigate('notices')}
              >
                <Bell className="h-4 w-4 mr-2" />
                নোটিশ বোর্ড
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-transparent"
                onClick={() => onNavigate && onNavigate('profile')}
              >
                <Users className="h-4 w-4 mr-2" />
                প্রোফাইল সেটিংস
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-transparent"
                onClick={() => onNavigate && onNavigate('messages')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                এডমিনকে মেসেজ পাঠান
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>চাঁদার তথ্য</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">কোনো পেমেন্ট এন্ট্রি নেই</h3>
              <p className="text-gray-600 text-sm">
                এডমিন আপনার চাঁদা এন্ট্রি করলে এখানে দেখতে পাবেন
              </p>
              <p className="text-xs text-red-600 mt-2">
                প্রতি মাসের ৮ তারিখের মধ্যে চাঁদা পরিশোধ করুন
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
/**
 * TypeScript interfaces for the Friends Association application
 */

export interface User {
  id: string
  userId: string
  password: string
  name: string
  role: 'super_admin' | 'admin' | 'member'
  memberNumber?: number
  profilePicture?: string
  createdAt: Date
  updatedAt: Date
  passwordChangedAt?: Date
}

export interface Member {
  id: string
  memberNumber: number
  name: string
  type: 'permanent' | 'temporary'
  joinDate: Date
  monthlyDues: number
  developmentFee: number
  otherFees: number
  comments: string
  phone: string
  address: string
  email: string
  profilePicture: string
  isActive: boolean
  userId: string
  password: string
  totalPaid?: number
  pendingAmount?: number
}

export interface Payment {
  id: string
  memberId: string
  memberNumber: number
  memberName: string
  amount: number
  month: string
  year: number
  type: 'monthly_dues' | 'development_fee' | 'other'
  otherFeeDescription?: string
  date: Date
  receivedBy: string
  notes: string
  status: 'paid' | 'pending' | 'overdue'
  createdAt: Date
  updatedAt: Date
}

export interface Notice {
  id: string
  title: string
  content: string
  isActive: boolean
  priority: 'high' | 'medium' | 'low'
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface FinancialYear {
  id: string
  startMonth: number // 8 for August
  startYear: number // 2025
  endMonth: number // 7 for July
  endYear: number // 2026
  isActive: boolean
  isCompleted: boolean
  totalIncome: number
  totalExpense: number
  balance: number
  createdAt: Date
  completedAt?: Date
}

export interface MonthlyReport {
  id: string
  financialYearId: string
  month: number
  year: number
  totalIncome: number
  totalExpense: number
  balance: number
  incomeDetails: IncomeExpenseItem[]
  expenseDetails: IncomeExpenseItem[]
  memberPayments: Payment[]
  createdAt: Date
  updatedAt: Date
}

export interface IncomeExpenseItem {
  id: string
  description: string
  amount: number
  category: string
  date: Date
  addedBy: string
}

export interface Report {
  id: string
  type: 'monthly' | 'yearly'
  title: string
  period: string
  month?: number
  year: number
  financialYearId?: string
  data: any
  summary: {
    totalIncome: number
    totalExpense: number
    balance: number
    totalMembers: number
    activeDues: number
  }
  createdAt: Date
  createdBy: string
}

export interface DashboardStats {
  totalMembers: number
  activeMembers: number
  totalIncome: number
  totalExpense: number
  currentBalance: number
  pendingDues: number
  thisMonthCollection: number
  notices: number
}

export interface OtherFee {
  id: string
  memberId: string
  memberNumber: number
  memberName: string
  description: string
  amount: number
  date: Date
  status: 'paid' | 'pending' | 'overdue'
  receivedBy?: string
  notes?: string
}

export interface Message {
  id: string
  fromUserId: string
  fromUserName: string
  fromUserRole: 'admin' | 'member'
  toUserId?: string // If null, message is for all admins
  subject: string
  content: string
  isRead: boolean
  replies?: MessageReply[]
  createdAt: Date
  updatedAt: Date
}

export interface MessageReply {
  id: string
  messageId: string
  fromUserId: string
  fromUserName: string
  fromUserRole: 'admin' | 'member'
  content: string
  createdAt: Date
}

export interface PasswordChangeLog {
  id: string
  userId: string
  userName: string
  userRole: 'admin' | 'member'
  oldPassword: string
  newPassword: string
  changedAt: Date
  ipAddress?: string
}
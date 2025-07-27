/**
 * Database synchronization component
 * Handles real-time data sync with Firebase Firestore
 */
import React, { useEffect, useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { Member, Notice, Payment, Report } from '../types'
import { Button } from './ui/button'
import { RefreshCw, Database, CheckCircle, AlertCircle } from 'lucide-react'

export default function DatabaseSync() {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle')
  const [lastSync, setLastSync] = useState<Date | null>(null)

  const members = useFirestore<Member>('members', 'memberNumber')
  const notices = useFirestore<Notice>('notices', 'createdAt')
  const payments = useFirestore<Payment>('payments', 'date')
  const reports = useFirestore<Report>('reports', 'month')

  // Sample data to initialize the database
  const sampleMembers: Omit<Member, 'id'>[] = [
    {
      memberNumber: 1,
      name: 'মো: আকতার হোসেন',
      type: 'permanent',
      joinDate: new Date('2024-08-01'),
      monthlyDues: 500,
      developmentFee: 0,
      phone: '01700000001',
      address: 'ঢাকা',
      email: '',
      profilePicture: '',
      isActive: true,
      userId: 'member001',
      password: 'pass123'
    },
    {
      memberNumber: 2,
      name: 'মো: সালমানুর রহমান',
      type: 'permanent',
      joinDate: new Date('2024-08-01'),
      monthlyDues: 500,
      developmentFee: 0,
      phone: '01700000002',
      address: 'ঢাকা',
      email: '',
      profilePicture: '',
      isActive: true,
      userId: 'member002',
      password: 'pass123'
    },
    {
      memberNumber: 3,
      name: 'মুহিব্বুর রহমান শাওন',
      type: 'permanent',
      joinDate: new Date('2024-08-01'),
      monthlyDues: 500,
      developmentFee: 0,
      phone: '01700000003',
      address: 'ঢাকা',
      email: '',
      profilePicture: '',
      isActive: true,
      userId: 'member003',
      password: 'pass123'
    }
    // Add more sample members as needed
  ]

  const sampleNotices: Omit<Notice, 'id'>[] = [
    {
      title: 'স্বাগতম বার্তা',
      content: 'ফ্রেন্ডস এসোসিয়েশনে আপনাদের স্বাগতম। আমাদের সমিতির মূল লক্ষ্য হলো বড়-ছোট মিলে বন্ধুত্বের বন্ধন তৈরি করা এবং সমাজের সেবা করা।',
      isActive: true,
      priority: 'high',
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'মাসিক চাঁদা সংক্রান্ত',
      content: 'সকল সদস্যদের জানানো যাচ্ছে যে, মাসিক চাঁদা নিয়মিত পরিশোধ করার জন্য অনুরোধ করা হলো। চাঁদার পরিমাণ ৫০০ টাকা।',
      isActive: true,
      priority: 'medium',
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  const initializeDatabase = async () => {
    setSyncStatus('syncing')
    try {
      // Initialize members if empty
      if (members.data.length === 0) {
        for (const member of sampleMembers) {
          await members.add(member)
        }
      }

      // Initialize notices if empty
      if (notices.data.length === 0) {
        for (const notice of sampleNotices) {
          await notices.add(notice)
        }
      }

      setSyncStatus('success')
      setLastSync(new Date())
    } catch (error) {
      console.error('Database initialization failed:', error)
      setSyncStatus('error')
    }
  }

  const handleManualSync = () => {
    members.refresh()
    notices.refresh()
    payments.refresh()
    reports.refresh()
    setLastSync(new Date())
  }

  useEffect(() => {
    // Auto-initialize database on first load
    if (members.data.length === 0 && !members.loading) {
      initializeDatabase()
    }
  }, [members.data.length, members.loading])

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Database className="h-4 w-4 text-gray-500" />
    }
  }

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'সিঙ্ক হচ্ছে...'
      case 'success':
        return 'সিঙ্ক সম্পন্ন'
      case 'error':
        return 'সিঙ্ক ব্যর্থ'
      default:
        return 'প্রস্তুত'
    }
  }

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      {getSyncStatusIcon()}
      <span>{getSyncStatusText()}</span>
      {lastSync && (
        <span className="text-xs">
          শেষ সিঙ্ক: {lastSync.toLocaleTimeString('bn-BD')}
        </span>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleManualSync}
        disabled={syncStatus === 'syncing'}
        className="ml-2"
      >
        <RefreshCw className={`h-3 w-3 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  )
}
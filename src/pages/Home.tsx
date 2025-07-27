/**
 * Main Home Page Component
 * Entry point for the Friends Association Web Application with messaging system
 */
import React, { useState } from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import Login from '../components/Login'
import Layout from '../components/Layout'
import Dashboard from '../components/Dashboard'
import MemberManagement from '../components/MemberManagement'
import FinancialReports from '../components/FinancialReports'
import NoticeBoard from '../components/NoticeBoard'
import ProfileSettings from '../components/ProfileSettings'
import DuesHistory from '../components/DuesHistory'
import PaymentManagement from '../components/PaymentManagement'
import FinancialYearManagement from '../components/FinancialYearManagement'
import AdminManagement from '../components/AdminManagement'
import MessagingSystem from '../components/MessagingSystem'
import ErrorBoundary from '../components/ErrorBoundary'

export default function HomePage() {
  const [selectedMember, setSelectedMember] = useState(null)
  const [showPaymentManagement, setShowPaymentManagement] = useState(false)

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Layout>
          {({ currentView, user, setCurrentView }) => {
            if (!user) {
              return <Login />
            }

            // Handle payment management flow
            if (showPaymentManagement && selectedMember) {
              return (
                <PaymentManagement 
                  member={selectedMember}
                  onClose={() => {
                    setShowPaymentManagement(false)
                    setSelectedMember(null)
                  }}
                  onPaymentSave={() => {
                    setShowPaymentManagement(false)
                    setSelectedMember(null)
                    // Refresh member data
                  }}
                />
              )
            }

            switch (currentView) {
              case 'dashboard':
                return <Dashboard onNavigate={setCurrentView} />
              
              case 'members':
                if (user.role === 'member') {
                  return (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">আপনার এই পাতায় প্রবেশের অনুমতি নেই।</p>
                        <p className="text-sm text-gray-500">শুধুমাত্র এডমিনরা সদস্য ব্যবস্থাপনা দেখতে পারেন।</p>
                      </div>
                    </div>
                  )
                }
                return (
                  <MemberManagement 
                    onPaymentManage={(member) => {
                      setSelectedMember(member)
                      setShowPaymentManagement(true)
                    }}
                  />
                )
              
              case 'financial':
                if (user.role === 'member') {
                  return (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">আপনার এই পাতায় প্রবেশের অনুমতি নেই।</p>
                        <p className="text-sm text-gray-500">শুধুমাত্র এডমিনরা আর্থিক রিপোর্ট দেখতে পারেন।</p>
                      </div>
                    </div>
                  )
                }
                return <FinancialReports />
              
              case 'financial-year':
                if (user.role !== 'super_admin') {
                  return (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">আপনার এই পাতায় প্রবেশের অনুমতি নেই।</p>
                        <p className="text-sm text-gray-500">শুধুমাত্র প্রধান এডমিন আর্থিক বছর ব্যবস্থাপনা করতে পারেন।</p>
                      </div>
                    </div>
                  )
                }
                return <FinancialYearManagement />
              
              case 'admin-management':
                if (user.role !== 'super_admin') {
                  return (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">আপনার এই পাতায় প্রবেশের অনুমতি নেই।</p>
                        <p className="text-sm text-gray-500">শুধুমাত্র প্রধান এডমিন এডমিন ব্যবস্থাপনা করতে পারেন।</p>
                      </div>
                    </div>
                  )
                }
                return <AdminManagement />
              
              case 'notices':
                return <NoticeBoard />
              
              case 'profile':
                return <ProfileSettings />
              
              case 'dues':
                if (user.role !== 'member') {
                  return (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">এই পাতা শুধুমাত্র সদস্যদের জন্য।</p>
                        <p className="text-sm text-gray-500">এডমিনরা সদস্য ব্যবস্থাপনা থেকে চাঁদার তথ্য দেখতে পারেন।</p>
                      </div>
                    </div>
                  )
                }
                return <DuesHistory />
              
              case 'messages':
                return <MessagingSystem />
              
              default:
                return <Dashboard onNavigate={setCurrentView} />
            }
          }}
        </Layout>
      </AuthProvider>
    </ErrorBoundary>
  )
}
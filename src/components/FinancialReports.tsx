/**
 * Financial Reports Component
 * CLEAN financial reports with no demo data - all zero initially
 */
import React, { useState, useMemo } from 'react'
import { FinancialYear, MonthlyReport, Report } from '../types'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { 
  BarChart3, 
  Calendar, 
  Download, 
  Edit, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  FileText,
  Eye,
  AlertCircle
} from 'lucide-react'
import PrintableReport from './PrintableReport'

export default function FinancialReports() {
  const [selectedYear, setSelectedYear] = useState('2025-2026')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [showPrintable, setShowPrintable] = useState(false)
  const [reportData, setReportData] = useState<any>(null)

  // CLEAN financial years - no demo data
  const financialYears: FinancialYear[] = [
    {
      id: '1',
      startMonth: 8, // August
      startYear: 2025,
      endMonth: 7, // July
      endYear: 2026,
      isActive: true,
      isCompleted: false,
      totalIncome: 0, // CLEAN - will be calculated from real entries
      totalExpense: 0, // CLEAN - will be calculated from real entries
      balance: 0, // CLEAN - will be calculated from real entries
      createdAt: new Date('2025-08-01')
    }
  ]

  // CLEAN monthly reports - no demo data
  const monthlyReports: MonthlyReport[] = []

  const currentFinancialYear = financialYears.find(fy => fy.isActive)
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ]

  const generateMonthlyReport = () => {
    const report = monthlyReports.find(r => r.month === selectedMonth && r.year === parseInt(selectedYear.split('-')[0]))
    
    if (!report) {
      alert('এই মাসের জন্য কোনো রিপোর্ট পাওয়া যায়নি। প্রথমে আয়-ব্যয়ের এন্ট্রি করুন।')
      return
    }

    const data = {
      title: `মাসিক আর্থিক রিপোর্ট - ${months[report.month - 1]} ${report.year}`,
      period: `${months[report.month - 1]} ${report.year}`,
      data: [
        ...report.incomeDetails.map(item => ({ ...item, type: 'আয়' })),
        ...report.expenseDetails.map(item => ({ ...item, type: 'ব্যয়' }))
      ],
      summary: {
        totalIncome: report.totalIncome,
        totalExpense: report.totalExpense,
        balance: report.balance
      }
    }

    setReportData(data)
    setShowPrintable(true)
  }

  const generateYearlyReport = () => {
    const year = financialYears.find(fy => `${fy.startYear}-${fy.endYear}` === selectedYear)
    if (!year) return

    if (year.totalIncome === 0 && year.totalExpense === 0) {
      alert('এই আর্থিক বছরের জন্য কোনো ডেটা পাওয়া যায়নি। প্রথমে আয়-ব্যয়ের এন্ট্রি করুন।')
      return
    }

    const yearReports = monthlyReports.filter(r => r.financialYearId === year.id)
    
    const data = {
      title: `বার্ষিক আর্থিক রিপোর্ট - ${year.startYear}-${year.endYear}`,
      period: `আগস্ট ${year.startYear} - জুলাই ${year.endYear}`,
      data: yearReports.map(report => ({
        month: months[report.month - 1],
        income: report.totalIncome,
        expense: report.totalExpense,
        balance: report.balance
      })),
      summary: {
        totalIncome: year.totalIncome,
        totalExpense: year.totalExpense,
        balance: year.balance
      }
    }

    setReportData(data)
    setShowPrintable(true)
  }

  if (showPrintable && reportData) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Button onClick={() => setShowPrintable(false)} variant="outline">
            ← ফিরে যান
          </Button>
        </div>
        <PrintableReport 
          reportData={reportData} 
          reportId="financial-report"
        />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">আর্থিক রিপোর্ট</h1>
          <p className="text-gray-600">আর্থিক বছর ব্যবস্থাপনা ও রিপোর্ট জেনারেশন</p>
        </div>
      </div>

      {/* Current Financial Year Status */}
      {currentFinancialYear && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>বর্তমান আর্থিক বছর</span>
              <Badge variant="default">সক্রিয়</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {currentFinancialYear.startYear}-{currentFinancialYear.endYear}
                </div>
                <div className="text-sm text-gray-600">
                  আগস্ট {currentFinancialYear.startYear} - জুলাই {currentFinancialYear.endYear}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ৳{currentFinancialYear.totalIncome.toLocaleString('bn-BD')}
                </div>
                <div className="text-sm text-gray-600">মোট আয়</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  ৳{currentFinancialYear.totalExpense.toLocaleString('bn-BD')}
                </div>
                <div className="text-sm text-gray-600">মোট ব্যয়</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ৳{currentFinancialYear.balance.toLocaleString('bn-BD')}
                </div>
                <div className="text-sm text-gray-600">নিট ব্যালেন্স</div>
              </div>
            </div>
            
            {currentFinancialYear.totalIncome === 0 && currentFinancialYear.totalExpense === 0 && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">কোনো আর্থিক এন্ট্রি নেই</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      আর্থিক রিপোর্ট দেখতে প্রথমে চাঁদা আদায় ও ব্যয়ের এন্ট্রি করুন।
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Report Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              মাসিক রিপোর্ট
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">আর্থিক বছর</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {financialYears.map(year => (
                    <SelectItem key={year.id} value={`${year.startYear}-${year.endYear}`}>
                      {year.startYear}-{year.endYear}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">মাস</label>
              <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generateMonthlyReport} className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              মাসিক রিপোর্ট তৈরি করুন
            </Button>
          </CardContent>
        </Card>

        {/* Yearly Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              বার্ষিক রিপোর্ট
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">আর্থিক বছর</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {financialYears.map(year => (
                    <SelectItem key={year.id} value={`${year.startYear}-${year.endYear}`}>
                      {year.startYear}-{year.endYear} 
                      {year.isCompleted && ' (সম্পন্ন)'}
                      {year.isActive && ' (চলমান)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generateYearlyReport} className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              বার্ষিক রিপোর্ট তৈরি করুন
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Reports Summary */}
      <Card>
        <CardHeader>
          <CardTitle>মাসিক রিপোর্ট সারসংক্ষেপ</CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyReports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">কোনো মাসিক রিপোর্ট নেই</h3>
              <p className="text-gray-600">
                আর্থিক লেনদেন শুরু করলে এখানে মাসিক রিপোর্ট দেখা যাবে
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">মাস</th>
                    <th className="text-right py-3 px-4">মোট আয়</th>
                    <th className="text-right py-3 px-4">মোট ব্যয়</th>
                    <th className="text-right py-3 px-4">নিট ব্যালেন্স</th>
                    <th className="text-center py-3 px-4">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyReports.map((report) => (
                    <tr key={report.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        {months[report.month - 1]} {report.year}
                      </td>
                      <td className="text-right py-3 px-4 text-green-600">
                        ৳{report.totalIncome.toLocaleString('bn-BD')}
                      </td>
                      <td className="text-right py-3 px-4 text-red-600">
                        ৳{report.totalExpense.toLocaleString('bn-BD')}
                      </td>
                      <td className="text-right py-3 px-4 font-semibold">
                        <span className={report.balance >= 0 ? 'text-blue-600' : 'text-red-600'}>
                          ৳{report.balance.toLocaleString('bn-BD')}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="flex justify-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
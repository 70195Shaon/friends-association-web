/**
 * Printable Report Component
 * Generates print-optimized reports for A4 paper
 */
import React from 'react'
import { formatCurrency, formatDate, printElement } from '../utils/printUtils'
import { Button } from './ui/button'
import { Printer, Download } from 'lucide-react'

interface ReportData {
  title: string
  period: string
  data: any[]
  summary?: {
    totalIncome: number
    totalExpense: number
    balance: number
  }
}

interface PrintableReportProps {
  reportData: ReportData
  reportId: string
}

export default function PrintableReport({ reportData, reportId }: PrintableReportProps) {
  const handlePrint = () => {
    printElement(reportId)
  }

  return (
    <div className="space-y-4">
      {/* Print Controls */}
      <div className="flex justify-end space-x-2 no-print">
        <Button onClick={handlePrint} variant="outline" size="sm">
          <Printer className="h-4 w-4 mr-2" />
          প্রিন্ট করুন
        </Button>
        <Button onClick={handlePrint} size="sm">
          <Download className="h-4 w-4 mr-2" />
          PDF ডাউনলোড
        </Button>
      </div>

      {/* Printable Content */}
      <div id={reportId} className="bg-white p-8 print:p-0">
        {/* Header */}
        <div className="text-center mb-8 header">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://pub-cdn.sider.ai/u/U0VEHZKN5R2/web-coder/68847778f2d3a0ac8dc62024/resource/5687da56-c964-4ff0-9ae4-cd1de750e6c0.jpg" 
              alt="ফ্রেন্ডস এসোসিয়েশন লোগো"
              className="logo mr-4 w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ফ্রেন্ডস এসোসিয়েশন</h1>
              <p className="text-sm text-gray-600 mt-1">
                বড়-ছোট মিলে বন্ধুত্বের বন্ধন, সমাজের সেবাই বাণিজ্যিক সংঘটন
              </p>
            </div>
          </div>
          
          <div className="border-t border-b border-gray-300 py-2 my-4">
            <h2 className="text-xl font-semibold">{reportData.title}</h2>
            <p className="text-gray-600">{reportData.period}</p>
          </div>
        </div>

        {/* Report Content */}
        <div className="space-y-6">
          {/* Members Table */}
          {reportData.data.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">সদস্য তালিকা ও চাঁদার বিবরণী</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">সদস্য নং</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">নাম</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">ধরন</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">মাসিক চাঁদা</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">মোট প্রদান</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">অবস্থা</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.data.map((member, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-300 px-3 py-2">{member.memberNumber}</td>
                      <td className="border border-gray-300 px-3 py-2">{member.name}</td>
                      <td className="border border-gray-300 px-3 py-2">
                        {member.type === 'permanent' ? 'স্থায়ী' : 'প্রাথমিক'}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right">
                        {formatCurrency(member.monthlyDues)}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right">
                        {formatCurrency(member.totalPaid || 0)}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        {member.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Financial Summary */}
          {reportData.summary && (
            <div>
              <h3 className="text-lg font-semibold mb-3">আর্থিক সারসংক্ষেপ</h3>
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-green-50">
                      মোট আয়
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-green-600 font-semibold">
                      {formatCurrency(reportData.summary.totalIncome)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-red-50">
                      মোট ব্যয়
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-red-600 font-semibold">
                      {formatCurrency(reportData.summary.totalExpense)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-blue-50">
                      নিট ব্যালেন্স
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-blue-600 font-semibold">
                      {formatCurrency(reportData.summary.balance)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-300">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                <p>রিপোর্ট তৈরির তারিখ: {formatDate(new Date())}</p>
                <p>প্রস্তুতকারী: মুহিব্বুর রহমান শাওন</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 w-32 mx-auto mb-1"></div>
                <p>অনুমোদনকারী</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

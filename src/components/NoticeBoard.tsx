/**
 * Notice Board Component
 * Admin can manage notices, members can view active notices
 */
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Notice } from '../types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import { 
  Bell, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

export default function NoticeBoard() {
  const { user } = useAuth()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    isActive: true
  })

  // Sample notices
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: 'স্বাগতম বার্তা',
      content: 'ফ্রেন্ডস এসোসিয়েশনে আপনাদের স্বাগতম। আমাদের সমিতির মূল লক্ষ্য হলো বড়-ছোট মিলে বন্ধুত্বের বন্ধন তৈরি করা এবং সমাজের সেবা করা। আশা করি আপনারা সকলে আমাদের সাথে থেকে এই মহৎ কাজে অংশগ্রহণ করবেন।',
      isActive: true,
      priority: 'high',
      createdBy: 'admin',
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-01')
    },
    {
      id: '2',
      title: 'মাসিক চাঁদা সংক্রান্ত',
      content: 'সকল সদস্যদের জানানো যাচ্ছে যে, মাসিক চাঁদা নিয়মিত পরিশোধ করার জন্য অনুরোধ করা হলো। চাঁদার পরিমাণ ৫০০ টাকা। প্রতি মাসের ১৫ তারিখের মধ্যে চাঁদা পরিশোধ করতে হবে। বিলম্বে চাঁদা প্রদানের ক্ষেত্রে অতিরিক্ত ফি প্রযোজ্য হতে পারে।',
      isActive: true,
      priority: 'medium',
      createdBy: 'admin',
      createdAt: new Date('2024-11-15'),
      updatedAt: new Date('2024-11-15')
    },
    {
      id: '3',
      title: 'আসন্ন সভার তারিখ',
      content: 'আগামী ১৫ ডিসেম্বর, ২০২৪ তারিখে বিকাল ৪টায় আমাদের মাসিক সভা অনুষ্ঠিত হবে। সকল সদস্যদের উপস্থিত থাকার জন্য অনুরোধ করা হচ্ছে। সভার মূল আলোচ্য বিষয় হবে আর্থিক রিপোর্ট এবং নতুন বছরের পরিকল্পনা।',
      isActive: false,
      priority: 'low',
      createdBy: 'admin',
      createdAt: new Date('2024-12-05'),
      updatedAt: new Date('2024-12-05')
    }
  ])

  const activeNotices = notices.filter(notice => notice.isActive)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingNotice) {
      // Update existing notice
      setNotices(notices.map(notice => 
        notice.id === editingNotice.id 
          ? { ...notice, ...formData, updatedAt: new Date() }
          : notice
      ))
    } else {
      // Add new notice
      const newNotice: Notice = {
        id: Date.now().toString(),
        ...formData,
        createdBy: user?.userId || 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setNotices([newNotice, ...notices])
    }

    // Reset form
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
      isActive: true
    })
    setShowAddForm(false)
    setEditingNotice(null)
  }

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice)
    setFormData({
      title: notice.title,
      content: notice.content,
      priority: notice.priority,
      isActive: notice.isActive
    })
    setShowAddForm(true)
  }

  const handleDelete = (noticeId: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই নোটিশটি মুছে ফেলতে চান?')) {
      setNotices(notices.filter(notice => notice.id !== noticeId))
    }
  }

  const toggleNoticeStatus = (noticeId: string) => {
    setNotices(notices.map(notice => 
      notice.id === noticeId 
        ? { ...notice, isActive: !notice.isActive, updatedAt: new Date() }
        : notice
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'জরুরি'
      case 'medium': return 'গুরুত্বপূর্ণ'
      case 'low': return 'সাধারণ'
      default: return 'সাধারণ'
    }
  }

  // Member view - only shows active notices
  if (user?.role === 'member') {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">নোটিশ বোর্ড</h1>
          <p className="text-gray-600">গুরুত্বপূর্ণ ঘোষণা ও তথ্য</p>
        </div>

        {activeNotices.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">কোনো নোটিশ নেই</h3>
              <p className="text-gray-600">বর্তমানে কোনো সক্রিয় নোটিশ নেই</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {activeNotices.map((notice) => (
              <Card key={notice.id} className="border-l-4 border-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{notice.title}</CardTitle>
                    <Badge className={getPriorityColor(notice.priority)}>
                      {getPriorityText(notice.priority)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    প্রকাশিত: {notice.createdAt.toLocaleDateString('bn-BD')}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {notice.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Admin view - full management capabilities
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">নোটিশ বোর্ড ব্যবস্থাপনা</h1>
          <p className="text-gray-600">মোট {notices.length} টি নোটিশ</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          নতুন নোটিশ
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {editingNotice ? 'নোটিশ সম্পাদনা' : 'নতুন নোটিশ যোগ করুন'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">শিরোনাম</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="নোটিশের শিরোনাম লিখুন"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">বিষয়বস্তু</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="নোটিশের বিস্তারিত বিষয়বস্তু লিখুন"
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">গুরুত্ব</label>
                  <Select value={formData.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">জরুরি</SelectItem>
                      <SelectItem value="medium">গুরুত্বপূর্ণ</SelectItem>
                      <SelectItem value="low">সাধারণ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <label className="text-sm font-medium text-gray-700">সক্রিয় নোটিশ</label>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button type="submit">
                  {editingNotice ? 'আপডেট করুন' : 'প্রকাশ করুন'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingNotice(null)
                    setFormData({ title: '', content: '', priority: 'medium', isActive: true })
                  }}
                >
                  বাতিল
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <Card key={notice.id} className={`${notice.isActive ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300 opacity-75'}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-lg">{notice.title}</CardTitle>
                    <Badge className={getPriorityColor(notice.priority)}>
                      {getPriorityText(notice.priority)}
                    </Badge>
                    <Badge variant={notice.isActive ? 'default' : 'secondary'}>
                      {notice.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    প্রকাশিত: {notice.createdAt.toLocaleDateString('bn-BD')} |
                    আপডেট: {notice.updatedAt.toLocaleDateString('bn-BD')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleNoticeStatus(notice.id)}
                  >
                    {notice.isActive ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(notice)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(notice.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {notice.content.length > 200 
                  ? `${notice.content.substring(0, 200)}...` 
                  : notice.content
                }
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {notices.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">কোনো নোটিশ নেই</h3>
            <p className="text-gray-600 mb-4">প্রথম নোটিশ যোগ করুন</p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              নতুন নোটিশ
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

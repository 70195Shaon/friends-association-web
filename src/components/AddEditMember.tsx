/**
 * Add/Edit Member Component
 * Form for adding new members or editing existing member information
 */
import React, { useState } from 'react'
import { Member } from '../types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { ArrowLeft, Save, User } from 'lucide-react'

interface AddEditMemberProps {
  member?: Member | null
  isEdit: boolean
  onClose: () => void
  onSave: (member: Member) => void
}

export default function AddEditMember({ member, isEdit, onClose, onSave }: AddEditMemberProps) {
  const [formData, setFormData] = useState({
    memberNumber: member?.memberNumber || 0,
    name: member?.name || '',
    type: member?.type || 'permanent' as 'permanent' | 'temporary',
    joinDate: member?.joinDate ? member.joinDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    monthlyDues: member?.monthlyDues || 500,
    developmentFee: member?.developmentFee || 0,
    otherFees: member?.otherFees || 0,
    comments: member?.comments || '',
    phone: member?.phone || '',
    address: member?.address || '',
    email: member?.email || '',
    isActive: member?.isActive ?? true,
    userId: member?.userId || '',
    password: member?.password || 'pass123'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const memberData: Member = {
      id: member?.id || Date.now().toString(),
      ...formData,
      joinDate: new Date(formData.joinDate),
      profilePicture: member?.profilePicture || '',
      totalPaid: member?.totalPaid || 0,
      pendingAmount: member?.pendingAmount || 0
    }

    onSave(memberData)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button onClick={onClose} variant="outline" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          ফিরে যান
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'সদস্য তথ্য সম্পাদনা' : 'নতুন সদস্য যোগ করুন'}
        </h1>
        <p className="text-gray-600">
          {isEdit ? 'সদস্যের তথ্য আপডেট করুন' : 'নতুন সদস্যের বিস্তারিত তথ্য প্রদান করুন'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  মূল তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="memberNumber">সদস্য নম্বর *</Label>
                    <Input
                      id="memberNumber"
                      type="number"
                      value={formData.memberNumber}
                      onChange={(e) => setFormData({ ...formData, memberNumber: parseInt(e.target.value) || 0 })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">সদস্যের ধরন *</Label>
                    <Select value={formData.type} onValueChange={(value: 'permanent' | 'temporary') => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permanent">স্থায়ী সদস্য</SelectItem>
                        <SelectItem value="temporary">প্রাথমিক সদস্য</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">নাম *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="সদস্যের পূর্ণ নাম লিখুন"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">ফোন নম্বর *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="01700000000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">ইমেইল</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">ঠিকানা *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="বিস্তারিত ঠিকানা লিখুন"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="joinDate">যোগদানের তারিখ</Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Login Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>লগইন তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="userId">ইউজার আইডি *</Label>
                    <Input
                      id="userId"
                      value={formData.userId}
                      onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                      placeholder="member001"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">পাসওয়ার্ড *</Label>
                    <Input
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="পাসওয়ার্ড লিখুন"
                      required
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  সদস্য পরবর্তীতে নিজের পাসওয়ার্ড পরিবর্তন করতে পারবেন
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Financial Information */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>আর্থিক তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="monthlyDues">মাসিক চাঁদা (টাকা) *</Label>
                  <Input
                    id="monthlyDues"
                    type="number"
                    value={formData.monthlyDues}
                    onChange={(e) => setFormData({ ...formData, monthlyDues: parseInt(e.target.value) || 0 })}
                    min="0"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">ডিফল্ট: ৫০০ টাকা</p>
                </div>

                <div>
                  <Label htmlFor="developmentFee">উন্নয়ন ফি (টাকা)</Label>
                  <Input
                    id="developmentFee"
                    type="number"
                    value={formData.developmentFee}
                    onChange={(e) => setFormData({ ...formData, developmentFee: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="otherFees">অন্যান্য ফি (টাকা)</Label>
                  <Input
                    id="otherFees"
                    type="number"
                    value={formData.otherFees}
                    onChange={(e) => setFormData({ ...formData, otherFees: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">চাঁদা ছাড়া অন্যান্য ফি (যেমন: অনুষ্ঠান ফি, বিশেষ চাঁদা)</p>
                </div>

                <div>
                  <Label htmlFor="comments">মন্তব্য</Label>
                  <Textarea
                    id="comments"
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    placeholder="অতিরিক্ত তথ্য বা মন্তব্য লিখুন"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label htmlFor="isActive">সক্রিয় সদস্য</Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex space-x-3">
                  <Button type="submit" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    {isEdit ? 'আপডেট করুন' : 'সদস্য যোগ করুন'}
                  </Button>
                  <Button type="button" variant="outline" onClick={onClose}>
                    বাতিল
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

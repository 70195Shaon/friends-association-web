/**
 * Member Management Component
 * Complete member CRUD operations for admin users
 */
import React, { useState, useMemo } from 'react'
import { Member } from '../types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  Filter,
  Download,
  Phone,
  MapPin,
  DollarSign
} from 'lucide-react'
import AddEditMember from './AddEditMember'
import MemberDetails from './MemberDetails'

// Complete member list from requirements
const allMembers: Member[] = [
  {
    id: '1', memberNumber: 1, name: 'মো: আকতার হোসেন', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000001', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member001', password: 'pass123'
  },
  {
    id: '2', memberNumber: 2, name: 'মো: সালমানুর রহমান', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000002', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member002', password: 'pass123'
  },
  {
    id: '3', memberNumber: 3, name: 'মুহিব্বুর রহমান শাওন', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000003', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member003', password: 'pass123'
  },
  {
    id: '4', memberNumber: 4, name: 'মুরাদ হোসেন', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000004', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member004', password: 'pass123'
  },
  {
    id: '5', memberNumber: 5, name: 'রাকিবুল হাসান', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000005', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member005', password: 'pass123'
  },
  {
    id: '6', memberNumber: 6, name: 'সৈ: মো: রবিউল হোসাইন', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000006', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member006', password: 'pass123'
  },
  {
    id: '7', memberNumber: 7, name: 'মো: সাকিবুল হাসান', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000007', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member007', password: 'pass123'
  },
  {
    id: '8', memberNumber: 8, name: 'মো: ইশহাবুর রহমান', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000008', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member008', password: 'pass123'
  },
  {
    id: '9', memberNumber: 9, name: 'মো: জহির উদ্দীন বাবু', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000009', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member009', password: 'pass123'
  },
  {
    id: '10', memberNumber: 10, name: 'মোহাম্মদ সাঈদ আফ্রিদী', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000010', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member010', password: 'pass123'
  },
  {
    id: '11', memberNumber: 11, name: 'মোহাম্মদ আনিচ', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000011', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member011', password: 'pass123'
  },
  {
    id: '12', memberNumber: 12, name: 'মোহাম্মদ রানা', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000012', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member012', password: 'pass123'
  },
  {
    id: '13', memberNumber: 13, name: 'মোহাম্মদ রফিক', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000013', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member013', password: 'pass123'
  },
  {
    id: '14', memberNumber: 14, name: 'মো: আশেকুর রহমান', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000014', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member014', password: 'pass123'
  },
  {
    id: '15', memberNumber: 15, name: 'মো আতিকুর রহমান', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000015', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member015', password: 'pass123'
  },
  {
    id: '16', memberNumber: 16, name: 'মো: জাবের হোসেন', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000016', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member016', password: 'pass123'
  },
  {
    id: '17', memberNumber: 17, name: 'মো: সাজ্জাদ হোসেন', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000017', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member017', password: 'pass123'
  },
  {
    id: '19', memberNumber: 19, name: 'মো: আবদুর রহমান', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000019', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member019', password: 'pass123'
  },
  {
    id: '20', memberNumber: 20, name: 'মোহাম্মদ হাবিব', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000020', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member020', password: 'pass123'
  },
  {
    id: '21', memberNumber: 21, name: 'মো: তামিম', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000021', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member021', password: 'pass123'
  },
  {
    id: '22', memberNumber: 22, name: 'আব্দুল্লাহ আল জিহান', type: 'temporary',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000022', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member022', password: 'pass123'
  },
  {
    id: '23', memberNumber: 23, name: 'মোহাম্মদ সায়েম', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000023', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member023', password: 'pass123'
  },
  {
    id: '24', memberNumber: 24, name: 'মো: তামিম রাসিন', type: 'temporary',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000024', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member024', password: 'pass123'
  },
  {
    id: '25', memberNumber: 25, name: 'মো: সোহান নূর', type: 'temporary',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000025', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member025', password: 'pass123'
  },
  {
    id: '26', memberNumber: 26, name: 'সামির হোসেন সোহাগ', type: 'temporary',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000026', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member026', password: 'pass123'
  },
  {
    id: '27', memberNumber: 27, name: 'সাখাওয়াত হোসেন তাওছিফ', type: 'temporary',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000027', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member027', password: 'pass123'
  },
  {
    id: '28', memberNumber: 28, name: 'মোহাম্মদ জিসান', type: 'temporary',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000028', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member028', password: 'pass123'
  },
  {
    id: '29', memberNumber: 29, name: 'মোহাম্মদ সোয়াইব', type: 'temporary',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000029', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member029', password: 'pass123'
  },
  {
    id: '31', memberNumber: 31, name: 'মোহাম্মদ আরাফাত', type: 'temporary',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000031', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member031', password: 'pass123'
  },
  {
    id: '32', memberNumber: 32, name: 'মোহাম্মদ সোলাইমান', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000032', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member032', password: 'pass123'
  },
  {
    id: '33', memberNumber: 33, name: 'মোহাম্মদ শহিদুল ইসলাম', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000033', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member033', password: 'pass123'
  },
  {
    id: '34', memberNumber: 34, name: 'মোহাম্মদ ইব্রাহিম', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000034', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member034', password: 'pass123'
  },
  {
    id: '35', memberNumber: 35, name: 'মনজুরুল আলম', type: 'permanent',
    joinDate: new Date('2024-08-01'), monthlyDues: 500, developmentFee: 0,
    otherFees: 0, comments: '', phone: '01700000035', address: 'ঢাকা',
    email: '', profilePicture: '', isActive: true, userId: 'member035', password: 'pass123'
  }
]

interface MemberManagementProps {
  onPaymentManage?: (member: Member) => void
}

export default function MemberManagement({ onPaymentManage }: MemberManagementProps) {
  const [members] = useState<Member[]>(allMembers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'permanent' | 'temporary'>('all')
  const [showAddEdit, setShowAddEdit] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [editMode, setEditMode] = useState(false)

  const filteredMembers = useMemo(() => {
    let filtered = members

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.memberNumber.toString().includes(searchTerm) ||
        member.phone.includes(searchTerm)
      )
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(member => member.type === filterType)
    }

    return filtered.sort((a, b) => a.memberNumber - b.memberNumber)
  }, [members, searchTerm, filterType])

  const handleAddMember = () => {
    setSelectedMember(null)
    setEditMode(false)
    setShowAddEdit(true)
  }

  const handleEditMember = (member: Member) => {
    setSelectedMember(member)
    setEditMode(true)
    setShowAddEdit(true)
  }

  const handleViewMember = (member: Member) => {
    setSelectedMember(member)
    setShowDetails(true)
  }

  const handlePaymentManage = (member: Member) => {
    if (onPaymentManage) {
      onPaymentManage(member)
    }
  }

  const handleExportReport = () => {
    // Export functionality would be implemented here
    alert('রিপোর্ট এক্সপোর্ট ফিচার শীঘ্রই যোগ করা হবে')
  }

  if (showAddEdit) {
    return (
      <AddEditMember
        member={selectedMember}
        isEdit={editMode}
        onClose={() => setShowAddEdit(false)}
        onSave={() => {
          setShowAddEdit(false)
          // Refresh members list
        }}
      />
    )
  }

  if (showDetails && selectedMember) {
    return (
      <MemberDetails
        member={selectedMember}
        onClose={() => setShowDetails(false)}
        onEdit={() => {
          setShowDetails(false)
          handleEditMember(selectedMember)
        }}
        onPaymentManage={() => {
          setShowDetails(false)
          handlePaymentManage(selectedMember)
        }}
      />
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">সদস্য ব্যবস্থাপনা</h1>
          <p className="text-gray-600">মোট {members.length} জন সদস্য</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleExportReport} variant="outline" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            রিপোর্ট এক্সপোর্ট
          </Button>
          <Button onClick={handleAddMember}>
            <Plus className="h-4 w-4 mr-2" />
            নতুন সদস্য
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="নাম, সদস্য নম্বর বা ফোন নম্বর দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
                size="sm"
                className={filterType !== 'all' ? 'bg-transparent' : ''}
              >
                সকল ({members.length})
              </Button>
              <Button
                variant={filterType === 'permanent' ? 'default' : 'outline'}
                onClick={() => setFilterType('permanent')}
                size="sm"
                className={filterType !== 'permanent' ? 'bg-transparent' : ''}
              >
                স্থায়ী ({members.filter(m => m.type === 'permanent').length})
              </Button>
              <Button
                variant={filterType === 'temporary' ? 'default' : 'outline'}
                onClick={() => setFilterType('temporary')}
                size="sm"
                className={filterType !== 'temporary' ? 'bg-transparent' : ''}
              >
                প্রাথমিক ({members.filter(m => m.type === 'temporary').length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
                    <p className="text-xs text-gray-500">সদস্য #{member.memberNumber}</p>
                  </div>
                </div>
                <Badge variant={member.type === 'permanent' ? 'default' : 'secondary'}>
                  {member.type === 'permanent' ? 'স্থায়ী' : 'প্রাথমিক'}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-3 w-3 mr-2" />
                  {member.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-3 w-3 mr-2" />
                  {member.address}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">মাসিক চাঁদা: ৳{member.monthlyDues}</span>
                </div>
                <div className="text-xs text-gray-500">
                  প্রতি মাসের ৮ তারিখের মধ্যে
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewMember(member)}
                  className="flex-1 bg-transparent"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  দেখুন
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePaymentManage(member)}
                  className="flex-1 bg-transparent"
                >
                  <DollarSign className="h-3 w-3 mr-1" />
                  চাঁদা
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditMember(member)}
                  className="bg-transparent"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">কোনো সদস্য পাওয়া যায়নি</h3>
          <p className="text-gray-600">আপনার অনুসন্ধান বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
        </div>
      )}
    </div>
  )
}
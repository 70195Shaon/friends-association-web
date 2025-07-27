/**
 * Messaging System Component
 * Members can send messages to admins, admins can reply
 */
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Message, MessageReply } from '../types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { 
  MessageSquare, 
  Plus, 
  Send, 
  Reply,
  Eye,
  AlertCircle,
  User,
  Shield
} from 'lucide-react'

export default function MessagingSystem() {
  const { user } = useAuth()
  const [showNewMessage, setShowNewMessage] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [newMessageData, setNewMessageData] = useState({
    subject: '',
    content: ''
  })
  const [replyContent, setReplyContent] = useState('')

  // Sample messages data
  const [messages, setMessages] = useState<Message[]>([])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newMessage: Message = {
      id: Date.now().toString(),
      fromUserId: user!.userId,
      fromUserName: user!.name,
      fromUserRole: user!.role === 'super_admin' || user!.role === 'admin' ? 'admin' : 'member',
      toUserId: user!.role === 'member' ? undefined : undefined, // Members send to all admins
      subject: newMessageData.subject,
      content: newMessageData.content,
      isRead: false,
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setMessages([newMessage, ...messages])
    setNewMessageData({ subject: '', content: '' })
    setShowNewMessage(false)
    
    alert(user!.role === 'member' 
      ? 'আপনার মেসেজ এডমিনদের কাছে পাঠানো হয়েছে' 
      : 'মেসেজ পাঠানো হয়েছে'
    )
  }

  const handleSendReply = (messageId: string) => {
    if (!replyContent.trim()) return

    const reply: MessageReply = {
      id: Date.now().toString(),
      messageId: messageId,
      fromUserId: user!.userId,
      fromUserName: user!.name,
      fromUserRole: user!.role === 'super_admin' || user!.role === 'admin' ? 'admin' : 'member',
      content: replyContent,
      createdAt: new Date()
    }

    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, replies: [...(msg.replies || []), reply], updatedAt: new Date() }
        : msg
    ))

    setReplyContent('')
    setReplyingTo(null)
    alert('উত্তর পাঠানো হয়েছে')
  }

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ))
  }

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin'
  const isMember = user?.role === 'member'

  // Filter messages based on user role
  const filteredMessages = isAdmin 
    ? messages // Admins see all messages
    : messages.filter(msg => msg.fromUserId === user?.userId) // Members see only their messages

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">মেসেজ সিস্টেম</h1>
          <p className="text-gray-600">
            {isAdmin 
              ? 'সদস্যদের মেসেজ দেখুন এবং উত্তর দিন' 
              : 'এডমিনদের সাথে যোগাযোগ করুন'
            }
          </p>
        </div>
        <Button onClick={() => setShowNewMessage(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {isAdmin ? 'নতুন মেসেজ' : 'এডমিনকে মেসেজ পাঠান'}
        </Button>
      </div>

      {/* New Message Form */}
      {showNewMessage && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {isAdmin ? 'নতুন মেসেজ পাঠান' : 'এডমিনদের কাছে মেসেজ পাঠান'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <Label htmlFor="subject">বিষয় *</Label>
                <Input
                  id="subject"
                  value={newMessageData.subject}
                  onChange={(e) => setNewMessageData({ ...newMessageData, subject: e.target.value })}
                  placeholder="মেসেজের বিষয় লিখুন"
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">বার্তা *</Label>
                <Textarea
                  id="content"
                  value={newMessageData.content}
                  onChange={(e) => setNewMessageData({ ...newMessageData, content: e.target.value })}
                  placeholder="আপনার বার্তা বিস্তারিত লিখুন"
                  rows={5}
                  required
                />
              </div>

              <div className="flex space-x-3">
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  মেসেজ পাঠান
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowNewMessage(false)
                    setNewMessageData({ subject: '', content: '' })
                  }}
                >
                  বাতিল
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">কোনো মেসেজ নেই</h3>
              <p className="text-gray-600">
                {isAdmin 
                  ? 'এখনও কোনো সদস্য মেসেজ পাঠায়নি' 
                  : 'আপনার কোনো মেসেজ নেই'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card key={message.id} className={`${!message.isRead && isAdmin ? 'border-blue-500' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${message.fromUserRole === 'admin' ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                      {message.fromUserRole === 'admin' ? (
                        <Shield className="h-5 w-5 text-blue-600" />
                      ) : (
                        <User className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{message.subject}</CardTitle>
                      <p className="text-sm text-gray-600">
                        থেকে: {message.fromUserName} 
                        <Badge 
                          variant={message.fromUserRole === 'admin' ? 'default' : 'secondary'}
                          className="ml-2"
                        >
                          {message.fromUserRole === 'admin' ? 'এডমিন' : 'সদস্য'}
                        </Badge>
                      </p>
                      <p className="text-xs text-gray-500">
                        {message.createdAt.toLocaleString('bn-BD')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!message.isRead && isAdmin && (
                      <Badge variant="destructive">নতুন</Badge>
                    )}
                    {isAdmin && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markAsRead(message.id)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>

                  {/* Replies */}
                  {message.replies && message.replies.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">উত্তরসমূহ:</h4>
                      <div className="space-y-3">
                        {message.replies.map((reply) => (
                          <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className={`w-6 h-6 ${reply.fromUserRole === 'admin' ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                                {reply.fromUserRole === 'admin' ? (
                                  <Shield className="h-3 w-3 text-blue-600" />
                                ) : (
                                  <User className="h-3 w-3 text-green-600" />
                                )}
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                {reply.fromUserName}
                                <Badge 
                                  variant={reply.fromUserRole === 'admin' ? 'default' : 'secondary'}
                                  className="ml-2 text-xs"
                                >
                                  {reply.fromUserRole === 'admin' ? 'এডমিন' : 'সদস্য'}
                                </Badge>
                              </p>
                              <p className="text-xs text-gray-500">
                                {reply.createdAt.toLocaleString('bn-BD')}
                              </p>
                            </div>
                            <p className="text-gray-700 text-sm whitespace-pre-wrap">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === message.id ? (
                    <div className="border-t pt-4">
                      <div className="space-y-3">
                        <Textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="আপনার উত্তর লিখুন..."
                          rows={3}
                        />
                        <div className="flex space-x-2">
                          <Button 
                            size="sm"
                            onClick={() => handleSendReply(message.id)}
                            disabled={!replyContent.trim()}
                          >
                            <Send className="h-3 w-3 mr-1" />
                            উত্তর পাঠান
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setReplyingTo(null)
                              setReplyContent('')
                            }}
                          >
                            বাতিল
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t pt-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setReplyingTo(message.id)}
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        উত্তর দিন
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            {isAdmin ? 'এডমিনদের জন্য নির্দেশনা' : 'সদস্যদের জন্য নির্দেশনা'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isAdmin ? (
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• সদস্যদের সকল মেসেজ এখানে দেখতে পাবেন</li>
              <li>• নতুন মেসেজে "নতুন" ব্যাজ দেখাবে</li>
              <li>• প্রতিটি মেসেজের উত্তর দিতে পারবেন</li>
              <li>• মেসেজ পড়া হয়েছে মার্ক করতে পারবেন</li>
              <li>• দ্রুত সমাধানের জন্য অগ্রাধিকার দিন</li>
            </ul>
          ) : (
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• যেকোনো সমস্যা বা প্রশ্নের জন্য এডমিনদের মেসেজ পাঠান</li>
              <li>• স্পষ্ট বিষয় ও বিস্তারিত বর্ণনা দিন</li>
              <li>• এডমিনরা দ্রুত উত্তর দেওয়ার চেষ্টা করবেন</li>
              <li>• আপনার পাঠানো মেসেজ ও তার উত্তর এখানে দেখতে পাবেন</li>
              <li>• জরুরি বিষয়ে সরাসরি যোগাযোগ করুন: ০১৭০০০০০০০১</li>
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
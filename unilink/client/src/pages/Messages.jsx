import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, MoreHorizontal, Phone, Video } from 'lucide-react'

const CONVERSATIONS = [
  {
    id: 1, name: 'Priya Rajan', compatibility: 87, isOnline: true,
    lastMessage: 'Are you joining the DS study session tonight?', time: '2m ago', unread: 2,
    color: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    messages: [
      { id: 1, from: 'them', text: 'Hey Alex! I saw we matched on UniLink 😊', time: '10:30 AM' },
      { id: 2, from: 'me', text: 'Hi Priya! Yes, I noticed we both love coding and anime!', time: '10:32 AM' },
      { id: 3, from: 'them', text: 'Exactly! Are you in the Data Structures class with Prof. Chen?', time: '10:33 AM' },
      { id: 4, from: 'me', text: 'I am! That midterm was brutal 😅', time: '10:35 AM' },
      { id: 5, from: 'them', text: 'Ikr! That\'s why I\'m starting a study group. Are you joining the DS study session tonight?', time: '10:38 AM' },
    ],
  },
  {
    id: 2, name: 'Kofi Owusu', compatibility: 79, isOnline: false,
    lastMessage: 'That shot from the library rooftop was 🔥', time: '1h ago', unread: 0,
    color: 'linear-gradient(135deg, #f97316, #fb923c)',
    messages: [
      { id: 1, from: 'them', text: 'Loved your photography post on the feed!', time: '9:15 AM' },
      { id: 2, from: 'me', text: 'Thank you! I\'ve been experimenting with golden hour shots', time: '9:20 AM' },
      { id: 3, from: 'them', text: 'That shot from the library rooftop was 🔥', time: '9:45 AM' },
    ],
  },
  {
    id: 3, name: 'Maya Lin', compatibility: 74, isOnline: true,
    lastMessage: 'Board game night this Saturday?', time: '3h ago', unread: 1,
    color: 'linear-gradient(135deg, #10b981, #34d399)',
    messages: [
      { id: 1, from: 'them', text: 'Hi! I organize a weekly board game night', time: '7:00 PM' },
      { id: 2, from: 'me', text: 'That sounds so fun! I love Catan and Codenames', time: '7:15 PM' },
      { id: 3, from: 'them', text: 'Board game night this Saturday?', time: '7:16 PM' },
    ],
  },
]

const REQUESTS = [
  { id: 1, name: 'Sam Kim', major: 'Mechanical Eng.', compatibility: 68, message: 'Hey! I noticed we both like robotics. Want to collaborate on a project?' },
  { id: 2, name: 'Ethan Brooks', major: 'Computer Science', compatibility: 61, message: 'I\'m new to campus and looking for study partners for algorithms class!' },
]

export default function Messages() {
  const [activeTab, setActiveTab] = useState('messages')
  const [activeConvo, setActiveConvo] = useState(null)
  const [inputText, setInputText] = useState('')
  const [conversations, setConversations] = useState(CONVERSATIONS)
  const [requests, setRequests] = useState(REQUESTS)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (activeConvo) scrollToBottom()
  }, [activeConvo])

  const sendMessage = () => {
    if (!inputText.trim() || !activeConvo) return
    const newMsg = { id: Date.now(), from: 'me', text: inputText, time: 'Just now' }
    setConversations(prev => prev.map(c =>
      c.id === activeConvo.id
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: inputText, time: 'Just now' }
        : c
    ))
    setActiveConvo(prev => ({ ...prev, messages: [...prev.messages, newMsg] }))
    setInputText('')
    setTimeout(scrollToBottom, 100)
  }

  const handleAccept = (req) => {
    setRequests(prev => prev.filter(r => r.id !== req.id))
    const newConvo = {
      id: Date.now(), name: req.name, compatibility: req.compatibility, isOnline: true,
      lastMessage: req.message, time: 'Just now', unread: 1,
      color: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      messages: [{ id: 1, from: 'them', text: req.message, time: 'Just now' }],
    }
    setConversations(prev => [newConvo, ...prev])
  }

  const handleDecline = (req) => setRequests(prev => prev.filter(r => r.id !== req.id))

  // Chat view
  if (activeConvo) {
    return (
      <div className="flex flex-col h-screen" style={{ background: 'var(--color-bg)', paddingBottom: '80px' }}>
        {/* Chat header */}
        <div className="px-4 py-4 flex items-center gap-3" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <button onClick={() => setActiveConvo(null)} className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--color-primary-soft)' }}>
            <ArrowLeft size={18} style={{ color: 'var(--color-primary)' }} />
          </button>
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: activeConvo.color }}>
            <span className="text-white font-bold">{activeConvo.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{activeConvo.name}</p>
            <p className="text-xs" style={{ color: activeConvo.isOnline ? 'var(--color-mint)' : 'var(--color-muted)' }}>
              {activeConvo.isOnline ? '● Active now' : 'Offline'}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-primary-soft)' }}>
              <Phone size={16} style={{ color: 'var(--color-primary)' }} />
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-primary-soft)' }}>
              <MoreHorizontal size={16} style={{ color: 'var(--color-primary)' }} />
            </button>
          </div>
        </div>

        {/* Compatibility badge */}
        <div className="flex justify-center py-3">
          <span className="text-xs font-semibold px-4 py-1.5 rounded-full" style={{ background: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}>
            🎯 {activeConvo.compatibility}% Compatible
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 space-y-3 py-2">
          {activeConvo.messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[75%]">
                <div className={msg.from === 'me' ? 'bubble-sent' : 'bubble-received'} style={{ padding: '10px 14px' }}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <p className="text-[10px] mt-1 px-1" style={{ color: 'var(--color-muted)', textAlign: msg.from === 'me' ? 'right' : 'left' }}>
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="fixed bottom-16 left-0 right-0 px-4 py-3" style={{ background: 'rgba(248,247,255,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message…"
              className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
              style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', color: 'var(--color-text)' }}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,0.35)' }}
            >
              <Send size={18} color="white" />
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-display font-bold" style={{ color: 'var(--color-text)' }}>Messages</h1>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Stay connected with your matches</p>
      </motion.div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
        className="flex gap-1 p-1 rounded-2xl mb-6" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        {['messages', 'requests'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-200 relative"
            style={activeTab === tab
              ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', boxShadow: '0 3px 10px rgba(99,102,241,0.3)' }
              : { color: 'var(--color-muted)' }
            }
          >
            {tab === 'requests' && requests.length > 0 && (
              <span className="absolute top-1.5 right-2 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                style={{ background: '#f97316', color: 'white' }}>
                {requests.length}
              </span>
            )}
            {tab}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === 'messages' && (
          <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            {conversations.map((convo, i) => (
              <motion.div
                key={convo.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setActiveConvo(convo)}
                className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer card-hover"
                style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: convo.color }}>
                    <span className="text-white font-bold font-display">{convo.name.charAt(0)}</span>
                  </div>
                  {convo.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full"
                      style={{ background: '#10b981', border: '2px solid white' }} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{convo.name}</p>
                    <span className="text-[11px]" style={{ color: 'var(--color-muted)' }}>{convo.time}</span>
                  </div>
                  <p className="text-xs truncate mt-0.5" style={{ color: convo.unread > 0 ? 'var(--color-text)' : 'var(--color-muted)', fontWeight: convo.unread > 0 ? '600' : '400' }}>
                    {convo.lastMessage}
                  </p>
                </div>

                {convo.unread > 0 && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                    {convo.unread}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'requests' && (
          <motion.div key="requests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {requests.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">✉️</p>
                <p className="font-bold" style={{ color: 'var(--color-text)' }}>No pending requests</p>
                <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>Connection requests will appear here</p>
              </div>
            ) : requests.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-3xl"
                style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
                    <span className="text-white font-bold font-display">{req.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{req.name}</p>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{req.major} · {req.compatibility}% match</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4 px-1" style={{ color: '#6b7280' }}>"{req.message}"</p>
                <div className="flex gap-2">
                  <button onClick={() => handleAccept(req)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}>
                    Accept
                  </button>
                  <button onClick={() => handleDecline(req)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                    style={{ background: 'var(--color-bg)', color: 'var(--color-muted)' }}>
                    Decline
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import React, { useState, useRef, useEffect } from 'react';
import { X, Bot, Send, Sparkles, AlertTriangle, BarChart2, Calendar } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const operatorResponses: Record<string, string> = {
  'tours at risk': `I found **3 tours** requiring immediate attention today:\n\n🔴 **Kashmir #WV204** — Flight delay (IndiGo 6E204, +2 hours)\nImpact: Airport transfer, hotel check-in, dinner reservation\n\n🔴 **Goa #WV198** — Hotel overbooked (2 rooms affected)\nImpact: Accommodation for Oct 9-13 at risk\n\n🟡 **Manali #WV190** — Activity unavailable (Rohtang Pass closed)\nImpact: Day 3 itinerary needs replanning\n\nWould you like me to prepare recommended actions for each?`,
  'operational risks': `Today's **operational risk summary**:\n\n⚠️ **High Priority (2)**\n• Flight delay on WV204 — Airport transfer cascading impact\n• Hotel overbook on WV198 — Need alternative by 6 PM\n\n⚠️ **Medium Priority (1)**\n• Weather closure at Rohtang Pass — WV190 Day 3\n\n✅ **All Clear (3)**\n• WV203 Kerala — On schedule\n• WV202 Rajasthan — Day 5 progressing normally\n• WV195 Ladakh — Preparations on track\n\nRecommended action: Address WV204 and WV198 first.`,
  'alternatives': `For the **unavailable hotel** in Goa (WV198):\n\n🏨 **Option A: Taj Vivanta Goa** — ₹9,200/night (₹700 over budget)\n⭐ 4.8 | Sea-facing | Available Oct 9-13\n\n🏨 **Option B: Lemon Tree Candolim** — ₹7,800/night (within budget)\n⭐ 4.5 | Garden view | Available Oct 9-13\n\n🏨 **Option C: Novotel Goa Shrem** — ₹8,500/night (within budget)\n⭐ 4.6 | Pool view | Available Oct 9-11 only\n\n💡 **AI Recommendation:** Option B — Lemon Tree Candolim. Within budget, excellent reviews for families, and fully available for your dates.`,
  'schedule': `Tomorrow's **optimized schedule**:\n\n☀️ **06:00** — WV204 Airport pickup (rescheduled +2h due to delay)\n🏨 **10:30** — WV202 Hotel check-out, Jaipur\n🚌 **11:00** — WV202 Transfer to Jodhpur (on schedule)\n✈️ **14:30** — WV204 Arrival Srinagar (delayed flight)\n🏨 **16:00** — WV204 Hotel check-in Srinagar (adjusted)\n🍽️ **19:00** — WV203 Group dinner, Kerala (confirmed)\n\n2 schedule adjustments made. All vendors notified automatically.`,
  'payments': `**Pending vendor payments** requiring action:\n\n💳 Mountain Adventures (WV204) — ₹44,000 due Oct 5\n💳 Srinagar Travel Co. (WV204) — ₹18,000 due Oct 10\n💳 Goa Beach Resort (WV198) — ₹56,000 due Oct 8 ⚠️ URGENT\n\n**Traveler balance payments:**\n• Priya Sharma (WV202) — ₹38,000 balance outstanding\n• Dev Patel (WV190) — ₹32,000 not yet paid\n\nTotal outstanding: **₹1,88,000**\nWould you like me to send payment reminders?`,
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('risk') || lower.includes('attention')) return operatorResponses['tours at risk'];
  if (lower.includes('operational')) return operatorResponses['operational risks'];
  if (lower.includes('alternative') || lower.includes('hotel')) return operatorResponses['alternatives'];
  if (lower.includes('schedule') || lower.includes('tomorrow')) return operatorResponses['schedule'];
  if (lower.includes('payment') || lower.includes('pending')) return operatorResponses['payments'];
  return `I understand you need help with "${input}". Based on current data, I'm analyzing your tours and operations. For the most accurate recommendation, could you specify:\n\n• Which tour are you referring to?\n• What's the primary concern — schedule, budget, or vendor?\n\nOr try asking me about "tours at risk", "operational risks", or "pending payments".`;
};

interface AIChatProps {
  onClose: () => void;
  variant?: 'operator' | 'traveler';
}

const AIChat: React.FC<AIChatProps> = ({ onClose, variant = 'operator' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: variant === 'operator'
        ? "Hi Alex! I'm your WAYVO Operations AI. I have real-time visibility across all your tours.\n\nI can help you with:\n• Tours at risk today\n• Operational conflicts\n• Vendor alternatives\n• Schedule optimization"
        : "Hi Alison! I'm your WAYVO travel assistant. I'm here to help with your Kashmir journey.\n\nI can help you with:\n• Activity alternatives\n• Itinerary changes\n• Local recommendations\n• Budget optimization",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestions = variant === 'operator'
    ? ['Show today\'s operational risks', 'Find hotel alternatives', 'Which tours need attention?', 'Pending payments']
    : ['Replace tomorrow\'s trek', 'Budget breakdown', 'Best restaurants nearby', 'Weather update'];

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content) return;
    
    const userMsg: Message = { role: 'user', content, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 1200));
    
    const response = getResponse(content);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: response,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setLoading(false);
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold">{line.replace(/\*\*/g, '')}</p>;
      }
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className={line === '' ? 'mt-2' : 'leading-relaxed'}>
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j}>{part.replace(/\*\*/g, '')}</strong>
              : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.2)] border border-gray-100 flex flex-col overflow-hidden animate-slide-up max-h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-brand-red to-red-700 text-white flex-shrink-0">
        <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
          <Sparkles size={16} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm">WAYVO AI</p>
          <p className="text-white/70 text-xs">Operations Intelligence</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-white/70">Live</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar min-h-0">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0 self-start mt-1">
                <Bot size={14} className="text-white" />
              </div>
            )}
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className={`px-3.5 py-2.5 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-brand-red text-white rounded-tr-md'
                  : 'bg-gray-50 text-gray-800 rounded-tl-md'
              }`}>
                <div className="space-y-0.5">{formatMessage(msg.content)}</div>
              </div>
              <span className="text-gray-400 text-xs px-1">{msg.time}</span>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-gray-50 rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex-shrink-0">
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs bg-red-50 text-brand-red px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-100 flex gap-2 flex-shrink-0">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask anything..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          className="w-9 h-9 bg-brand-red text-white rounded-xl flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-50 flex-shrink-0"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};

export default AIChat;

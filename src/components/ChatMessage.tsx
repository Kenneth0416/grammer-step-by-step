interface ChatMessageProps {
  type: 'ai' | 'user'
  message: string
}

export default function ChatMessage({ type, message }: ChatMessageProps) {
  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'gap-2'}`}>
      {type === 'ai' && (
        <div className="w-7 h-7 bg-gradient-to-br from-[#FCC30A] to-[#E6A800] rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-sm">✏️</span>
        </div>
      )}
      <div className={`max-w-[85%] ${type === 'user' ? 'bg-gradient-to-br from-[#FCC30A] to-[#E6A800] rounded-2xl rounded-tr-sm px-4 py-2.5' : 'bg-white border border-[#E2E8F0] rounded-2xl rounded-tl-sm px-4 py-3'}`}>
        <p className="text-sm text-[#1E293B]">{message}</p>
      </div>
    </div>
  )
}

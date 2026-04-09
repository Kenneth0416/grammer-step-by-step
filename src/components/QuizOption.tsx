// src/components/QuizOption.tsx
interface QuizOptionProps {
  letter: string
  text: string
  status: 'default' | 'correct' | 'incorrect'
  onClick: () => void
}

const statusStyles = {
  default: 'bg-white border-2 border-[#E2E8F0]',
  correct: 'bg-[#DCFCE7] border-2 border-[#10B981]',
  incorrect: 'bg-white border-2 border-[#FC5B5B]',
}

const letterStyles = {
  default: 'bg-[#F8FAFC] text-[#64748B]',
  correct: 'bg-white text-[#10B981]',
  incorrect: 'bg-white text-[#FC5B5B]',
}

export default function QuizOption({ letter, text, status, onClick }: QuizOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl flex items-center gap-3 text-left transition-all ${statusStyles[status]}`}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold ${letterStyles[status]}`}>
        {letter}
      </div>
      <span className="flex-1 font-semibold text-[#1E293B]">{text}</span>
      {status === 'correct' && <span className="text-[#10B981] text-lg">✓</span>}
    </button>
  )
}

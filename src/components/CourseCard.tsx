interface CourseCardProps {
  letter: string
  title: string
  subtitle: string
  status: 'complete' | 'progress' | 'locked'
  progress?: number
}

export default function CourseCard({ letter, title, subtitle, status, progress }: CourseCardProps) {
  const letterColors = {
    complete: { bg: 'bg-[#DCFCE7]', text: 'text-[#10B981]' },
    progress: { bg: 'bg-[#FEF9C3]', text: 'text-[#CA8A04]' },
    locked: { bg: 'bg-[#F1F5F9]', text: 'text-[#94A3B8]' },
  }
  const lc = letterColors[status]

  return (
    <div className={`card ${status === 'locked' ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 ${lc.bg} rounded-xl flex items-center justify-center`}>
            <span className={`font-bold text-lg ${lc.text}`}>{letter}</span>
          </div>
          <div>
            <div className="font-semibold text-[#1E293B]">{title}</div>
            <div className="text-xs text-[#64748B]">{subtitle}</div>
          </div>
        </div>
        {status === 'complete' && <span className="badge badge-complete">✓</span>}
        {status === 'progress' && <span className="text-[#FCC30A]">→</span>}
        {status === 'locked' && <span>🔒</span>}
      </div>
      {status === 'progress' && progress !== undefined && (
        <div className="mt-3">
          <div className="h-1.5 bg-[#F1F5F9] rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#FCC30A] to-[#33CAF5] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

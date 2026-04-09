interface StatsCardProps {
  value: string | number
  label: string
  color: 'gold' | 'cyan' | 'coral'
}

const colors = {
  gold: { bg: 'bg-[#FEF9C3]', border: 'border-[#FCC30A]', text: 'text-[#FCC30A]' },
  cyan: { bg: 'bg-[#E0F2FE]', border: 'border-[#33CAF5]', text: 'text-[#33CAF5]' },
  coral: { bg: 'bg-[#FCE7F3]', border: 'border-[#FC5B5B]', text: 'text-[#FC5B5B]' },
}

export default function StatsCard({ value, label, color }: StatsCardProps) {
  const c = colors[color]
  return (
    <div className={`card text-center border ${c.border}`}>
      <div className={`text-2xl font-bold ${c.text}`}>{value}</div>
      <div className="text-xs text-[#64748B] mt-1">{label}</div>
    </div>
  )
}

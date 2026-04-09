'use client'
import { useState } from 'react'
import Link from 'next/link'
import UnitTabs from '@/components/UnitTabs'

const courseData = {
  id: '1a',
  letter: 'A',
  title: 'Nouns Basics',
  subtitle: '6 units',
  units: [
    { id: 1, title: 'Warm-up' },
    { id: 2, title: 'Presentation' },
    { id: 3, title: 'Practice' },
    { id: 4, title: 'Production' },
    { id: 5, title: 'Quiz' },
    { id: 6, title: 'Reflection' },
  ],
  completedUnits: [1],
  content: {
    2: {
      title: 'Presentation',
      description: 'Learn about the four types of nouns: people, places, things, and ideas.',
      examples: [
        { emoji: '👤', type: 'People', color: 'bg-[#DCFCE7]', textColor: 'text-[#10B981]' },
        { emoji: '📍', type: 'Places', color: 'bg-[#E0F2FE]', textColor: 'text-[#0284C7]' },
        { emoji: '📦', type: 'Things', color: 'bg-[#FEF9C3]', textColor: 'text-[#CA8A04]' },
        { emoji: '💡', type: 'Ideas', color: 'bg-[#FCE7F3]', textColor: 'text-[#DB2777]' },
      ],
    },
  },
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [activeUnit, setActiveUnit] = useState(2)

  return (
    <main>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <Link href="/grammar" className="text-[#22497C] inline-flex items-center gap-2">
          ← <span className="font-semibold">Back</span>
        </Link>
        <span className="bg-[#FEF9C3] text-[#D97706] px-3 py-1 rounded-xl text-sm font-semibold">
          {courseData.completedUnits.length} / {courseData.units.length}
        </span>
      </div>

      {/* Course Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 bg-[#DCFCE7] rounded-xl flex items-center justify-center">
          <span className="font-bold text-xl text-[#10B981]">{courseData.letter}</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#22497C]">{courseData.title}</h1>
          <p className="text-xs text-[#64748B]">{courseData.subtitle}</p>
        </div>
      </div>

      {/* Unit Tabs */}
      <UnitTabs
        units={courseData.units}
        activeUnit={activeUnit}
        completedUnits={courseData.completedUnits}
        onSelect={setActiveUnit}
      />

      {/* Content */}
      <div className="mt-4">
        <div className="card border-[#FEF3C7]">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-[#22497C]">Unit {activeUnit}: {courseData.units.find(u => u.id === activeUnit)?.title}</h3>
              <p className="text-sm text-[#64748B]">Try it Out!</p>
            </div>
            <span className="bg-[#FEF9C3] text-[#D97706] px-2.5 py-1 rounded-lg text-xs font-semibold">+10 pts</span>
          </div>
          <p className="text-sm text-[#64748B] mb-4">Learn about the four types of nouns: people, places, things, and ideas.</p>

          {/* Examples Grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {courseData.content[2 as keyof typeof courseData.content].examples.map((ex) => (
              <div key={ex.type} className={`${ex.color} p-2.5 rounded-xl`}>
                <div className="text-sm mb-1">{ex.emoji}</div>
                <div className={`text-[11px] font-semibold ${ex.textColor}`}>{ex.type}</div>
              </div>
            ))}
          </div>

          <button className="btn-primary w-full">Start Unit →</button>
        </div>
      </div>
    </main>
  )
}

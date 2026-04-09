import Link from 'next/link'
import CourseCard from '@/components/CourseCard'

const courses = [
  { id: '1a', letter: 'A', title: 'Nouns Basics', subtitle: '6 units · +60 pts', status: 'complete' as const },
  { id: '1b', letter: 'B', title: 'Singular & Plural', subtitle: '4 of 6 units', status: 'progress' as const, progress: 67 },
  { id: '1c', letter: 'C', title: 'Countable & Uncountable', subtitle: 'Coming soon', status: 'locked' as const },
  { id: '1d', letter: 'D', title: 'Articles', subtitle: '5 units', status: 'locked' as const },
]

export default function GrammarPage() {
  return (
    <main>
      <Link href="/" className="text-[#22497C] mb-5 inline-flex items-center gap-2">
        ← <span className="font-semibold">All Courses</span>
      </Link>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
        {['All', 'Nouns', 'Verbs', 'Adjectives'].map((filter, i) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              i === 0
                ? 'bg-[#22497C] text-white'
                : 'bg-white text-[#64748B] border border-[#E2E8F0]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="flex flex-col gap-3">
        {courses.map((course) => (
          <Link key={course.id} href={`/grammar/${course.id}`}>
            <CourseCard {...course} />
          </Link>
        ))}
      </div>
    </main>
  )
}

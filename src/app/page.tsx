import StatsCard from '@/components/StatsCard'
import CourseCard from '@/components/CourseCard'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#FCC30A] to-[#F8A800] rounded-2xl p-7 mb-5">
        <h1 className="text-[#22497C] text-2xl font-bold mb-2">
          Master English Grammar<br/>
          <span className="text-[#FCC30A]">Step by Step</span>
        </h1>
        <p className="text-[#64748B] text-sm mb-4">
          AI-powered lessons with instant feedback
        </p>
        <button className="btn-primary">
          Start Learning →
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatsCard value="280" label="Points" color="gold" />
        <StatsCard value="12" label="Badges" color="cyan" />
        <StatsCard value="#5" label="Ranking" color="coral" />
      </div>

      {/* My Courses */}
      <h2 className="text-[#22497C] font-semibold mb-3">My Courses</h2>
      <div className="flex flex-col gap-3">
        <CourseCard letter="A" title="Nouns Basics" subtitle="6 units completed" status="complete" />
        <CourseCard letter="B" title="Singular & Plural" subtitle="4 of 6 units" status="progress" progress={67} />
        <CourseCard letter="C" title="Countable & Uncountable" subtitle="Coming soon" status="locked" />
      </div>
    </main>
  )
}

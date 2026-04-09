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
    </main>
  )
}

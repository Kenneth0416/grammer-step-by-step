# Grammar Quest UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement Light & Fresh UI redesign based on approved spec

**Architecture:** Replace existing CSS with new design token system, create reusable components, build pages using component composition.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript 5

---

## File Structure

```
src/
├── app/
│   ├── globals.css              # Modify: Replace with new design tokens
│   ├── layout.tsx             # Create: Root layout with Header
│   ├── page.tsx               # Create: Homepage
│   ├── grammar/
│   │   ├── page.tsx           # Create: Course list (Card Grid)
│   │   └── [id]/
│   │       └── page.tsx       # Create: Course detail (Tab Nav)
│   └── practice/
│       └── page.tsx           # Create: Quiz page
└── components/
    ├── Header.tsx             # Create: Navigation header
    ├── HeroCard.tsx           # Create: Hero section
    ├── StatsCard.tsx          # Create: Points/Badges/Rank display
    ├── CourseCard.tsx         # Create: Course card with progress
    ├── UnitTabs.tsx           # Create: Unit navigation tabs
    ├── QuizOption.tsx         # Create: Quiz option card
    ├── ProgressBar.tsx        # Create: Progress bar component
    ├── Badge.tsx              # Create: Status badge component
    └── ChatMessage.tsx        # Create: Chat bubble component
```

---

## Task 1: Setup Design Tokens

**Files:**
- Modify: `src/app/globals.css`

**Steps:**

- [ ] **Step 1: Replace globals.css with new design tokens**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Brand Colors */
  --gold: #FCC30A;
  --gold-dark: #E6A800;
  --navy: #22497C;
  --cyan: #33CAF5;
  --coral: #FC5B5B;
  --green: #10B981;

  /* Light Tints */
  --gold-tint: #FEF9C3;
  --cyan-tint: #E0F2FE;
  --coral-tint: #FCE7F3;
  --green-tint: #DCFCE7;
  --navy-tint: #EFF6FF;

  /* Neutrals */
  --bg: #FDFDFC;
  --surface: #FFFFFF;
  --text-primary: #1E293B;
  --text-secondary: #64748B;
  --border: #E2E8F0;
  --disabled: #F1F5F9;
}

body {
  background: linear-gradient(180deg, var(--bg) 0%, #F5FAFD 100%);
  font-family: 'Nunito', system-ui, sans-serif;
  color: var(--text-primary);
}
```

- [ ] **Step 2: Add component classes**

```css
/* Card Styles */
.card {
  background: var(--surface);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--border);
}

.card-tint {
  background: var(--surface);
  border-radius: 16px;
  padding: 18px;
  border: 1px solid var(--gold-tint);
}

/* Button Styles */
.btn-primary {
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: var(--text-primary);
  border-radius: 50px;
  padding: 14px 28px;
  font-weight: 600;
  border: none;
}

/* Badge Styles */
.badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge-complete {
  background: var(--green-tint);
  color: var(--green);
}

.badge-progress {
  background: var(--gold-tint);
  color: #D97706;
}
```

- [ ] **Step 3: Verify in browser**

Run: `cd "English Grammar Step-by-Step " && npm run dev`
Expected: Dev server starts without errors

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add design tokens for Light & Fresh UI"
```

---

## Task 2: Create Layout

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/components/Header.tsx`

**Steps:**

- [ ] **Step 1: Create Header component**

```tsx
// src/components/Header.tsx
export default function Header() {
  return (
    <header className="flex justify-between items-center mb-7">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-gradient-to-br from-[#FCC30A] to-[#E6A800] rounded-xl" />
        <span className="font-bold text-lg">
          <span className="text-[#22497C]">Grammai</span>
          <span className="text-[#FCC30A]">Pen</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#64748B]">Grammar</span>
        <span className="text-sm text-[#64748B]">Practice</span>
        <div className="w-8 h-8 bg-[#22497C] rounded-full" />
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Create root layout**

```tsx
// src/app/layout.tsx
import './globals.css'
import Header from '@/components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Create homepage with hero**

```tsx
// src/app/page.tsx
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
```

- [ ] **Step 4: Run and verify**

Run: `npm run dev`
Expected: Homepage with hero displays correctly

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/components/Header.tsx
git commit -m "feat: create root layout and homepage with hero"
```

---

## Task 3: Build Homepage Stats and Course Cards

**Files:**
- Create: `src/components/StatsCard.tsx`
- Create: `src/components/CourseCard.tsx`
- Modify: `src/app/page.tsx`

**Steps:**

- [ ] **Step 1: Create StatsCard component**

```tsx
// src/components/StatsCard.tsx
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
```

- [ ] **Step 2: Create CourseCard component**

```tsx
// src/components/CourseCard.tsx
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
        {status === 'complete' && (
          <span className="badge badge-complete">✓</span>
        )}
        {status === 'progress' && (
          <span className="text-[#FCC30A]">→</span>
        )}
        {status === 'locked' && (
          <span>🔒</span>
        )}
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
```

- [ ] **Step 3: Update homepage with stats and courses**

```tsx
// src/app/page.tsx - add after hero
import StatsCard from '@/components/StatsCard'
import CourseCard from '@/components/CourseCard'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#FCC30A] to-[#F8A800] rounded-2xl p-7 mb-5">
        {/* ... existing hero code ... */}
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
```

- [ ] **Step 4: Verify**

Run: `npm run dev`
Expected: Homepage shows stats row and course cards

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/components/StatsCard.tsx src/components/CourseCard.tsx
git commit -m "feat: add stats and course cards to homepage"
```

---

## Task 4: Build Course List Page

**Files:**
- Create: `src/app/grammar/page.tsx`

**Steps:**

- [ ] **Step 1: Create course list page**

```tsx
// src/app/grammar/page.tsx
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
```

- [ ] **Step 2: Verify**

Run: `npm run dev`
Navigate to: http://localhost:3000/grammar

- [ ] **Step 3: Commit**

```bash
git add src/app/grammar/page.tsx
git commit -m "feat: create course list page with filters"
```

---

## Task 5: Build Course Detail Page with Tab Navigation

**Files:**
- Create: `src/components/UnitTabs.tsx`
- Create: `src/app/grammar/[id]/page.tsx`

**Steps:**

- [ ] **Step 1: Create UnitTabs component**

```tsx
// src/components/UnitTabs.tsx
interface UnitTabsProps {
  units: { id: number; title: string }[]
  activeUnit: number
  completedUnits: number[]
  onSelect: (id: number) => void
}

export default function UnitTabs({ units, activeUnit, completedUnits, onSelect }: UnitTabsProps) {
  return (
    <div className="bg-white rounded-xl p-1 border border-[#E2E8F0] overflow-x-auto">
      <div className="flex min-w-max">
        {units.map((unit) => {
          const isComplete = completedUnits.includes(unit.id)
          const isActive = unit.id === activeUnit
          
          return (
            <button
              key={unit.id}
              onClick={() => onSelect(unit.id)}
              className={`flex-1 min-w-[80px] p-2.5 rounded-lg text-center m-0.5 transition-all ${
                isComplete
                  ? 'bg-[#DCFCE7]'
                  : isActive
                  ? 'bg-[#FCC30A]'
                  : 'bg-[#F8FAFC]'
              }`}
            >
              <div className={`text-[10px] font-semibold ${
                isComplete ? 'text-[#10B981]' : isActive ? 'text-white' : 'text-[#94A3B8]'
              }`}>
                UNIT {unit.id}
              </div>
              <div className={`text-[11px] mt-0.5 ${
                isComplete ? 'text-[#10B981]' : isActive ? 'text-white font-semibold' : 'text-[#94A3B8]'
              }`}>
                {unit.title}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create course detail page**

```tsx
// src/app/grammar/[id]/page.tsx
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
      badge: 'Unit 2',
      title: 'Presentation',
      subtitle: 'Try it Out!',
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
```

- [ ] **Step 3: Verify**

Run: `npm run dev`
Navigate to: http://localhost:3000/grammar/1a

- [ ] **Step 4: Commit**

```bash
git add src/app/grammar/[id]/page.tsx src/components/UnitTabs.tsx
git commit -m "feat: create course detail page with tab navigation"
```

---

## Task 6: Build Quiz Page

**Files:**
- Create: `src/components/QuizOption.tsx`
- Create: `src/app/practice/page.tsx`

**Steps:**

- [ ] **Step 1: Create QuizOption component**

```tsx
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
```

- [ ] **Step 2: Create quiz page**

```tsx
// src/app/practice/page.tsx
'use client'
import { useState } from 'react'
import QuizOption from '@/components/QuizOption'

const quizData = {
  currentQuestion: 3,
  totalQuestions: 5,
  question: {
    type: 'Multiple Choice',
    points: 10,
    text: 'Which word is a noun?',
    options: [
      { letter: 'A', text: 'teacher', correct: true },
      { letter: 'B', text: 'run', correct: false },
      { letter: 'C', text: 'happy', correct: false },
      { letter: 'D', text: 'quickly', correct: false },
    ],
  },
}

export default function PracticePage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSelect = (letter: string) => {
    setSelected(letter)
    setShowFeedback(true)
  }

  const progress = (quizData.currentQuestion / quizData.totalQuestions) * 100

  return (
    <main>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[#64748B]">Exit</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#64748B]">{quizData.currentQuestion} / {quizData.totalQuestions}</span>
          <div className="w-28 h-2 bg-[#E2E8F0] rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-[#FCC30A] to-[#33CAF5] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="card border-[#FEF3C7] mb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-[#FEF9C3] text-[#D97706] px-3 py-1.5 rounded-lg text-xs font-semibold">
            {quizData.question.type}
          </span>
          <span className="text-sm text-[#64748B]">+{quizData.question.points} pts</span>
        </div>
        
        <h3 className="text-lg font-semibold text-[#22497C] mb-5">
          {quizData.question.text}
        </h3>

        <div className="flex flex-col gap-2.5">
          {quizData.question.options.map((option) => {
            let status: 'default' | 'correct' | 'incorrect' = 'default'
            if (showFeedback) {
              status = option.correct ? 'correct' : (selected === option.letter ? 'incorrect' : 'default')
            }
            
            return (
              <QuizOption
                key={option.letter}
                letter={option.letter}
                text={option.text}
                status={status}
                onClick={() => !showFeedback && handleSelect(option.letter)}
              />
            )
          })}
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] rounded-2xl p-5 border border-[#10B981] mb-4">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="text-2xl">🎉</span>
            <div>
              <div className="font-bold text-[#10B981]">Correct!</div>
              <div className="text-xs text-[#64748B]">+10 points earned</div>
            </div>
          </div>
          <p className="text-sm text-[#64748B]">
            "Teacher" is a noun because it names a <strong>person</strong>.
          </p>
        </div>
      )}

      {/* Next Button */}
      {showFeedback && (
        <button className="btn-primary w-full">Next Question →</button>
      )}
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run dev`
Navigate to: http://localhost:3000/practice

- [ ] **Step 4: Commit**

```bash
git add src/app/practice/page.tsx src/components/QuizOption.tsx
git commit -m "feat: create quiz page with interactive feedback"
```

---

## Task 7: Add AI Tutor Component

**Files:**
- Create: `src/components/ChatMessage.tsx`
- Add to homepage

**Steps:**

- [ ] **Step 1: Create ChatMessage component**

```tsx
// src/components/ChatMessage.tsx
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
        <p className={`text-sm ${type === 'user' ? 'text-[#1E293B]' : 'text-[#1E293B]'}`}>{message}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Add AI Tutor card to homepage**

```tsx
// src/app/page.tsx - add after courses
export default function HomePage() {
  return (
    <main>
      {/* ... existing content ... */}
      
      {/* AI Tutor Card */}
      <div className="bg-gradient-to-br from-[#EFF6FF] to-[#E0F2FE] rounded-xl p-5 border border-[#BAE6FD] mt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#FCC30A] to-[#E6A800] rounded-xl flex items-center justify-center">
              <span className="text-lg">✏️</span>
            </div>
            <div>
              <div className="font-semibold text-[#22497C] text-sm">AI Grammar Tutor</div>
              <div className="text-xs text-[#64748B]">Ask me anything</div>
            </div>
          </div>
          <button className="bg-[#22497C] text-white px-4 py-2 rounded-full text-sm font-medium">
            Chat →
          </button>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ChatMessage.tsx src/app/page.tsx
git commit -m "feat: add AI tutor card to homepage"
```

---

## Task 8: Final Polish

**Steps:**

- [ ] **Step 1: Add Google Font (Nunito)**

```tsx
// src/app/layout.tsx - add to head
export const metadata = {
  title: 'Grammai Pen',
  description: 'AI-powered English grammar learning',
}

import { Nunito } from 'next/font/google'
const nunito = Nunito({ subsets: ['latin'] })

// In body: className={nunito.className}
```

- [ ] **Step 2: Add responsive styles**

Ensure cards stack properly on mobile, tabs scroll horizontally

- [ ] **Step 3: Test all pages**

Verify all pages work on mobile viewport

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete UI redesign - all pages implemented"
```

---

## Spec Coverage Check

| Spec Section | Task |
|-------------|------|
| Color System | Task 1 |
| Typography | Task 2 |
| Homepage Layout | Task 2-3 |
| Course List (Card Grid) | Task 4 |
| Course Detail (Tab Nav) | Task 5 |
| Quiz Page | Task 6 |
| AI Tutor | Task 7 |
| Points + Badges | Task 3, 6 |
| Responsive | Task 8 |

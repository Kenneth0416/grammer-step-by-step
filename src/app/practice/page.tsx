// src/app/practice/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleSelect = (letter: string) => {
    const option = quizData.question.options.find(o => o.letter === letter)
    const correct = option?.correct ?? false
    setSelected(letter)
    setShowFeedback(true)
    setIsCorrect(correct)
  }

  const progress = (quizData.currentQuestion / quizData.totalQuestions) * 100

  return (
    <main>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[#64748B] cursor-pointer" onClick={() => router.push('/')}>Exit</span>
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
      {showFeedback && isCorrect && (
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

      {showFeedback && !isCorrect && (
        <div className="bg-gradient-to-br from-[#FCE7F3] to-[#FECDD3] rounded-2xl p-5 border border-[#FC5B5B] mb-4">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="text-2xl">Try again!</span>
            <div>
              <div className="font-bold text-[#FC5B5B]">Not quite</div>
              <div className="text-xs text-[#64748B]">Pick the right answer</div>
            </div>
          </div>
          <p className="text-sm text-[#64748B]">
            "Teacher" names a person. Look for words that name <strong>people, places, things, or ideas</strong>.
          </p>
        </div>
      )}

      {/* Next Button */}
      {showFeedback && (
        <button className="btn-primary w-full" onClick={() => router.push('/grammar/1a')}>Next Question →</button>
      )}
    </main>
  )
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";

// Shared Navigation

// Stage Node for the Map
function StageNode({
  stage,
  title,
  subtitle,
  status,
  questions,
  completed,
  total,
  onClick
}: {
  stage: number;
  title: string;
  subtitle: string;
  status: 'locked' | 'unlocked' | 'completed' | 'current';
  questions: number;
  completed: number;
  total: number;
  onClick?: () => void;
}) {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer group ${status === 'locked' ? 'opacity-50' : ''}`}
      onClick={status !== 'locked' ? onClick : undefined}
    >
      {/* Stage Circle */}
      <div className={`stage-marker ${status} w-24 h-24 text-2xl mb-4 group-hover:scale-110 transition-transform`}>
        {status === 'completed' ? (
          <span className="text-3xl">✓</span>
        ) : status === 'locked' ? (
          <span className="text-2xl">🔒</span>
        ) : (
          <span>{stage}</span>
        )}
      </div>

      {/* Stage Info */}
      <div className="text-center">
        <h3 className="font-display text-lg font-semibold text-text-primary">{title}</h3>
        <p className="font-body text-sm text-text-secondary/60 mb-2">{subtitle}</p>

        {status !== 'locked' && (
          <>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-body text-xs text-text-secondary/50">{questions} Questions</span>
              <span className="text-text-secondary/30">•</span>
              <span className="font-body text-xs text-achievement-gold">+{questions * 10} pts</span>
            </div>
            <div className="w-32 h-2 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-progress-green-light to-progress-green rounded-full transition-all duration-500"
                style={{ width: `${(completed / total) * 100}%` }}
              />
            </div>
            <span className="font-display text-xs text-text-secondary/50 mt-1 block">{completed}/{total} complete</span>
          </>
        )}
      </div>
    </div>
  );
}

// Practice Question Component
function PracticeQuestion({
  question,
  options,
  correctIndex,
  explanation,
  onComplete
}: {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  onComplete: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    setTimeout(() => onComplete(index === correctIndex), 1500);
  };

  return (
    <div className="glass-card-elevated rounded-lg p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <span className="px-3 py-1 bg-academic-blue/10 rounded-full font-display text-sm text-academic-blue">Practice Question</span>
      </div>

      <h3 className="font-body text-xl text-text-primary mb-6">{question}</h3>

      <div className="space-y-3">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-full p-4 rounded-lg text-left font-body transition-all duration-300 ${
              selected === i
                ? i === correctIndex
                  ? 'bg-progress-green/20 border-2 border-progress-green text-text-primary'
                  : 'bg-red-100 border-2 border-red-400 text-text-primary'
                : showResult && i === correctIndex
                ? 'bg-progress-green/20 border-2 border-progress-green text-text-primary'
                : 'bg-bg-secondary border-2 border-transparent hover:border-academic-blue text-text-primary'
            }`}
          >
            <span className="font-display font-semibold mr-3">{String.fromCharCode(65 + i)}.</span>
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`mt-6 p-4 rounded-lg ${selected === correctIndex ? 'bg-progress-green/10' : 'bg-red-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            {selected === correctIndex ? (
              <>
                <span className="text-progress-green text-xl">✓</span>
                <span className="font-display font-semibold text-progress-green">Correct! +10 pts</span>
              </>
            ) : (
              <>
                <span className="text-red-500 text-xl">✗</span>
                <span className="font-display font-semibold text-red-500">Incorrect</span>
              </>
            )}
          </div>
          <p className="font-body text-text-secondary/70">{explanation}</p>
        </div>
      )}
    </div>
  );
}

// Achievement Popup
function AchievementPopup({
  title,
  description,
  icon,
  onClose
}: {
  title: string;
  description: string;
  icon: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-text-primary/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="glass-card-elevated rounded-lg p-8 text-center max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <div className="achievement-badge w-20 h-20 mx-auto mb-4 text-3xl">
          {icon}
        </div>
        <h3 className="font-display text-xl font-bold text-text-primary mb-2">{title}</h3>
        <p className="font-body text-text-secondary/70 mb-4">{description}</p>
        <button
          onClick={onClose}
          className="btn-adventure"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Main Practice Page
export default function PracticePage() {
  const [currentStage, setCurrentStage] = useState<number | null>(null);
  const [showAchievement, setShowAchievement] = useState(false);

  const stages = [
    {
      stage: 1,
      title: 'Noun Kingdom',
      subtitle: 'Noun Kingdom',
      status: 'completed' as const,
      questions: 10,
      completed: 10,
      total: 10
    },
    {
      stage: 2,
      title: 'Article Forest',
      subtitle: 'Article Forest',
      status: 'current' as const,
      questions: 15,
      completed: 7,
      total: 15
    },
    {
      stage: 3,
      title: 'Plural Mountains',
      subtitle: 'Plural Mountains',
      status: 'unlocked' as const,
      questions: 12,
      completed: 0,
      total: 12
    }
  ];

  const sampleQuestion = {
    question: 'Choose the correct article: ___ apple a day keeps the doctor away.',
    options: ['A', 'An', 'The', 'No article needed'],
    correctIndex: 1,
    explanation: 'We use "an" before words that start with a vowel sound. "Apple" starts with a vowel sound, so "an apple" is correct.'
  };

  return (
    <div className="min-h-screen pt-16 pb-20 md:pb-0">
      <Navigation activeRoute="/practice" />

      {/* Hero */}
      <section className="hero-bg py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Practice Arena
          </h1>
          <p className="font-body text-xl text-text-secondary/70 mb-8">
            Test your knowledge and earn rewards
          </p>

          {/* Stats Bar */}
          <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-achievement-gold text-xl">★</span>
              <div>
                <div className="font-display text-lg font-bold text-text-primary">1,250</div>
                <div className="font-body text-xs text-text-secondary/50">Total Points</div>
              </div>
            </div>
            <div className="w-px h-8 bg-academic-blue/30" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <div className="font-display text-lg font-bold text-text-primary">7</div>
                <div className="font-body text-xs text-text-secondary/50">Day Streak</div>
              </div>
            </div>
            <div className="w-px h-8 bg-academic-blue/30" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <div>
                <div className="font-display text-lg font-bold text-text-primary">85%</div>
                <div className="font-body text-xs text-text-secondary/50">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adventure Map */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-text-primary text-center mb-12">Adventure Map</h2>

          {/* Map Container */}
          <div className="relative">
            {/* Path SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: '400px' }}>
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#4169E1" />
                </linearGradient>
              </defs>
              <path
                d="M 100 200 Q 200 100, 350 200 T 600 200 T 850 200"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                strokeDasharray="10 5"
              />
            </svg>

            {/* Stage Nodes */}
            <div className="relative flex justify-between items-center py-24 px-8">
              {stages.map((stage) => (
                <StageNode
                  key={stage.stage}
                  {...stage}
                  onClick={() => setCurrentStage(stage.stage)}
                />
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-progress-green-light to-progress-green" />
              <span className="font-body text-sm text-text-secondary/70">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-achievement-gold-light to-achievement-gold" />
              <span className="font-body text-sm text-text-secondary/70">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-300" />
              <span className="font-body text-sm text-text-secondary/70">Locked</span>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Challenge */}
      <section className="py-16 px-4 gradient-adventure">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card-elevated rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-text-primary">Daily Challenge</h2>
                <p className="font-body text-text-secondary/60">Complete today's challenge for bonus points!</p>
              </div>
              <div className="flex items-center gap-2 bg-academic-blue/10 px-4 py-2 rounded-full">
                <span className="text-achievement-gold text-xl">★</span>
                <span className="font-display font-semibold text-achievement-gold">+50 pts</span>
              </div>
            </div>

            <PracticeQuestion
              {...sampleQuestion}
              onComplete={(correct) => {
                if (correct) {
                  setTimeout(() => setShowAchievement(true), 2000);
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* Practice Modes */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-text-primary text-center mb-8">Practice Modes</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card rounded-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-noun-brown/20 to-noun-brown/40 flex items-center justify-center">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-text-primary mb-2">Quick Quiz</h3>
              <p className="font-body text-sm text-text-secondary/60">10 random questions</p>
            </div>

            <div className="glass-card rounded-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-article-green/20 to-article-green/40 flex items-center justify-center">
                <span className="text-3xl">⏱️</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-text-primary mb-2">Time Attack</h3>
              <p className="font-body text-sm text-text-secondary/60">Answer fast for bonuses</p>
            </div>

            <div className="glass-card rounded-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-plural-blue/20 to-plural-blue/40 flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-text-primary mb-2">Focus Mode</h3>
              <p className="font-body text-sm text-text-secondary/60">Practice specific topics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Popup */}
      {showAchievement && (
        <AchievementPopup
          title="Daily Champion!"
          description="You completed today's daily challenge. Keep up the great work!"
          icon="🏆"
          onClose={() => setShowAchievement(false)}
        />
      )}
    </div>
  );
}
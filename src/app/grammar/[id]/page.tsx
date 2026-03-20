"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getLesson, LessonUnit } from "@/data/lessons";
import { LessonPoster } from "@/components/LessonPoster";
import { VideoUnit } from "@/components/VideoUnit";
import { Chatbot } from "@/components/Chatbot";
import { WritingEvaluation } from "@/components/WritingEvaluation";
import { EvaluationResult } from "@/types/evaluation";

const MAX_WRITING_LENGTH = 2000;
const MIN_WRITING_LENGTH = 10;
const ALLOWED_AVATARS = ['🧙‍♂️', '🧝‍♀️', '🦸‍♂️', '🦹‍♀️', '🧑‍🚀', '🧑‍🎨'];

/**
 * Validate avatar values against a strict whitelist.
 */
function isAllowedAvatar(value: string): value is string {
  return ALLOWED_AVATARS.includes(value);
}

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

class LessonErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message || "Unexpected error." };
  }

  componentDidCatch(error: Error) {
    console.error("Lesson page render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen pt-16 flex items-center justify-center">
          <div className="glass-card-elevated rounded-lg p-8 text-center max-w-lg">
            <h1 className="font-display text-2xl text-ink-brown mb-3">Something went wrong</h1>
            <p className="font-body text-sm text-text-secondary/70 mb-6">{this.state.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg font-display font-semibold bg-gradient-to-r from-academic-blue to-academic-blue-dark text-white hover:shadow-md transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Navigation Component
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card-elevated border-b border-academic-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-academic-blue to-academic-blue-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="font-display text-lg text-white">GQ</span>
            </div>
            <span className="font-display text-lg font-semibold text-text-primary hidden sm:block group-hover:text-academic-blue transition-colors">Grammar Quest</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/grammar" className="nav-link active">Grammar</Link>
            <Link href="/practice" className="nav-link">Practice</Link>
            <Link href="/game" className="nav-link">Game</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="points-display hover-glow cursor-pointer">
              <span className="text-white">★</span>
              <span>1,250</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-academic-blue to-sky-light flex items-center justify-center text-white font-display text-sm cursor-pointer hover:scale-105 transition-transform shadow-md">JK</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Teaching Unit Component
function TeachingUnit({ unit }: { unit: LessonUnit }) {
  return (
    <div className="glass-card-elevated rounded-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-achievement-gold-light to-achievement-gold flex items-center justify-center">
          <span className="text-lg">📚</span>
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold text-text-primary">{unit.title}</h3>
          <p className="font-body text-sm text-text-secondary/60">{unit.titleCn}</p>
        </div>
      </div>

      {unit.content && (
        <div className="space-y-4">
          <div className="bg-bg-secondary rounded-lg p-4">
            <p className="font-body text-text-primary leading-relaxed">{unit.content.explanation}</p>
          </div>

          {unit.content.rules && (
            <div className="bg-white rounded-lg border border-academic-blue/20 p-4">
              <h4 className="font-display text-sm font-semibold text-academic-blue mb-3 flex items-center gap-2">
                <span>📋</span> Rules
              </h4>
              <ul className="space-y-2">
                {unit.content.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-text-primary/80">
                    <span className="text-academic-blue font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {unit.content.tips && (
            <div className="bg-progress-green/10 rounded-lg border border-progress-green/30 p-4">
              <h4 className="font-display text-sm font-semibold text-progress-green mb-2 flex items-center gap-2">
                <span>💡</span> Tips
              </h4>
              {unit.content.tips.map((tip, i) => (
                <p key={i} className="font-body text-text-primary/80">{tip}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {unit.examples && (
        <div className="mt-4">
          <h4 className="font-display text-sm font-semibold text-achievement-gold mb-3 flex items-center gap-2">
            <span>✏️</span> Examples
          </h4>
          <div className="space-y-3">
            {unit.examples.map((ex, i) => (
              <div key={i} className="bg-bg-secondary rounded-lg p-4 border-l-4 border-achievement-gold">
                <p className="font-body text-text-primary font-medium mb-1">
                  {ex.highlight ? (
                    ex.sentence.split(new RegExp(`(${ex.highlight.split(', ').join('|')})`, 'gi')).map((part, j) =>
                      ex.highlight!.toLowerCase().includes(part.toLowerCase()) ? (
                        <span key={j} className="text-achievement-gold font-semibold underline decoration-achievement-gold/50">{part}</span>
                      ) : (
                        part
                      )
                    )
                  ) : (
                    ex.sentence
                  )}
                </p>
                <p className="font-body text-sm text-text-secondary/60">{ex.translation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Quiz Unit Component
function QuizUnit({
  unit,
  onComplete,
  onAutoScroll,
  onWritingSubmit
}: {
  unit: LessonUnit;
  onComplete: (score: number, total: number) => void;
  onAutoScroll: () => void;
  onWritingSubmit?: (writing: string) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [fillAnswer, setFillAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const questions = unit.questions || [];
  const question = questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    if (answeredQuestions.has(question.id)) return;

    setSelectedAnswer(answer);
    const correct = question.caseSensitive
      ? answer.trim() === question.correctAnswer.trim()
      : answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(s => s + 1);
    }
    setAnsweredQuestions(prev => new Set([...prev, question.id]));
  };

  const handleFillSubmit = () => {
    if (answeredQuestions.has(question.id)) return;

    // Special handling for writing task (subjective question)
    if (question.id === 'writing-task') {
      const trimmed = fillAnswer.trim();
      const hasContent = trimmed.length >= MIN_WRITING_LENGTH;

      if (!hasContent) {
        alert(`Please write at least ${MIN_WRITING_LENGTH} characters for your article.`);
        return;
      }

      if (fillAnswer.length > MAX_WRITING_LENGTH) {
        alert(`Writing content must be ${MAX_WRITING_LENGTH} characters or less.`);
        return;
      }

      setIsCorrect(true); // ✅ Writing task with content is considered correct
      setShowResult(true);
      setScore(s => s + 1); // ✅ Give credit for completing writing

      // Save writing content for 1d lesson
      if (onWritingSubmit) {
        onWritingSubmit(fillAnswer);
      }

      setAnsweredQuestions(prev => new Set([...prev, question.id]));
      return;
    }

    // Normal quiz questions: check against correct answer
    const correct = question.caseSensitive
      ? fillAnswer.trim() === question.correctAnswer.trim()
      : fillAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(s => s + 1);
    }

    setAnsweredQuestions(prev => new Set([...prev, question.id]));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setFillAnswer("");
      setShowResult(false);
      setIsCorrect(null);
      onAutoScroll();
    } else {
      const finalScore = score + (isCorrect ? 1 : 0);
      setQuizComplete(true);
      onComplete(finalScore, questions.length);
      onAutoScroll();
    }
  };

  if (quizComplete) {
    return (
      <div className="glass-card-elevated rounded-lg p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-progress-green-light to-progress-green flex items-center justify-center">
          <span className="text-4xl">🎉</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-text-primary mb-2">Quiz Complete!</h3>
        <p className="font-body text-text-secondary/70 mb-4">
          You got <span className="font-bold text-progress-green">{score}</span> out of {questions.length} correct
        </p>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-academic-blue to-academic-blue-dark px-6 py-3 rounded-full text-white shadow-md">
          <span className="text-xl">★</span>
          <span className="font-display font-bold">+{score * 10} XP</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card-elevated rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-light to-academic-blue flex items-center justify-center">
            <span className="text-lg">❓</span>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-text-primary">{unit.title}</h3>
            <p className="font-body text-sm text-text-secondary/60">{unit.titleCn}</p>
          </div>
        </div>
        <div className="font-display text-sm text-text-secondary/60">
          Question {currentQuestion + 1} / {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar mb-6">
        <div
          className="progress-bar-fill bg-gradient-to-r from-sky-light to-academic-blue"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-bg-secondary rounded-lg p-6 mb-6">
        <p className="font-body text-lg text-text-primary font-medium mb-2">{question.question}</p>
        <p className="font-body text-sm text-text-secondary/60">{question.questionCn}</p>
      </div>

      {/* Multiple Choice */}
      {question.type === 'multiple' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg font-body transition-all ${
                showResult
                  ? option === question.correctAnswer
                    ? 'bg-progress-green/20 border-2 border-progress-green text-text-primary'
                    : selectedAnswer === option
                    ? 'bg-red-100 border-2 border-red-400 text-red-600'
                    : 'bg-gray-100 text-gray-500'
                  : 'bg-white border-2 border-academic-blue/30 hover:border-academic-blue hover:shadow-md text-text-primary'
              }`}
            >
              <span className="font-display font-semibold mr-3">{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Fill in the Blank */}
      {question.type === 'fill' && (
        <div className="space-y-4">
          {question.id === 'writing-task' ? (
            /* Writing Window */
            <div className={`rounded-xl border-2 overflow-hidden transition-all ${
              showResult
                ? isCorrect
                  ? 'border-progress-green'
                  : 'border-red-400'
                : 'border-academic-blue/30 focus-within:border-academic-blue'
            }`}>
              {/* Editor toolbar */}
              <div className="flex items-center justify-between px-4 py-2 bg-academic-blue/5 border-b border-academic-blue/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm">✏️</span>
                  <span className="font-display text-xs font-semibold text-academic-blue">My Article</span>
                </div>
                <span className={`font-body text-xs ${
                  fillAnswer.length > MAX_WRITING_LENGTH * 0.9
                    ? 'text-red-500'
                    : 'text-text-secondary/50'
                }`}>
                  {fillAnswer.length} / {MAX_WRITING_LENGTH}
                </span>
              </div>
              {/* Lined paper area */}
              <div className="relative bg-white">
                <textarea
                  value={fillAnswer}
                  onChange={(e) => {
                    const nextValue = e.target.value;
                    if (nextValue.length > MAX_WRITING_LENGTH) {
                      setFillAnswer(nextValue.slice(0, MAX_WRITING_LENGTH));
                      return;
                    }
                    setFillAnswer(nextValue);
                  }}
                  disabled={showResult}
                  placeholder="Start writing your article here..."
                  rows={10}
                  className={`w-full p-4 font-body text-base leading-8 resize-none focus:outline-none bg-transparent ${
                    showResult ? 'text-text-secondary/70' : 'text-text-primary'
                  }`}
                  style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e2e8f0 31px, #e2e8f0 32px)',
                    backgroundAttachment: 'local',
                    backgroundPosition: '0 15px',
                  }}
                />
              </div>
              {/* Word count footer */}
              <div className="px-4 py-2 bg-academic-blue/5 border-t border-academic-blue/10">
                <span className="font-body text-xs text-text-secondary/50">
                  {fillAnswer.trim() ? fillAnswer.trim().split(/\s+/).length : 0} words
                  {fillAnswer.length < MIN_WRITING_LENGTH && !showResult && (
                    <span className="ml-2 text-amber-500">
                      · {MIN_WRITING_LENGTH - fillAnswer.length} more characters needed
                    </span>
                  )}
                </span>
              </div>
            </div>
          ) : (
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              disabled={showResult}
              placeholder="Type your answer..."
              className={`w-full p-4 rounded-lg font-body border-2 transition-all ${
                showResult
                  ? isCorrect
                    ? 'border-progress-green bg-progress-green/10'
                    : 'border-red-400 bg-red-50'
                  : 'border-academic-blue/30 focus:border-academic-blue focus:outline-none'
              }`}
            />
          )}
          {!showResult && (
            <button
              onClick={handleFillSubmit}
              disabled={!fillAnswer.trim()}
              className="w-full py-3 rounded-lg font-display font-semibold bg-gradient-to-r from-academic-blue to-academic-blue-dark text-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {question.id === 'writing-task' ? 'Submit Article' : 'Submit Answer'}
            </button>
          )}
          {showResult && !isCorrect && question.id !== 'writing-task' && (
            <div className="p-3 bg-progress-green/10 rounded-lg">
              <p className="font-body text-sm text-progress-green">
                Correct answer: <span className="font-bold">{question.correctAnswer}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Result & Explanation */}
      {showResult && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-progress-green/10 border border-progress-green/30' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
            <span className={`font-display font-semibold ${isCorrect ? 'text-progress-green' : 'text-red-600'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          <p className="font-body text-sm text-text-secondary/80">{question.explanation}</p>
        </div>
      )}

      {/* Next Button */}
      {showResult && (
        <button
          onClick={nextQuestion}
          className="mt-6 w-full py-3 rounded-lg font-display font-semibold bg-gradient-to-r from-academic-blue to-academic-blue-dark text-white hover:shadow-md transition-all"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
        </button>
      )}
    </div>
  );
}

// Main Lesson Detail Page
export default function LessonDetailPage() {
  const params = useParams();
  const lessonId = params.id as string;
  const lesson = getLesson(lessonId);

  const [currentUnit, setCurrentUnit] = useState(0);
  const [completedUnits, setCompletedUnits] = useState<Set<number>>(new Set());
  const [lessonComplete, setLessonComplete] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [writingContent, setWritingContent] = useState<string>("");
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  // Get saved avatar from localStorage
  const [characterAvatar, setCharacterAvatar] = useState<string>('🧙‍♂️');

  useEffect(() => {
    const savedAvatar = localStorage.getItem('characterAvatar');
    if (savedAvatar && isAllowedAvatar(savedAvatar)) {
      setCharacterAvatar(savedAvatar);
      return;
    }
    if (savedAvatar) {
      localStorage.removeItem('characterAvatar');
    }
  }, []);

  // Ref for auto-scrolling
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to content when unit changes
  const scrollToContent = () => {
    if (contentRef.current) {
      const headerOffset = 140; // Account for sticky header + nav
      const elementPosition = contentRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll when unit changes
  useEffect(() => {
    scrollToContent();
  }, [currentUnit]);

  // Define handleEvaluateWriting before using it in useEffect
  const handleEvaluateWriting = useCallback(async () => {
    if (!writingContent || isEvaluating) return;

    setIsEvaluating(true);
    setEvaluationError(null);

    try {
      const response = await fetch('/api/evaluate-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          writingContent: writingContent.slice(0, MAX_WRITING_LENGTH),
          lessonContext: {
            level: lesson?.level || '1D',
            title: lesson?.title || 'Writing Workshop',
            requirements: [
              'Include at least 3 proper nouns',
              'Use both singular and plural nouns correctly',
              'Include at least 2 uncountable nouns'
            ]
          }
        })
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null) as { error?: string; details?: string } | null;
        const message = errorPayload?.error || 'Evaluation failed.';
        const details = errorPayload?.details ? ` ${errorPayload.details}` : '';
        throw new Error(`${message}${details}`);
      }

      const result = await response.json();
      setEvaluation(result);
    } catch (error) {
      console.error('Evaluation error:', error);
      const message = error instanceof Error ? error.message : 'Failed to evaluate writing.';
      setEvaluationError(`${message} You can still view your poster below.`);
    } finally {
      setIsEvaluating(false);
    }
  }, [writingContent, isEvaluating, lesson]);

  // Auto-trigger evaluation when lesson is complete (only for 1d)
  useEffect(() => {
    if (lessonId === '1d' && lessonComplete && writingContent && !evaluation && !isEvaluating) {
      handleEvaluateWriting();
    }
  }, [lessonId, lessonComplete, writingContent, evaluation, isEvaluating, handleEvaluateWriting]);

  if (!lesson) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-ink-brown mb-4">Lesson Not Found</h1>
          <Link href="/grammar" className="text-gold-dark hover:text-gold-primary">Back to Lessons</Link>
        </div>
      </div>
    );
  }

  const handleQuizComplete = (score: number, total: number) => {
    setCompletedUnits(prev => new Set([...prev, currentUnit]));

    if (currentUnit < lesson.units.length - 1) {
      setTimeout(() => {
        setCurrentUnit(c => c + 1);
      }, 1500);
    } else {
      setLessonComplete(true);
    }
  };

  const handlePosterGenerated = (imageUrl: string) => {
    setPosterUrl(imageUrl);
    // Save poster URL to localStorage for card page
    localStorage.setItem(`poster_${lessonId}`, imageUrl);
  };

  const handleWritingSubmit = (writing: string) => {
    const sanitized = writing.slice(0, MAX_WRITING_LENGTH);
    setWritingContent(sanitized);
    // Save writing content to localStorage for poster generation
    localStorage.setItem(`writing_${lessonId}`, sanitized);
  };

  // Only generate poster for lesson 1d
  const shouldGeneratePoster = lessonId === '1d';

  // Download poster directly
  const handleDownloadPoster = async () => {
    if (!posterUrl) return;
    try {
      const response = await fetch(posterUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `poster-${lessonId}-${lesson.title.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(posterUrl, '_blank');
    }
  };

  const handleUnitComplete = () => {
    setCompletedUnits(prev => new Set([...prev, currentUnit]));
    if (currentUnit < lesson.units.length - 1) {
      setCurrentUnit(c => c + 1);
    } else {
      setLessonComplete(true);
    }
  };

  const handleUnitChange = (index: number) => {
    setCurrentUnit(index);
  };

  const colorClasses: Record<string, string> = {
    'noun-brown': 'bg-noun-brown',
    'plural-blue': 'bg-plural-blue',
    'countable-purple': 'bg-countable-purple',
    'article-green': 'bg-article-green',
    'writing-pink': 'bg-writing-pink',
  };

  const progress = Math.round((completedUnits.size / lesson.units.length) * 100);

  return (
    <LessonErrorBoundary>
      <div className="min-h-screen pt-16 pb-20 md:pb-0">
        <Navigation />

      {/* Lesson Header */}
      <section className="hero-bg py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/grammar" className="inline-flex items-center gap-2 text-text-secondary/70 hover:text-text-primary mb-4 transition-colors">
            <span>←</span>
            <span className="font-body">Back to Lessons</span>
          </Link>

          <div className="flex items-start gap-4">
            {/* Icon with lesson color */}
            <div className={`w-16 h-16 rounded-xl ${colorClasses[lesson.color]} flex items-center justify-center text-white font-display text-xl font-bold shadow-lg`}>
              {lesson.level}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-1">{lesson.title}</h1>
              <p className="font-display text-lg text-text-secondary/70">{lesson.titleCn}</p>
              <p className="font-body text-sm text-text-secondary/50 mt-2">{lesson.description}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6 glass-card rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-sm text-text-secondary/70">Lesson Progress</span>
              <span className="font-display text-sm text-academic-blue">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill bg-gradient-to-r from-academic-blue to-academic-blue-dark"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Unit Navigation */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-bg-tertiary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {lesson.units.map((unit, i) => (
              <button
                key={unit.id}
                onClick={() => handleUnitChange(i)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-display text-sm transition-all ${
                  currentUnit === i
                    ? 'bg-gradient-to-r from-academic-blue to-academic-blue-dark text-white shadow-md'
                    : completedUnits.has(i)
                    ? 'bg-progress-green/20 text-progress-green border border-progress-green/30'
                    : 'bg-white text-text-secondary/70 border border-bg-tertiary hover:border-academic-blue/50'
                }`}
              >
                {completedUnits.has(i) ? '✓ ' : ''}{unit.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 px-4" ref={contentRef}>
        <div className="max-w-7xl mx-auto">
          {lessonComplete ? (
            <div className="space-y-8">
              {/* Top Banner */}
              <div className="glass-card-elevated rounded-lg p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-academic-blue-light to-academic-blue shadow-lg">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div className="space-y-2">
                      <h2 className="font-display text-2xl font-bold text-text-primary">Lesson Complete!</h2>
                      <p className="font-body text-sm text-text-secondary/70">
                        Congratulations on completing the "{lesson.title}" lesson!
                      </p>
                      <div className="inline-flex items-center gap-4 bg-bg-secondary rounded-full px-5 py-2">
                        <div className="text-center">
                          <div className="font-display text-lg font-bold text-academic-blue">+{lesson.xpReward}</div>
                          <div className="font-body text-[11px] text-text-secondary/60">XP</div>
                        </div>
                        <div className="w-px h-6 bg-academic-blue/30" />
                        <div className="text-center">
                          <div className="font-display text-lg font-bold text-progress-green">+{lesson.cards}</div>
                          <div className="font-body text-[11px] text-text-secondary/60">Cards</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/practice"
                      className="px-5 py-2 rounded-lg font-display font-semibold bg-gradient-to-r from-academic-blue to-academic-blue-dark text-white hover:shadow-md transition-all"
                    >
                      Practice Now
                    </Link>
                    <Link
                      href="/grammar"
                      className="px-5 py-2 rounded-lg font-display font-semibold border-2 border-academic-blue text-academic-blue hover:bg-academic-blue/10 transition-all"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              </div>

              {/* Writing Evaluation + Poster (only for 1d) */}
              {shouldGeneratePoster && (
                <>
                  {/* Writing Evaluation - Hero */}
                  <WritingEvaluation
                    evaluation={evaluation}
                    isLoading={isEvaluating}
                    error={evaluationError}
                    showInsights={false}
                    showGrammar={false}
                  />

                  {/* Bottom Grid: Insights + Poster */}
                  <div
                    className={`grid gap-6 ${
                      evaluation && !isEvaluating && !evaluationError ? "lg:grid-cols-2 lg:items-start" : ""
                    }`}
                  >
                    {evaluation && !isEvaluating && !evaluationError && (
                      <div className="space-y-6">
                        <WritingEvaluation
                          evaluation={evaluation}
                          isLoading={isEvaluating}
                          error={evaluationError}
                          showHero={false}
                          showGrammar={false}
                        />
                      </div>
                    )}

                    {/* Poster Generation Card */}
                    <div className="glass-card-elevated rounded-lg p-6">
                      <h3 className="font-display text-xl font-bold text-text-primary mb-4 text-center">
                        🎉 Your Achievement Poster
                      </h3>
                      <p className="font-body text-sm text-text-secondary/60 text-center mb-6">
                        Your personalized poster featuring {characterAvatar} - perfect for your collection card!
                      </p>
                      <div className="max-w-md mx-auto">
                        <LessonPoster
                          characterAvatar={characterAvatar}
                          lessonId={lessonId}
                          lessonTitle={lesson.title}
                          lessonTitleCn={lesson.titleCn}
                          lessonColor={lesson.color}
                          lessonDescription={lesson.description}
                          writingContent={writingContent}
                          onPosterGenerated={handlePosterGenerated}
                        />
                      </div>
                      {posterUrl && (
                        <div className="mt-4 text-center">
                          <button
                            onClick={handleDownloadPoster}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-academic-blue text-white rounded-lg hover:bg-academic-blue-dark transition-colors font-display text-sm"
                          >
                            <span>⬇️</span>
                            Download Poster
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Grammar Breakdown */}
                  {evaluation && !isEvaluating && !evaluationError && (
                    <WritingEvaluation
                      evaluation={evaluation}
                      isLoading={isEvaluating}
                      error={evaluationError}
                      showHero={false}
                      showInsights={false}
                    />
                  )}
                </>
              )}
            </div>
          ) : (
            <>
              {lesson.units[currentUnit].type === 'quiz' ? (
                <QuizUnit
                  unit={lesson.units[currentUnit]}
                  onComplete={handleQuizComplete}
                  onAutoScroll={scrollToContent}
                  onWritingSubmit={handleWritingSubmit}
                />
              ) : lesson.units[currentUnit].type === 'video' ? (
                <>
                  <VideoUnit unit={lesson.units[currentUnit]} />
                  <button
                    onClick={handleUnitComplete}
                    className="w-full py-3 rounded-lg font-display font-semibold bg-gradient-to-r from-academic-blue to-academic-blue-dark text-white hover:shadow-md transition-all"
                  >
                    {currentUnit < lesson.units.length - 1 ? 'Continue →' : 'Complete Lesson'}
                  </button>
                </>
              ) : (
                <>
                  <TeachingUnit unit={lesson.units[currentUnit]} />
                  <button
                    onClick={handleUnitComplete}
                    className="w-full py-3 rounded-lg font-display font-semibold bg-gradient-to-r from-academic-blue to-academic-blue-dark text-white hover:shadow-md transition-all"
                  >
                    {currentUnit < lesson.units.length - 1 ? 'Continue →' : 'Complete Lesson'}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </section>

        <Chatbot
          lessonTitle={lesson.title}
          unitTitle={lesson.units[currentUnit]?.title || ''}
          unitType={lesson.units[currentUnit]?.type || 'teach'}
          isQuiz={lesson.units[currentUnit]?.type === 'quiz'}
          unitExamples={lesson.units[currentUnit]?.examples || []}
        />
      </div>
    </LessonErrorBoundary>
  );
}

"use client";

import React, { useState } from "react";
import type { LessonUnit } from "@/data/lesson-types";

interface PracticeUnitProps {
  unit: LessonUnit;
  onComplete: () => void;
  onOpenChatbot: () => void;
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  easy: { label: "Easy", color: "bg-progress-green/10 text-progress-green border-progress-green/30" },
  medium: { label: "Medium", color: "bg-achievement-gold/10 text-achievement-gold border-achievement-gold/30" },
  hard: { label: "Hard", color: "bg-red-50 text-red-500 border-red-200" },
};

export function PracticeUnit({ unit, onComplete, onOpenChatbot }: PracticeUnitProps) {
  const questions = unit.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questions[currentIndex];

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete();
    }
  };

  const difficulty = question?.difficulty || "easy";

  if (questions.length === 0) {
    return (
      <div className="glass-card-elevated rounded-xl p-8 text-center">
        <p className="font-body text-text-secondary/60">No practice questions available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card-elevated rounded-xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-academic-blue to-academic-blue-dark shadow-md">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-text-primary">Practise with a Pro!</h3>
              <p className="font-body text-sm text-text-secondary/60">AI tutor will help you think through each question</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`rounded-full border px-3 py-1 font-display text-xs font-semibold ${DIFFICULTY_LABELS[difficulty]?.color || DIFFICULTY_LABELS.easy.color}`}>
              {DIFFICULTY_LABELS[difficulty]?.label || "Easy"}
            </div>
            <p className="mt-1 font-body text-xs text-text-secondary/60">
              Question {currentIndex + 1} / {questions.length}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-bar">
          <div
            className="progress-bar-fill bg-gradient-to-r from-academic-blue to-academic-blue-dark"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card-elevated rounded-xl p-6">
        <div className="mb-5 rounded-xl bg-bg-secondary p-5">
          <p className="font-display text-lg font-semibold text-text-primary leading-snug">{question.question}</p>
          {question.questionCn && (
            <p className="mt-1 font-body text-sm text-text-secondary/60">{question.questionCn}</p>
          )}
        </div>

        {/* Options */}
        {question.options && (
          <div className="space-y-3">
            {question.options.map((option, i) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.correctAnswer;
              const showAsCorrect = showExplanation && isCorrect;
              const showAsWrong = showExplanation && isSelected && !isCorrect;

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedAnswer}
                  className={`w-full rounded-xl border-2 p-4 text-left font-body transition-all ${
                    showAsCorrect
                      ? "border-progress-green bg-progress-green/10 text-text-primary"
                      : showAsWrong
                      ? "border-red-400 bg-red-50 text-red-600"
                      : isSelected
                      ? "border-academic-blue bg-academic-blue/5"
                      : "border-border-subtle bg-white hover:border-academic-blue/40 hover:shadow-sm"
                  }`}
                >
                  <span className="mr-3 font-display text-sm font-bold text-text-secondary/50">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {option}
                  {showAsCorrect && <span className="ml-2 text-progress-green">✅</span>}
                  {showAsWrong && <span className="ml-2 text-red-500">❌</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-4 rounded-xl bg-progress-green/10 border border-progress-green/30 p-4">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-lg">💡</span>
              <span className="font-display text-sm font-semibold text-progress-green">Explanation</span>
            </div>
            <p className="font-body text-sm text-text-primary">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {!selectedAnswer && (
          <button
            onClick={onOpenChatbot}
            className="flex items-center gap-2 rounded-xl border-2 border-academic-blue/30 bg-white px-5 py-3 font-display text-sm font-semibold text-academic-blue transition-all hover:border-academic-blue hover:bg-academic-blue/5"
          >
            <span>🤖</span> Ask AI Tutor
          </button>
        )}
        {selectedAnswer && (
          <button
            onClick={nextQuestion}
            className="flex-1 rounded-xl bg-gradient-to-r from-academic-blue to-academic-blue-dark px-5 py-3 font-display font-semibold text-white shadow-md transition-all hover:shadow-lg"
          >
            {currentIndex < questions.length - 1 ? "Next Question →" : "Finish Practice 🎉"}
          </button>
        )}
      </div>
    </div>
  );
}

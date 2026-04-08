"use client";

import React, { useState } from "react";
import type { LessonUnit } from "@/data/lesson-types";

interface ProduceUnitProps {
  unit: LessonUnit;
  onComplete: () => void;
  onWritingSubmit?: (writing: string) => void;
  onOpenChatbot: () => void;
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  easy: { label: "Easy", color: "bg-progress-green/10 text-progress-green border-progress-green/30" },
  medium: { label: "Medium", color: "bg-achievement-gold/10 text-achievement-gold border-achievement-gold/30" },
  hard: { label: "Hard", color: "bg-red-50 text-red-500 border-red-200" },
};

const MIN_CHARS = 20;
const MAX_CHARS = 800;

export function ProduceUnit({ unit, onComplete, onWritingSubmit, onOpenChatbot }: ProduceUnitProps) {
  const prompts = unit.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [writing, setWriting] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const prompt = prompts[currentIndex];
  const difficulty = prompt?.difficulty || "easy";

  const handleSubmit = () => {
    if (writing.trim().length < MIN_CHARS) {
      alert(`Please write at least ${MIN_CHARS} characters.`);
      return;
    }
    setSubmitted(true);
    if (onWritingSubmit) {
      onWritingSubmit(writing);
    }
  };

  const nextPrompt = () => {
    if (currentIndex < prompts.length - 1) {
      setCurrentIndex((i) => i + 1);
      setWriting("");
      setSubmitted(false);
    } else {
      onComplete();
    }
  };

  if (prompts.length === 0) {
    return (
      <div className="glass-card-elevated rounded-xl p-8 text-center">
        <p className="font-body text-text-secondary/60">No writing prompts available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card-elevated rounded-xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-achievement-gold-light to-achievement-gold shadow-md">
              <span className="text-2xl">✍️</span>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-text-primary">Let&apos;s Produce!</h3>
              <p className="font-body text-sm text-text-secondary/60">Write sentences using common and proper nouns</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`rounded-full border px-3 py-1 font-display text-xs font-semibold ${DIFFICULTY_LABELS[difficulty]?.color || DIFFICULTY_LABELS.easy.color}`}>
              {DIFFICULTY_LABELS[difficulty]?.label || "Easy"}
            </div>
            <p className="mt-1 font-body text-xs text-text-secondary/60">
              Task {currentIndex + 1} / {prompts.length}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-bar">
          <div
            className="progress-bar-fill bg-gradient-to-r from-achievement-gold to-amber-500"
            style={{ width: `${((currentIndex + 1) / prompts.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Writing Prompt */}
      <div className="glass-card-elevated rounded-xl p-6">
        <div className="mb-5 rounded-xl bg-gradient-to-r from-academic-blue/10 to-sky-light/10 p-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-lg">📝</span>
            <span className="font-display text-sm font-semibold text-academic-blue">Writing Task</span>
          </div>
          <p className="font-display text-lg font-semibold text-text-primary leading-snug">
            {prompt.question}
          </p>
          {prompt.questionCn && (
            <p className="mt-1 font-body text-sm text-text-secondary/60">{prompt.questionCn}</p>
          )}
        </div>

        {/* Writing Area */}
        <div className={`rounded-xl border-2 overflow-hidden transition-all ${submitted ? "border-progress-green/50" : "border-academic-blue/30 focus-within:border-academic-blue"}`}>
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-academic-blue/10 bg-academic-blue/5 px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">✏️</span>
              <span className="font-display text-xs font-semibold text-academic-blue">My Writing</span>
            </div>
            <span className={`font-body text-xs ${
              writing.length > MAX_CHARS * 0.9 ? "text-red-500" : "text-text-secondary/50"
            }`}>
              {writing.length} / {MAX_CHARS}
            </span>
          </div>

          {/* Lined paper */}
          <div className="relative bg-white">
            <textarea
              value={writing}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) setWriting(e.target.value);
              }}
              disabled={submitted}
              placeholder="Start writing your sentences here..."
              rows={8}
              className="font-body text-base leading-8 focus:outline-none resize-none bg-transparent w-full p-4"
              style={{
                backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e2e8f0 31px, #e2e8f0 32px)",
                backgroundAttachment: "local",
                backgroundPosition: "0 15px",
              }}
            />
          </div>

          {/* Footer */}
          <div className="border-t border-academic-blue/10 bg-academic-blue/5 px-4 py-2">
            <span className="font-body text-xs text-text-secondary/50">
              {writing.trim()
                ? `${writing.trim().split(/\s+/).length} words`
                : "0 words"}
              {writing.length < MIN_CHARS && !submitted && (
                <span className="ml-2 text-amber-500">
                  · {MIN_CHARS - writing.length} more characters needed
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Submitted confirmation */}
        {submitted && (
          <div className="mt-4 rounded-xl bg-progress-green/10 border border-progress-green/30 p-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              <span className="font-display text-sm font-semibold text-progress-green">Submitted!</span>
            </div>
            <p className="mt-1 font-body text-sm text-text-secondary/80">
              Great work! You used nouns in your writing. Keep going to the next task!
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {!submitted && (
          <>
            <button
              onClick={onOpenChatbot}
              className="flex items-center gap-2 rounded-xl border-2 border-achievement-gold/30 bg-white px-5 py-3 font-display text-sm font-semibold text-achievement-gold transition-all hover:border-achievement-gold hover:bg-achievement-gold/5"
            >
              <span>🤖</span> Ask AI Tutor
            </button>
            <button
              onClick={handleSubmit}
              disabled={writing.trim().length < MIN_CHARS}
              className="flex-1 rounded-xl bg-gradient-to-r from-achievement-gold to-amber-500 px-5 py-3 font-display font-semibold text-white shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit Writing
            </button>
          </>
        )}
        {submitted && (
          <button
            onClick={nextPrompt}
            className="flex-1 rounded-xl bg-gradient-to-r from-academic-blue to-academic-blue-dark px-5 py-3 font-display font-semibold text-white shadow-md transition-all hover:shadow-lg"
          >
            {currentIndex < prompts.length - 1 ? "Next Writing Task →" : "Finish Production 🎉"}
          </button>
        )}
      </div>
    </div>
  );
}

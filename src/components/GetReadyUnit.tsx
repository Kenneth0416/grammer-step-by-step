"use client";

import React, { useState } from "react";
import type { LessonUnit } from "@/data/lesson-types";

interface GetReadyUnitProps {
  unit: LessonUnit;
  onStart: () => void;
}

const FOCUS_OPTIONS = [
  {
    id: "finding-nouns",
    label: "Finding nouns in sentences",
    labelCn: "在句子中找名词",
    icon: "🔍",
    color: "from-sky-light to-academic-blue",
  },
  {
    id: "capital-letters",
    label: "Learning capital letters",
    labelCn: "学习大写字母规则",
    icon: "🔠",
    color: "from-achievement-gold-light to-achievement-gold",
  },
  {
    id: "idea-nouns",
    label: "Understanding idea nouns",
    labelCn: "理解概念名词",
    icon: "💡",
    color: "from-purple-200 to-purple-400",
  },
];

export function GetReadyUnit({ unit, onStart }: GetReadyUnitProps) {
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!selectedFocus) return;
    // Log goal selection to localStorage (AI personalization)
    localStorage.setItem(`lesson_${unit.id}_focus`, selectedFocus);
    setConfirmed(true);
  };

  return (
    <div className="space-y-6">
      {/* Hero Mission Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-noun-brown via-noun-brown/90 to-amber-900 p-8 text-white shadow-xl">
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-white/5" />

        <div className="relative">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <span className="text-3xl">🎯</span>
          </div>
          <p className="mb-2 font-body text-sm uppercase tracking-widest text-white/70">Today&apos;s Mission</p>
          <h2 className="mb-3 font-display text-2xl font-bold leading-snug">
            Find and use<br />proper and common nouns!
          </h2>
          <p className="font-body text-sm text-white/80">
            By the end of this lesson, you will be able to:
          </p>
          <ul className="mt-2 space-y-1">
            {[
              "find nouns in sentences",
              "tell people, places, things, and ideas apart",
              "recognise special names with capital letters",
            ].map((obj, i) => (
              <li key={i} className="flex items-center gap-2 font-body text-sm text-white/90">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">✓</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Focus Selection */}
      {!confirmed && (
        <div className="glass-card-elevated rounded-xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-academic-blue/10">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-text-primary">What do you want to focus on today?</h3>
              <p className="font-body text-sm text-text-secondary/60">Choose one area to concentrate on — you can always explore more later!</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {FOCUS_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedFocus(option.id)}
                className={`group relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                  selectedFocus === option.id
                    ? "border-academic-blue bg-academic-blue/5 shadow-md scale-[1.02]"
                    : "border-border-subtle bg-white hover:border-academic-blue/40 hover:shadow-sm"
                }`}
              >
                {/* Selected checkmark */}
                {selectedFocus === option.id && (
                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-academic-blue text-white text-xs">✓</span>
                )}

                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${option.color} text-white shadow-sm`}>
                  <span className="text-xl">{option.icon}</span>
                </div>
                <p className="font-display text-sm font-semibold text-text-primary leading-snug">{option.label}</p>
                <p className="mt-1 font-body text-xs text-text-secondary/60">{option.labelCn}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleConfirm}
              disabled={!selectedFocus}
              className="rounded-xl bg-gradient-to-r from-academic-blue to-academic-blue-dark px-8 py-3 font-display font-semibold text-white shadow-lg transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              Start Learning →
            </button>
          </div>
        </div>
      )}

      {/* Confirmed State */}
      {confirmed && selectedFocus && (
        <div className="glass-card-elevated rounded-xl p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-progress-green/20">
              <span className="text-xl">✅</span>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-text-primary">Goal Set!</h3>
              <p className="font-body text-sm text-text-secondary/60">
                You chose: <span className="font-semibold text-academic-blue">
                  {FOCUS_OPTIONS.find(o => o.id === selectedFocus)?.label}
                </span>
              </p>
            </div>
          </div>

          <div className="mb-6 rounded-xl bg-gradient-to-r from-academic-blue/10 to-sky-light/10 p-4">
            <p className="font-body text-sm text-text-primary">
              Your AI tutor will personalise hints and examples to help you with{" "}
              <strong>{FOCUS_OPTIONS.find(o => o.id === selectedFocus)?.labelCn}</strong>.
              Let&apos;s begin!
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onStart}
              className="rounded-xl bg-gradient-to-r from-academic-blue to-academic-blue-dark px-8 py-3 font-display font-semibold text-white shadow-lg transition-all hover:shadow-md"
            >
              Let&apos;s Go! →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

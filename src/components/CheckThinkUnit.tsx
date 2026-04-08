"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { LessonUnit } from "@/data/lesson-types";

interface CheckThinkUnitProps {
  unit: LessonUnit;
  lessonId: string;
  lessonTitle: string;
}

const REFLECTION_ITEMS = [
  { id: "finding-nouns", label: "identify nouns in sentences", labelCn: "在句子中找名词" },
  { id: "types", label: "classify nouns into four types", labelCn: "名词分类" },
  { id: "capital", label: "recognise proper nouns by capital letters", labelCn: "专有名词大写" },
  { id: "common-proper", label: "tell common and proper nouns apart", labelCn: "区分普通和专有名词" },
];

// Simpler labels for the "What was easy" section — matches document wording
const EASY_ITEMS = [
  { id: "finding-nouns", label: "Finding nouns", labelCn: "找名词" },
  { id: "types", label: "Types of nouns", labelCn: "名词种类" },
  { id: "capital", label: "Capital letters", labelCn: "大写字母" },
  { id: "common-proper", label: "Common and proper nouns", labelCn: "普通和专有名词" },
];

export function CheckThinkUnit({ unit, lessonId, lessonTitle }: CheckThinkUnitProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [easyAnswer, setEasyAnswer] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* ✅ You Can Now Card */}
      <div className="glass-card-elevated rounded-2xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-progress-green to-progress-green-dark p-6 text-white">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">Check & Think</h3>
              <p className="font-body text-sm text-white/80">回顾与反思</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h4 className="mb-4 font-display text-base font-semibold text-text-primary">
            ✅ You can now:
          </h4>
          <div className="space-y-3">
            {REFLECTION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                  checked.has(item.id)
                    ? "border-progress-green bg-progress-green/10"
                    : "border-border-subtle bg-white hover:border-progress-green/40"
                }`}
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-sm transition-all ${
                  checked.has(item.id)
                    ? "bg-progress-green text-white"
                    : "border-2 border-border-subtle bg-white"
                }`}>
                  {checked.has(item.id) ? "✓" : ""}
                </span>
                <div>
                  <p className={`font-display text-sm font-semibold ${checked.has(item.id) ? "text-progress-green" : "text-text-primary"}`}>
                    {item.label}
                  </p>
                  <p className="font-body text-xs text-text-secondary/60">{item.labelCn}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reflection: What was easy? */}
      <div className="glass-card-elevated rounded-xl p-6">
        <h4 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-text-primary">
          <span className="text-xl">🤔</span> What was easy for you today?
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          {EASY_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setEasyAnswer(item.id === easyAnswer ? null : item.id)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                easyAnswer === item.id
                  ? "border-academic-blue bg-academic-blue/5"
                  : "border-border-subtle bg-white hover:border-academic-blue/40"
              }`}
            >
              <p className="font-body text-sm font-medium text-text-primary">{item.label}</p>
              <p className="mt-1 font-body text-xs text-text-secondary/60">{item.labelCn}</p>
              {easyAnswer === item.id && (
                <span className="mt-2 block font-display text-xs font-semibold text-academic-blue">✓ Selected</span>
              )}
            </button>
          ))}
        </div>
        {easyAnswer && (
          <div className="mt-4 rounded-xl bg-academic-blue/10 border border-academic-blue/20 p-3">
            <p className="font-body text-sm text-text-primary">
              💪 Great! That&apos;s a strong area for you. Keep practising the other areas to build confidence!
            </p>
          </div>
        )}
      </div>

      {/* XP Summary */}
      <div className="glass-card-elevated rounded-xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">🏆</span>
          <div>
            <h4 className="font-display text-lg font-bold text-text-primary">Lesson Complete!</h4>
            <p className="font-body text-sm text-text-secondary/60">{lessonTitle} — Nouns</p>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-3 rounded-xl bg-gradient-to-r from-academic-blue/10 to-sky-light/10 p-4">
          <div className="text-center">
            <div className="font-display text-2xl font-bold text-achievement-gold">+100</div>
            <div className="font-body text-xs text-text-secondary/60">XP Earned</div>
          </div>
          <div className="h-8 w-px bg-academic-blue/20" />
          <div className="text-center">
            <div className="font-display text-2xl font-bold text-progress-green">+12</div>
            <div className="font-body text-xs text-text-secondary/60">Cards Collected</div>
          </div>
          <div className="h-8 w-px bg-academic-blue/20" />
          <div className="text-center">
            <div className="font-display text-2xl font-bold text-academic-blue">{checked.size}/4</div>
            <div className="font-body text-xs text-text-secondary/60">Skills Reviewed</div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Practice More */}
        <div className="glass-card-elevated rounded-xl p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-progress-green/20">
              <span className="text-xl">🔄</span>
            </div>
            <div>
              <h5 className="font-display text-sm font-semibold text-text-primary">Practise More?</h5>
              <p className="font-body text-xs text-text-secondary/60">強化訓練</p>
            </div>
          </div>
          <p className="mb-4 font-body text-sm text-text-secondary/70">
            Review noun types, common vs proper nouns, and capital letters with more activities.
          </p>
          <Link
            href="/practice"
            className="block w-full rounded-xl border-2 border-progress-green/30 bg-progress-green/5 px-4 py-3 text-center font-display text-sm font-semibold text-progress-green transition-all hover:border-progress-green hover:bg-progress-green/10"
          >
            Practice Now →
          </Link>
        </div>

        {/* Next Lesson */}
        <div className="glass-card-elevated rounded-xl p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-academic-blue/20">
              <span className="text-xl">📚</span>
            </div>
            <div>
              <h5 className="font-display text-sm font-semibold text-text-primary">Next Lesson</h5>
              <p className="font-body text-xs text-text-secondary/60">下一課</p>
            </div>
          </div>
          <p className="mb-4 font-body text-sm text-text-secondary/70">
            Learn how English nouns change from one to many: <strong>Singular &amp; Plural</strong>
          </p>
          <Link
            href="/grammar/1b"
            className="block w-full rounded-xl bg-gradient-to-r from-academic-blue to-academic-blue-dark px-4 py-3 text-center font-display text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
          >
            Try 1B: Singular &amp; Plural →
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import type { LessonUnit } from "@/data/lesson-types";
import { RuleCard } from "@/components/RuleCard";

interface TryItOutUnitProps {
  unit: LessonUnit;
}

type NounType = "people" | "places" | "things" | "ideas";

const NOUN_TYPES: Record<NounType, { icon: string; title: string; titleCn: string; color: string; bg: string; question: string; examples: { word: string; translation: string }[] }> = {
  people: {
    icon: "👤",
    title: "People",
    titleCn: "人物",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    question: "Who is it?",
    examples: [
      { word: "teacher", translation: "老師" },
      { word: "student", translation: "學生" },
    ],
  },
  places: {
    icon: "📍",
    title: "Places",
    titleCn: "地點",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
    question: "Where is it?",
    examples: [
      { word: "school", translation: "學校" },
      { word: "classroom", translation: "課室" },
    ],
  },
  things: {
    icon: "📦",
    title: "Things",
    titleCn: "事物",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
    question: "What is it?",
    examples: [
      { word: "book", translation: "書" },
      { word: "desk", translation: "桌子" },
    ],
  },
  ideas: {
    icon: "💭",
    title: "Ideas",
    titleCn: "想法",
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
    question: "Can you touch it?",
    examples: [
      { word: "happiness", translation: "快樂" },
      { word: "love", translation: "愛" },
    ],
  },
};

export function TryItOutUnit({ unit }: TryItOutUnitProps) {
  const [activeType, setActiveType] = useState<NounType>("people");
  const [selectedCommon, setSelectedCommon] = useState<string | null>(null);
  const [selectedProper, setSelectedProper] = useState<string | null>(null);
  const [showProperHint, setShowProperHint] = useState(false);

  const type = NOUN_TYPES[activeType];

  return (
    <div className="space-y-6">
      {/* What is a Noun */}
      <div className="glass-card-elevated rounded-xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-academic-blue/10">
            <span className="text-xl">📖</span>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-text-primary">What is a Noun?</h3>
            <p className="font-body text-sm text-text-secondary/60">核心概念</p>
          </div>
        </div>

        <div className="mb-5 rounded-xl bg-gradient-to-r from-academic-blue to-academic-blue-dark p-5 text-white">
          <p className="mb-3 font-display text-xl font-bold">✅ A noun is a word that names something.</p>
          <p className="font-body text-white/90">Nouns name:</p>
          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
            {(["people", "places", "things", "ideas"] as NounType[]).map((t) => (
              <div key={t} className="flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2">
                <span className="text-lg">{NOUN_TYPES[t].icon}</span>
                <span className="font-body text-sm">{NOUN_TYPES[t].title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Ask Box */}
        <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-academic-blue/30 bg-academic-blue/5 p-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-academic-blue text-white text-sm">🤖</span>
          <div>
            <p className="font-display text-sm font-semibold text-academic-blue">AI asks:</p>
            <p className="font-body text-sm text-text-primary italic">&quot;Who is it? What is it?&quot;</p>
          </div>
        </div>
      </div>

      {/* Types of Nouns */}
      <div className="glass-card-elevated rounded-xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-progress-green/10">
            <span className="text-xl">🗂️</span>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-text-primary">Types of Nouns</h3>
            <p className="font-body text-sm text-text-secondary/60">名詞的種類</p>
          </div>
        </div>

        {/* Type Tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          {(Object.keys(NOUN_TYPES) as NounType[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-semibold transition-all ${
                activeType === t
                  ? "bg-gradient-to-r from-academic-blue to-academic-blue-dark text-white shadow-md"
                  : "bg-white border border-border-subtle text-text-secondary hover:border-academic-blue/40"
              }`}
            >
              <span>{NOUN_TYPES[t].icon}</span>
              {NOUN_TYPES[t].title}
            </button>
          ))}
        </div>

        {/* Active Type Card */}
        <div className={`rounded-xl ${type.bg} border p-5 transition-all`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-4xl">{type.icon}</span>
            <div>
              <h4 className={`font-display text-lg font-bold ${type.color}`}>{type.title}</h4>
              <p className="font-body text-sm text-text-secondary/60">{type.titleCn}</p>
            </div>
          </div>

          {/* AI Question */}
          <div className={`mb-4 flex items-center gap-2 rounded-lg ${activeType === "ideas" ? "bg-purple-100/70" : "bg-white/70"} p-3`}>
            <span className="text-lg">🤖</span>
            <p className="font-body text-sm font-medium text-text-primary">
              {activeType === "ideas"
                ? `Can you touch happiness? Can you feel or think about love?`
                : `AI asks: "${type.question}" — that answer is often a noun.`}
            </p>
          </div>

          {/* Examples */}
          <div className="mb-3 font-display text-sm font-semibold text-text-secondary/70">
            Examples — 示例
          </div>
          <div className="space-y-2">
            {type.examples.map((ex, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-white/80 p-3">
                <span className={`rounded-lg ${type.bg.replace("50", "100").replace("200", "300")} px-2 py-1 font-display text-sm font-bold ${type.color}`}>
                  {ex.word}
                </span>
                <span className="font-body text-sm text-text-secondary/70">{ex.translation}</span>
                <span className="ml-auto font-body text-xs italic text-text-secondary/50">
                  {activeType === "ideas"
                    ? "You can name it, but you cannot touch it."
                    : `${type.title.toLowerCase()} noun — it names a ${type.title.toLowerCase().replace("ies", "y")}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common vs Proper Nouns */}
      <div className="glass-card-elevated rounded-xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-achievement-gold/10">
            <span className="text-xl">⚖️</span>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-text-primary">Common Nouns vs Proper Nouns</h3>
            <p className="font-body text-sm text-text-secondary/60">普通名詞 vs 專有名詞</p>
          </div>
        </div>

        {/* What are Common Nouns */}
        <div className="mb-4 rounded-xl border-2 border-academic-blue/20 bg-academic-blue/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">📋</span>
            <h4 className="font-display text-base font-bold text-academic-blue">Common Nouns</h4>
          </div>
          <p className="mb-3 font-body text-sm text-text-primary">
            Common nouns are <strong>general names</strong>. They do not start with capital letters.
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {["city", "teacher", "dog", "school", "book"].map((word) => (
              <span key={word} className="rounded-full bg-white px-3 py-1 font-body text-sm text-text-primary shadow-sm">
                {word}
              </span>
            ))}
          </div>
          <p className="font-body text-xs italic text-text-secondary/70">
            Example: <strong>The teacher</strong> is kind. I bring my <strong>book</strong> to <strong>school</strong>.
          </p>

          {/* Interactive check */}
          <div className="mt-4">
            <p className="mb-2 font-display text-xs font-semibold text-academic-blue">What are common nouns? (select)</p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "general-names", label: "General names" },
                { id: "no-capital", label: "Do not start with capital letters" },
                { id: "capital", label: "Start with capital letters" },
              ].map((opt) => {
                const isCorrect = opt.id !== "capital";
                const isSelected = selectedCommon === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedCommon(opt.id)}
                    className={`rounded-full border-2 px-3 py-1 font-body text-xs font-medium transition-all ${
                      isSelected
                        ? isCorrect
                          ? "border-progress-green bg-progress-green/10 text-progress-green"
                          : "border-red-400 bg-red-50 text-red-500"
                        : "border-border-subtle bg-white text-text-secondary hover:border-academic-blue/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {selectedCommon === "general-names" && (
              <p className="mt-2 font-body text-xs text-progress-green">✅ Correct! Common nouns are general names.</p>
            )}
            {selectedCommon === "no-capital" && (
              <p className="mt-2 font-body text-xs text-progress-green">✅ Correct! They do not start with capital letters.</p>
            )}
          </div>
        </div>

        {/* What are Proper Nouns */}
        <div className="rounded-xl border-2 border-achievement-gold/30 bg-achievement-gold/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">🏷️</span>
            <h4 className="font-display text-base font-bold text-achievement-gold">Proper Nouns</h4>
          </div>
          <p className="mb-3 font-body text-sm text-text-primary">
            Proper nouns are <strong>special names</strong>. They <strong>start with a capital letter</strong>.
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {["Hong Kong", "Miss Chan", "Asia", "Monday"].map((word) => (
              <span key={word} className="rounded-full bg-amber-50 px-3 py-1 font-display text-sm font-bold text-amber-700 shadow-sm border border-amber-200">
                {word}
              </span>
            ))}
          </div>

          {/* AI Question */}
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-white/70 p-3">
            <span className="text-lg">🤖</span>
            <p className="font-body text-sm text-text-primary italic">
              AI asks: Which sentence is correct?
            </p>
          </div>

          <div className="mb-3 space-y-2">
            {[
              { id: "wrong", sentence: "I come from japan.", correct: false },
              { id: "correct", sentence: "I live in Japan.", correct: true },
            ].map((opt) => {
              const isSelected = selectedProper === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedProper(opt.id);
                    setShowProperHint(true);
                  }}
                  className={`w-full rounded-lg border-2 p-3 text-left font-body text-sm transition-all ${
                    isSelected
                      ? opt.correct
                        ? "border-progress-green bg-progress-green/10"
                        : "border-red-300 bg-red-50"
                      : "border-border-subtle bg-white hover:border-academic-blue/40"
                  }`}
                >
                  {opt.sentence}
                  {opt.correct && isSelected && (
                    <span className="ml-2 text-progress-green">✅ Correct!</span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedProper && showProperHint && (
            <div className="rounded-lg bg-progress-green/10 border border-progress-green/30 p-3">
              <p className="font-body text-xs text-progress-green">
                💡 <strong>Hint:</strong> &quot;Japan&quot; is a special name — a country — so it starts with a capital letter.
                &quot;japan&quot; (lowercase) would be wrong!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

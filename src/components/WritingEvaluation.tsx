"use client";

import { EvaluationResult } from "@/types/evaluation";

/**
 * Props for the WritingEvaluation component.
 *
 * - `evaluation`: The evaluation payload returned by the grammar analysis service.
 * - `isLoading`: Whether the evaluation request is in flight.
 * - `error`: Any user-facing error message to display.
 */
interface WritingEvaluationProps {
  evaluation: EvaluationResult | null;
  isLoading: boolean;
  error: string | null;
  showHero?: boolean;
  showInsights?: boolean;
  showGrammar?: boolean;
}

/**
 * Visual configuration for each level (1-5).
 *
 * These colors align with the design system and are used across the hero,
 * badges, and status accents to keep the assessment consistent.
 */
const LEVEL_CONFIG = {
  1: {
    color: "#EF4444",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-300",
    label: "Needs Improvement",
  },
  2: {
    color: "#F97316",
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-300",
    label: "Developing",
  },
  3: {
    color: "#3B82F6",
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-300",
    label: "Good",
  },
  4: {
    color: "#10B981",
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-300",
    label: "Excellent",
  },
  5: {
    color: "#F59E0B",
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    border: "border-yellow-300",
    label: "Outstanding",
  },
} as const;

type LevelConfig = (typeof LEVEL_CONFIG)[keyof typeof LEVEL_CONFIG];

/**
 * Emoji mapping for grammar breakdown cards.
 */
const GRAMMAR_ICONS = {
  singularPlural: "🔢",
  countableUncountable: "📦",
  articles: "📝",
  sentenceStructure: "🔗",
} as const;

/**
 * Safely resolve a level configuration, falling back to level 3 if the data
 * is outside the expected 1-5 range.
 */
function getLevelConfig(level: number): LevelConfig {
  if (level in LEVEL_CONFIG) {
    return LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG];
  }
  return LEVEL_CONFIG[3];
}

/**
 * Clamp the level to a 1-5 range for the progress ring while keeping
 * the display consistent with the configuration.
 */
function normalizeLevel(level: number): number {
  if (!Number.isFinite(level)) {
    return 3;
  }
  return Math.min(5, Math.max(1, Math.round(level)));
}

/**
 * Professional evaluation summary with hero progress ring, strengths,
 * improvements, and grammar breakdown.
 */
export function WritingEvaluation({
  evaluation,
  isLoading,
  error,
  showHero = true,
  showInsights = true,
  showGrammar = true,
}: WritingEvaluationProps) {
  if (isLoading) {
    return (
      <div
        className="glass-card-elevated rounded-lg p-8 text-center"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div
          className="w-16 h-16 mx-auto mb-4 border-4 border-academic-blue border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
        <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
          Evaluating Your Writing
        </h3>
        <p className="font-body text-text-secondary/70">
          AI is analyzing your grammar usage...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="glass-card-elevated rounded-lg p-6 border-2 border-red-200 bg-red-50/50"
        role="alert"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl" aria-hidden="true">
            ⚠️
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-red-600">
              Evaluation Failed
            </h3>
            <p className="font-body text-sm text-red-600/70">{error}</p>
          </div>
        </div>
        <p className="font-body text-sm text-text-secondary/60">
          You can still view and download your poster below.
        </p>
      </div>
    );
  }

  if (!evaluation) {
    return null;
  }

  const levelConfig = getLevelConfig(evaluation.level);
  const normalizedLevel = normalizeLevel(evaluation.level);
  const ringRadius = 45;
  const circumference = 2 * Math.PI * ringRadius;
  const progress = (normalizedLevel / 5) * circumference;
  const hasStrengths = evaluation.strengths.length > 0;
  const hasImprovements = evaluation.improvements.length > 0;
  const hasDetailedFeedback = Boolean(evaluation.detailedFeedback);
  const grammarCards = [
    {
      key: "singularPlural",
      title: "Singular/Plural",
      content: evaluation.grammarAnalysis?.singularPlural,
    },
    {
      key: "countableUncountable",
      title: "Countable/Uncountable",
      content: evaluation.grammarAnalysis?.countableUncountable,
    },
    {
      key: "articles",
      title: "Articles (a/an/the)",
      content: evaluation.grammarAnalysis?.articles,
    },
    {
      key: "sentenceStructure",
      title: "Sentence Structure",
      content: evaluation.grammarAnalysis?.sentenceStructure,
    },
  ] as const;
  const grammarCardsWithContent = grammarCards.filter((card) => Boolean(card.content));
  const hasGrammarBreakdown = grammarCardsWithContent.length > 0;
  const hasInsights =
    showInsights && (hasStrengths || hasImprovements || hasDetailedFeedback);
  const hasGrammarSection = showGrammar && hasGrammarBreakdown;

  if (!showHero && !hasInsights && !hasGrammarSection) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      {showHero && (
        <section
          className={`glass-card-elevated rounded-lg p-8 ${levelConfig.bg} animate-fade-in-up`}
          aria-label="Writing assessment overview"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center">
                <svg
                  className="w-32 h-32"
                  viewBox="0 0 100 100"
                  role="img"
                  aria-label={`Score ${evaluation.score}, level ${normalizedLevel} progress ring`}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r={ringRadius}
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${circumference} ${circumference}`}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={ringRadius}
                    stroke={levelConfig.color}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${progress} ${circumference}`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                  <text
                    x="50"
                    y="46"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-bold fill-current text-text-primary font-display"
                    fontSize="28"
                  >
                    {normalizedLevel}
                  </text>
                  <text
                    x="50"
                    y="64"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-current text-text-secondary/70 font-display"
                    fontSize="10"
                  >
                    {levelConfig.label}
                  </text>
                </svg>
              </div>
              <div className="space-y-2">
                <p className="font-display text-2xl font-semibold text-text-primary">
                  Your Writing Assessment
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${levelConfig.border} ${levelConfig.text}`}
                  >
                    Level {normalizedLevel}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border border-transparent px-3 py-1 text-sm font-semibold ${levelConfig.text}`}
                  >
                    {levelConfig.label}
                  </span>
                </div>
                <p className="font-body text-lg text-text-secondary">
                  Score:{" "}
                  <span className="font-semibold text-text-primary">{evaluation.score}</span>
                </p>
              </div>
            </div>
            <div
              className="flex items-center gap-3 rounded-lg border border-white/40 bg-white/60 px-4 py-3"
              aria-label="Assessment summary"
            >
              <span className="text-2xl" aria-hidden="true">
                📈
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-text-primary">
                  Overall Status
                </p>
                <p className={`font-body text-sm ${levelConfig.text}`}>{levelConfig.label}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {showInsights && (
        <>
          {/* Strengths and Improvements */}
          {(hasStrengths || hasImprovements) && (
            <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">
              {hasStrengths && (
                <div className="space-y-6 animate-fade-in-up animation-delay-100">
                  <div className="glass-card-elevated rounded-lg p-6 bg-progress-green/5 border-l-4 border-progress-green">
                    <h4 className="font-display text-lg font-semibold text-progress-green mb-3 flex items-center gap-2">
                      <span aria-hidden="true">✅</span>
                      <span>Strengths</span>
                    </h4>
                    <ul className="space-y-2" aria-label="Strengths list">
                      {evaluation.strengths.map((strength, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 font-body text-text-primary/80"
                        >
                          <span className="text-progress-green font-bold mt-1" aria-hidden="true">
                            •
                          </span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {hasImprovements && (
                <div className="space-y-6 animate-fade-in-up animation-delay-200">
                  <div className="glass-card-elevated rounded-lg p-6 bg-academic-blue/5 border-l-4 border-academic-blue">
                    <h4 className="font-display text-lg font-semibold text-academic-blue mb-3 flex items-center gap-2">
                      <span aria-hidden="true">📝</span>
                      <span>Areas to Improve</span>
                    </h4>
                    <ul className="space-y-2" aria-label="Improvements list">
                      {evaluation.improvements.map((improvement, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 font-body text-text-primary/80"
                        >
                          <span className="text-academic-blue font-bold mt-1" aria-hidden="true">
                            •
                          </span>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Detailed Feedback */}
          {hasDetailedFeedback && (
            <div className="glass-card-elevated rounded-lg p-6 animate-fade-in-up animation-delay-200">
              <h4 className="font-display text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span aria-hidden="true">💡</span>
                <span>Detailed Feedback</span>
              </h4>
              <p className="font-body text-text-primary/80 leading-relaxed">
                {evaluation.detailedFeedback}
              </p>
            </div>
          )}
        </>
      )}

      {/* Grammar Breakdown */}
      {showGrammar && hasGrammarBreakdown && (
        <div className="glass-card-elevated rounded-lg p-6 animate-fade-in-up animation-delay-300">
          <h4 className="font-display text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span aria-hidden="true">🔍</span>
            <span>Grammar Breakdown</span>
          </h4>
          <div className="grid gap-4 md:grid-cols-2" role="list" aria-label="Grammar breakdown">
            {grammarCardsWithContent.map((card) => (
              <div
                key={card.key}
                className="bg-bg-secondary rounded-lg p-4 border-l-4 border-academic-blue"
                role="listitem"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl" aria-hidden="true">
                    {GRAMMAR_ICONS[card.key]}
                  </span>
                  <h5 className="font-semibold text-text-primary">{card.title}</h5>
                </div>
                <p className="text-sm text-text-primary/70 font-body">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

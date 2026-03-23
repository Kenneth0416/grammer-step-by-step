"use client";

import React from "react";
import { LearningObjectives } from "@/components/LearningObjectives";
import { RuleCard } from "@/components/RuleCard";
import { SimulationPad } from "@/components/WarmupActivity";
import type { ActivityType, LessonUnit } from "@/data/lesson-types";

const activityMeta: Record<ActivityType, { icon: string; accent: string; surface: string }> = {
  warmup: { icon: "🔥", accent: "text-achievement-gold", surface: "from-achievement-gold/10 to-achievement-gold-light/10" },
  tpr: { icon: "🕺", accent: "text-academic-blue", surface: "from-academic-blue/10 to-sky-light/10" },
  game: { icon: "🎮", accent: "text-academic-blue", surface: "from-academic-blue/10 to-sky-light/10" },
  discovery: { icon: "🔎", accent: "text-progress-green", surface: "from-progress-green/10 to-progress-green-light/10" },
  classification: { icon: "🗂️", accent: "text-progress-green", surface: "from-progress-green/10 to-progress-green-light/10" },
  bingo: { icon: "🎯", accent: "text-academic-blue", surface: "from-academic-blue/10 to-sky-light/10" },
  flashcard: { icon: "📇", accent: "text-academic-blue", surface: "from-academic-blue/10 to-sky-light/10" },
  sorting: { icon: "📊", accent: "text-academic-blue", surface: "from-academic-blue/10 to-sky-light/10" },
  matching: { icon: "🔗", accent: "text-academic-blue", surface: "from-academic-blue/10 to-sky-light/10" },
  race: { icon: "🏃", accent: "text-academic-blue", surface: "from-academic-blue/10 to-sky-light/10" },
  story: { icon: "📖", accent: "text-progress-green", surface: "from-progress-green/10 to-progress-green-light/10" },
  survey: { icon: "📋", accent: "text-progress-green", surface: "from-progress-green/10 to-progress-green-light/10" },
  interview: { icon: "🎤", accent: "text-progress-green", surface: "from-progress-green/10 to-progress-green-light/10" },
  presentation: { icon: "✍️", accent: "text-progress-green", surface: "from-progress-green/10 to-progress-green-light/10" },
  roleplay: { icon: "🎭", accent: "text-achievement-gold", surface: "from-achievement-gold/10 to-achievement-gold-light/10" },
  review: { icon: "🔁", accent: "text-text-primary", surface: "from-bg-secondary to-bg-tertiary" }
};

export function ActivityUnit({ unit }: { unit: LessonUnit }) {
  const activity = unit.activity;
  const activityStyles = activity ? activityMeta[activity.type] : activityMeta.game;

  return (
    <div className="glass-card-elevated rounded-lg p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-academic-blue to-academic-blue-dark shadow-md">
            <span className="text-xl">{activity ? activityStyles.icon : "📚"}</span>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-text-primary">{unit.title}</h3>
            <p className="font-body text-sm text-text-secondary/60">{unit.titleCn}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {unit.stage && (
            <span className="rounded-full bg-academic-blue/10 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wide text-academic-blue">
              {unit.stage.replace("-", " ")}
            </span>
          )}
          {unit.duration && (
            <span className="rounded-full bg-progress-green/10 px-3 py-1 font-display text-xs font-semibold text-progress-green">
              {unit.duration}
            </span>
          )}
          {activity && (
            <span className={`rounded-full bg-white px-3 py-1 font-display text-xs font-semibold shadow-sm ${activityStyles.accent}`}>
              {activity.type}
            </span>
          )}
        </div>
      </div>

      {unit.learningObjectives && <LearningObjectives objectives={unit.learningObjectives} />}

      {unit.content && (
        <div className={`mb-6 rounded-xl bg-gradient-to-br ${activityStyles.surface} p-5`}>
          <p className="font-body leading-relaxed text-text-primary">{unit.content.explanation}</p>
          {unit.content.rules && unit.content.rules.length > 0 && (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {unit.content.rules.map((rule, index) => (
                <div key={index} className="rounded-lg bg-white/80 p-3 shadow-sm">
                  <p className="font-body text-sm text-text-primary">{rule}</p>
                </div>
              ))}
            </div>
          )}
          {unit.content.tips && unit.content.tips.length > 0 && (
            <div className="mt-4 rounded-lg bg-white/70 p-4">
              <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-text-secondary/60">
                Teaching Tips
              </p>
              <div className="space-y-2">
                {unit.content.tips.map((tip, index) => (
                  <p key={index} className="font-body text-sm text-text-primary/80">
                    {tip}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {unit.teacherScript && (
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xl">🎙️</span>
            <div>
              <h4 className="font-display text-base font-semibold text-text-primary">Teacher Script</h4>
              <p className="font-body text-sm text-text-secondary/70">
                {unit.teacherScript.focus || unit.teacherScript.opening || "Teaching guide"}
              </p>
            </div>
          </div>

          {unit.teacherScript.approach && unit.teacherScript.approach.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {unit.teacherScript.approach.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-academic-blue/10 px-3 py-1 font-display text-xs font-semibold text-academic-blue"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {/* Extended sections structure (detailed script) */}
          {unit.teacherScript.sections && unit.teacherScript.sections.length > 0 && (
            <div className="grid gap-4 lg:grid-cols-2">
              {unit.teacherScript.sections.map((section, index) => (
                <div key={`${section.label}-${index}`} className="rounded-xl border border-academic-blue/15 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-lg">🧩</span>
                    <h5 className="font-display text-sm font-semibold text-text-primary">{section.label}</h5>
                  </div>

                  <div className="space-y-2">
                    {section.teacherLines.map((line, lineIndex) => (
                      <p key={lineIndex} className="font-body text-sm leading-relaxed text-text-primary">
                        {line}
                      </p>
                    ))}
                  </div>

                  {section.studentLookFors && section.studentLookFors.length > 0 && (
                    <div className="mt-4 rounded-lg bg-progress-green/10 p-3">
                      <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-progress-green">
                        Student Look-Fors
                      </p>
                      <div className="space-y-1">
                        {section.studentLookFors.map((item, itemIndex) => (
                          <p key={itemIndex} className="font-body text-sm text-text-primary/80">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.boardNotes && section.boardNotes.length > 0 && (
                    <div className="mt-4 rounded-lg bg-achievement-gold/10 p-3">
                      <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-achievement-gold">
                        Board Notes
                      </p>
                      <div className="space-y-1">
                        {section.boardNotes.map((item, itemIndex) => (
                          <p key={itemIndex} className="font-body text-sm text-text-primary/80">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.transition && (
                    <div className="mt-4 border-l-4 border-academic-blue pl-3">
                      <p className="font-body text-sm italic text-text-secondary/80">{section.transition}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Simple structure (opening, instructions, model answers) */}
          {(!unit.teacherScript.sections || unit.teacherScript.sections.length === 0) && (
            <div className="space-y-4 rounded-xl border border-academic-blue/15 bg-white p-5 shadow-sm">
              {unit.teacherScript.opening && (
                <div className="rounded-lg bg-academic-blue/5 p-4">
                  <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-academic-blue">
                    Opening
                  </p>
                  <p className="font-body text-sm leading-relaxed text-text-primary">
                    {unit.teacherScript.opening}
                  </p>
                </div>
              )}

              {unit.teacherScript.instructions && (
                <div className="rounded-lg bg-progress-green/5 p-4">
                  <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-progress-green">
                    Instructions
                  </p>
                  <p className="font-body text-sm leading-relaxed text-text-primary">
                    {unit.teacherScript.instructions}
                  </p>
                </div>
              )}

              {unit.teacherScript.modelAnswers && unit.teacherScript.modelAnswers.length > 0 && (
                <div className="rounded-lg bg-achievement-gold/5 p-4">
                  <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-achievement-gold">
                    Model Answers
                  </p>
                  <div className="space-y-2">
                    {unit.teacherScript.modelAnswers.map((answer, index) => (
                      <p key={index} className="font-body text-sm text-text-primary">
                        {answer}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {unit.teacherScript.transition && (
                <div className="border-l-4 border-academic-blue pl-3">
                  <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-academic-blue">
                    Transition
                  </p>
                  <p className="font-body text-sm italic text-text-secondary/80">
                    {unit.teacherScript.transition}
                  </p>
                </div>
              )}

              {unit.teacherScript.encouragement && (
                <div className="rounded-lg bg-progress-green/10 p-4">
                  <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-progress-green">
                    Encouragement
                  </p>
                  <p className="font-body text-sm text-text-primary">
                    {unit.teacherScript.encouragement}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activity && (
        <div className="mb-6 rounded-xl border border-academic-blue/15 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xl">{activityStyles.icon}</span>
            <div>
              <h4 className="font-display text-base font-semibold text-text-primary">{activity.name}</h4>
              <p className="font-body text-sm text-text-secondary/70">{activity.summary}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-bg-secondary p-4">
              <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-text-secondary/60">
                Objective
              </p>
              <p className="font-body text-sm text-text-primary">{activity.objective}</p>
            </div>

            <div className="rounded-lg bg-bg-secondary p-4">
              <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-text-secondary/60">
                Materials
              </p>
              <div className="space-y-1">
                {activity.materials.map((material, index) => (
                  <p key={index} className="font-body text-sm text-text-primary">
                    {material}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {activity.setup && activity.setup.length > 0 && (
            <div className="mt-4 rounded-lg bg-achievement-gold/10 p-4">
              <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wide text-achievement-gold">
                Setup
              </p>
              <div className="space-y-2">
                {activity.setup.map((item, index) => (
                  <p key={index} className="font-body text-sm text-text-primary">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 rounded-lg bg-progress-green/10 p-4">
            <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wide text-progress-green">
              Activity Steps
            </p>
            <div className="space-y-2">
              {activity.steps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white font-display text-xs font-semibold text-progress-green">
                    {index + 1}
                  </span>
                  <p className="font-body text-sm leading-relaxed text-text-primary">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {activity.prompts && activity.prompts.length > 0 && (
            <div className="mt-4 rounded-lg bg-academic-blue/10 p-4">
              <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wide text-academic-blue">
                Teacher Prompts
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                {activity.prompts.map((prompt, index) => (
                  <div key={index} className="rounded-lg bg-white px-4 py-3 shadow-sm">
                    <p className="font-body text-sm text-text-primary">{prompt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activity.sampleLanguage && activity.sampleLanguage.length > 0 && (
            <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
              <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wide text-text-secondary/60">
                Sample Language
              </p>
              <div className="space-y-2">
                {activity.sampleLanguage.map((line, index) => (
                  <p key={index} className="font-body text-sm text-text-primary">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {activity.differentiation && activity.differentiation.length > 0 && (
            <div className="mt-4 rounded-lg bg-bg-secondary p-4">
              <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wide text-text-secondary/60">
                Differentiation
              </p>
              <div className="space-y-2">
                {activity.differentiation.map((item, index) => (
                  <p key={index} className="font-body text-sm text-text-primary">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <SimulationPad simulation={activity.keyboardMouseSimulation} />
          </div>

          {activity.successCheck && (
            <div className="mt-4 rounded-lg border border-progress-green/20 bg-progress-green/10 p-4">
              <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-progress-green">
                Success Check
              </p>
              <p className="font-body text-sm text-text-primary">{activity.successCheck}</p>
            </div>
          )}
        </div>
      )}

      {unit.rulesWithExamples && (
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg">📋</span>
            <h4 className="font-display text-sm font-semibold text-academic-blue">Key Language</h4>
          </div>

          {unit.rulesWithExamples
            .filter((ruleData) => ruleData.category === "core")
            .map((ruleData, index) => (
              <RuleCard key={`${ruleData.rule}-${index}`} ruleData={ruleData} />
            ))}

          {unit.rulesWithExamples.some((ruleData) => ruleData.category === "special") && (
            <>
              <div className="my-6 flex items-center gap-2">
                <span className="text-amber-500">⚠️</span>
                <span className="font-display text-sm font-semibold text-amber-600">Special Cases</span>
              </div>
              {unit.rulesWithExamples
                .filter((ruleData) => ruleData.category === "special")
                .map((ruleData, index) => (
                  <RuleCard key={`${ruleData.rule}-${index}`} ruleData={ruleData} />
                ))}
            </>
          )}
        </div>
      )}

      {unit.examples && unit.examples.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">✏️</span>
            <h4 className="font-display text-sm font-semibold text-text-primary">Examples</h4>
          </div>
          {unit.examples.map((example, index) => (
            <div key={index} className="rounded-lg border-l-4 border-achievement-gold bg-bg-secondary p-4">
              <p className="font-body text-text-primary">{example.sentence}</p>
              <p className="mt-1 font-body text-sm text-text-secondary/60">{example.translation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

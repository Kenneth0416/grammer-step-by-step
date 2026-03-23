"use client";

import React, { useEffect, useState } from "react";
import { LearningObjectives } from "@/components/LearningObjectives";
import type { ActivitySimulation, LessonUnit, TeacherScriptSection } from "@/data/lesson-types";

function renderScriptSection(section: TeacherScriptSection, index: number) {
  return (
    <div key={`${section.label}-${index}`} className="rounded-lg border border-academic-blue/15 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">🗣️</span>
        <h4 className="font-display text-sm font-semibold text-text-primary">{section.label}</h4>
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
            Watch For
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
  );
}

export function SimulationPad({
  simulation,
  title = "Keyboard / Mouse Simulation"
}: {
  simulation?: ActivitySimulation;
  title?: string;
}) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  useEffect(() => {
    if (!simulation) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const normalizedKey = event.key.toLowerCase();
      const match = simulation.actions.find(
        (action) => action.key.toLowerCase() === normalizedKey
      );

      if (match) {
        event.preventDefault();
        setSelectedAction(match.label);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [simulation]);

  if (!simulation) {
    return null;
  }

  const activeAction =
    simulation.actions.find((action) => action.label === selectedAction) ?? null;

  return (
    <div className="rounded-xl border border-academic-blue/20 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">⌨️</span>
        <div>
          <h4 className="font-display text-base font-semibold text-text-primary">{title}</h4>
          <p className="font-body text-sm text-text-secondary/70">{simulation.instructions}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {simulation.actions.map((action) => {
          const isActive = selectedAction === action.label;

          return (
            <button
              key={action.label}
              type="button"
              onClick={() => setSelectedAction(action.label)}
              className={`rounded-xl border px-4 py-3 text-left transition-all ${
                isActive
                  ? "border-academic-blue bg-academic-blue/10 shadow-sm"
                  : "border-academic-blue/15 bg-bg-secondary hover:border-academic-blue/40 hover:bg-academic-blue/5"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-text-primary">{action.label}</span>
                <span className="rounded-full bg-white px-2 py-1 font-display text-xs text-academic-blue">
                  {action.key.toUpperCase()}
                </span>
              </div>
              <p className="font-body text-sm text-text-secondary/75">{action.response}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl bg-bg-secondary p-4">
        <p className="mb-1 font-display text-xs font-semibold uppercase tracking-wide text-text-secondary/60">
          Current Response
        </p>
        <p className="font-body text-sm text-text-primary">
          {activeAction ? activeAction.response : "Select an action or press a matching key to preview the response."}
        </p>
      </div>
    </div>
  );
}

export function WarmupActivity({ unit }: { unit: LessonUnit }) {
  const prompts = unit.activity?.prompts ?? [];
  const [promptIndex, setPromptIndex] = useState(0);

  const showPrompt = prompts.length > 0;
  const currentPrompt = showPrompt ? prompts[promptIndex] : null;

  return (
    <div className="glass-card-elevated rounded-lg p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-achievement-gold-light to-achievement-gold shadow-md">
            <span className="text-xl">🔥</span>
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
            <span className="rounded-full bg-achievement-gold/15 px-3 py-1 font-display text-xs font-semibold text-achievement-gold">
              {unit.duration}
            </span>
          )}
        </div>
      </div>

      {unit.learningObjectives && <LearningObjectives objectives={unit.learningObjectives} />}

      {unit.content && (
        <div className="mb-6 rounded-xl bg-gradient-to-br from-achievement-gold/10 to-achievement-gold-light/10 p-5">
          <p className="font-body leading-relaxed text-text-primary">{unit.content.explanation}</p>
          {unit.content.tips && unit.content.tips.length > 0 && (
            <div className="mt-4 space-y-2">
              {unit.content.tips.map((tip, index) => (
                <p key={index} className="font-body text-sm text-text-secondary/80">
                  {tip}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {unit.teacherScript && (
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg">🎙️</span>
            <div>
              <h4 className="font-display text-base font-semibold text-text-primary">Teacher Script</h4>
              <p className="font-body text-sm text-text-secondary/70">
                {unit.teacherScript.focus || unit.teacherScript.opening || "Teaching guide"}
              </p>
            </div>
          </div>
          {unit.teacherScript.sections && unit.teacherScript.sections.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {unit.teacherScript.sections.map((section, index) => renderScriptSection(section, index))}
            </div>
          )}
          {(!unit.teacherScript.sections || unit.teacherScript.sections.length === 0) && unit.teacherScript.opening && (
            <div className="rounded-xl border border-academic-blue/15 bg-white p-5 shadow-sm">
              <p className="font-body text-sm leading-relaxed text-text-primary">
                {unit.teacherScript.opening}
              </p>
            </div>
          )}
        </div>
      )}

      {unit.activity && (
        <div className="space-y-6">
          <div className="rounded-xl border border-achievement-gold/20 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <div>
                <h4 className="font-display text-base font-semibold text-text-primary">{unit.activity.name}</h4>
                <p className="font-body text-sm text-text-secondary/70">{unit.activity.summary}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-bg-secondary p-4">
                <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-text-secondary/60">
                  Objective
                </p>
                <p className="font-body text-sm text-text-primary">{unit.activity.objective}</p>
              </div>

              <div className="rounded-lg bg-bg-secondary p-4">
                <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-text-secondary/60">
                  Materials
                </p>
                <div className="space-y-1">
                  {unit.activity.materials.map((material, index) => (
                    <p key={index} className="font-body text-sm text-text-primary">
                      {material}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-progress-green/10 p-4">
              <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wide text-progress-green">
                Activity Steps
              </p>
              <div className="space-y-2">
                {unit.activity.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white font-display text-xs font-semibold text-progress-green">
                      {index + 1}
                    </span>
                    <p className="font-body text-sm leading-relaxed text-text-primary">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showPrompt && currentPrompt && (
            <div className="rounded-xl border border-academic-blue/20 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-display text-base font-semibold text-text-primary">Warm-up Prompt</h4>
                  <p className="font-body text-sm text-text-secondary/70">Cycle through quick teacher cues.</p>
                </div>
                <span className="rounded-full bg-academic-blue/10 px-3 py-1 font-display text-xs font-semibold text-academic-blue">
                  {promptIndex + 1} / {prompts.length}
                </span>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-academic-blue/10 to-sky-light/10 p-6">
                <p className="font-display text-lg font-semibold text-text-primary">{currentPrompt}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setPromptIndex((current) => (current === 0 ? prompts.length - 1 : current - 1))
                  }
                  className="rounded-lg border border-academic-blue/20 px-4 py-2 font-display text-sm font-semibold text-academic-blue transition-colors hover:bg-academic-blue/5"
                >
                  Previous Prompt
                </button>
                <button
                  type="button"
                  onClick={() => setPromptIndex((current) => (current + 1) % prompts.length)}
                  className="rounded-lg bg-gradient-to-r from-academic-blue to-academic-blue-dark px-4 py-2 font-display text-sm font-semibold text-white transition-all hover:shadow-md"
                >
                  Next Prompt
                </button>
              </div>
            </div>
          )}

          <SimulationPad simulation={unit.activity.keyboardMouseSimulation} />

          {unit.activity.successCheck && (
            <div className="rounded-xl border border-progress-green/20 bg-progress-green/10 p-4">
              <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-progress-green">
                Success Check
              </p>
              <p className="font-body text-sm text-text-primary">{unit.activity.successCheck}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

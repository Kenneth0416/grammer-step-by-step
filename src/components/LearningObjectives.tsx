import React from "react";

interface LearningObjective {
  title: string;
  icon: string;
}

interface LearningObjectivesProps {
  objectives: LearningObjective[];
}

export function LearningObjectives({ objectives }: LearningObjectivesProps) {
  return (
    <div className="glass-card-elevated rounded-lg p-5 mb-6 bg-gradient-to-br from-academic-blue/5 to-sky-light/5 border border-academic-blue/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-academic-blue to-academic-blue-dark flex items-center justify-center">
          <span className="text-lg">🎯</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-text-primary">Learning Objectives</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {objectives.map((objective, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-academic-blue/10 hover:border-academic-blue/30 hover:shadow-md transition-all"
          >
            <div className="text-2xl">{objective.icon}</div>
            <span className="font-body text-text-primary/80">{objective.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

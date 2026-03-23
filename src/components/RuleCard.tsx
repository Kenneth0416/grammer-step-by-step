import React, { useState } from "react";

interface RuleExample {
  sentence: string;
  translation: string;
  highlight?: string;
}

interface RuleWithExamples {
  rule: string;
  category: 'core' | 'special';
  examples: RuleExample[];
  mnemonic?: string;
}

interface RuleCardProps {
  ruleData: RuleWithExamples;
  color?: string;
}

export function RuleCard({ ruleData, color = 'academic-blue' }: RuleCardProps) {
  const [expanded, setExpanded] = useState(true);
  const isSpecial = ruleData.category === 'special';

  const highlightWords = (text: string, highlights?: string) => {
    if (!highlights) return text;

    const words = highlights.split(', ').map(w => w.trim());
    let parts: (string | React.ReactElement)[] = [text];

    words.forEach(word => {
      const newParts: (string | React.ReactElement)[] = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${word})`, 'gi');
          const splitParts = part.split(regex);
          splitParts.forEach((splitPart, i) => {
            if (splitPart.toLowerCase() === word.toLowerCase()) {
              newParts.push(
                <span key={`${word}-${i}`} className="font-semibold text-achievement-gold underline decoration-2 decoration-achievement-gold/50">
                  {splitPart}
                </span>
              );
            } else {
              newParts.push(splitPart);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return <>{parts}</>;
  };

  return (
    <div className={`glass-card-elevated rounded-lg overflow-hidden mb-4 transition-all duration-300 ${
      isSpecial ? 'border-2 border-amber-400/50 bg-amber-50/30' : 'border-academic-blue/10'
    }`}>
      {/* Rule Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isSpecial ? 'bg-amber-100 text-amber-600' : `bg-${color}/10 text-${color}`
          }`}>
            {isSpecial ? '⚠️' : '📌'}
          </div>
          <div className="text-left">
            <p className="font-body text-base font-semibold text-text-primary">
              {ruleData.rule}
            </p>
            {isSpecial && (
              <span className="text-xs text-amber-600 font-display">Special Case</span>
            )}
          </div>
        </div>
        <div className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-text-secondary" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
      </button>

      {/* Mnemonic (Memory Tip) */}
      {ruleData.mnemonic && (
        <div className="mx-4 mb-3 p-3 bg-gradient-to-r from-achievement-gold/10 to-achievement-gold-light/10 rounded-lg border border-achievement-gold/30">
          <div className="flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span className="font-body text-sm text-text-secondary/80 italic">
              {ruleData.mnemonic}
            </span>
          </div>
        </div>
      )}

      {/* Examples */}
      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-display text-text-secondary/60">Examples:</span>
          </div>
          {ruleData.examples.map((example, i) => (
            <div
              key={i}
              className="bg-bg-secondary rounded-lg p-3 border-l-4 border-achievement-gold/50 hover:border-achievement-gold transition-colors"
            >
              <p className="font-body text-text-primary mb-1">
                {highlightWords(example.sentence, example.highlight)}
              </p>
              {example.translation && (
                <p className="font-body text-sm text-text-secondary/60">
                  {example.translation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export interface GrammarAnalysis {
  singularPlural: string;
  countableUncountable: string;
  articles: string;
  sentenceStructure: string;
}

export interface EvaluationResult {
  level: number;
  score: string;
  strengths: string[];
  improvements: string[];
  detailedFeedback: string;
  grammarAnalysis: GrammarAnalysis;
}
export type LessonUnitType =
  | "teach"
  | "video"
  | "examples"
  | "practice"
  | "quiz"
  | "warmup"
  | "activity"
  | "get-ready"       // Tab 1: Get Ready! — goal selection + mission
  | "try-it-out"      // Tab 2: Try it Out! — noun definition + types + AI questions
  | "practice-ai"     // Tab 3: Practise with a Pro! — AI MCQ practice with hints
  | "produce"         // Tab 4: Let's Produce! — AI writing tasks with hints
  | "review";        // Tab 6: Check & Think — reflection + next lesson

export type PedagogyStage =
  | "warmup"
  | "presentation"
  | "discovery"
  | "guided-practice"
  | "production"
  | "assessment";

export type ActivityType =
  | "warmup"
  | "tpr"
  | "game"
  | "discovery"
  | "classification"
  | "bingo"
  | "flashcard"
  | "sorting"
  | "matching"
  | "race"
  | "story"
  | "survey"
  | "interview"
  | "presentation"
  | "roleplay"
  | "review";

export interface LessonExample {
  sentence: string;
  translation: string;
  highlight?: string;
}

export interface LessonQuestion {
  id: string;
  type: "multiple" | "fill" | "drag";
  question: string;
  questionCn: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  caseSensitive?: boolean;
  difficulty?: "easy" | "medium" | "hard"; // For AI practice tabs (Tabs 3 & 4)
}

export interface RuleWithExamples {
  rule: string;
  category: "core" | "special";
  examples: LessonExample[];
  mnemonic?: string;
}

export interface LearningObjective {
  title: string;
  icon: string;
}

export interface TeacherScriptSection {
  label: string;
  teacherLines: string[];
  studentLookFors?: string[];
  boardNotes?: string[];
  transition?: string;
}

export interface TeacherScript {
  // Simple structure for direct usage in lessons
  opening?: string;
  instructions?: string;
  modelAnswers?: string[];
  transition?: string;
  encouragement?: string;
  // Extended structure (optional, for detailed scripts)
  focus?: string;
  approach?: string[];
  sections?: TeacherScriptSection[];
  // Warmup structure (simple script format)
  script?: string;
  purpose?: string;
  duration?: string;
  cues?: string[];
}

export interface ActivitySimulationAction {
  key: string;
  label: string;
  response: string;
}

export interface ActivitySimulation {
  instructions: string;
  actions: ActivitySimulationAction[];
}

export interface LessonActivity {
  id: string;
  name: string;
  type: ActivityType;
  summary?: string;
  objective?: string;
  materials: string[];
  setup?: string[];
  steps: string[];
  prompts?: string[];
  sampleLanguage?: string[];
  differentiation?: string[];
  keyboardMouseSimulation?: ActivitySimulation;
  successCheck?: string;
}

export interface LessonUnit {
  id: string;
  title: string;
  titleCn: string;
  type: LessonUnitType;
  stage?: PedagogyStage;
  duration?: string;
  videoUrl?: string;
  videoDuration?: string;
  content?: {
    explanation: string;
    rules?: string[];
    tips?: string[];
    // Tab 1 — Get Ready!
    mission?: string;
    goalOptions?: Record<string, unknown>[];
    // Tab 6 — Check & Think
    canDoStatements?: string[];
    reflectionOptions?: string[];
    nextSteps?: Record<string, unknown>[];
  };
  examples?: LessonExample[];
  questions?: LessonQuestion[];
  rulesWithExamples?: RuleWithExamples[];
  learningObjectives?: LearningObjective[];
  teacherScript?: TeacherScript;
  activity?: LessonActivity;
}

export interface Lesson {
  id: string;
  level: string;
  title: string;
  titleCn: string;
  description: string;
  descriptionCn: string;
  color: string;
  cards: number;
  xpReward: number;
  units: LessonUnit[];
}

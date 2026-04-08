import {
  classroomDescriptionActivity,
  countabilitySortActivity,
  countableReviewActivity,
  irregularPluralActivity,
  kitchenProductionActivity,
  magicSActivity,
  muchManyRoleplayActivity,
  nounClassificationActivity,
  nounDiscoveryActivity,
  nounISpyActivity,
  nounSentenceActivity,
  nounTprActivity,
  pluralReviewActivity,
  soundBingoActivity,
  waterProblemActivity
} from "@/data/activities";
import {
  canWeCountItScripts,
  nounAdventureScripts,
  oneAndManyScripts
} from "@/data/lesson-scripts";
import type { Lesson } from "@/data/lesson-types";

export type {
  ActivitySimulation,
  ActivitySimulationAction,
  ActivityType,
  LearningObjective,
  Lesson,
  LessonActivity,
  LessonExample,
  LessonQuestion,
  LessonUnit,
  LessonUnitType,
  PedagogyStage,
  RuleWithExamples,
  TeacherScript,
  TeacherScriptSection
} from "@/data/lesson-types";

export const lessons: Lesson[] = [
  {
    id: "1a",
    level: "1A",
    title: "Nouns",
    titleCn: "The Noun Adventure",
    description: "Follow the 6-step journey: set your goal, discover nouns, practise with AI, write, quiz, and reflect.",
    descriptionCn: "嚴格按照六步流程：設定目標、探索名詞、AI練習、寫作、測驗、回顧。",
    color: "noun-brown",
    cards: 12,
    xpReward: 100,
    units: [
      // ── TAB 1: Get Ready! ──────────────────────────────────────────────────
      {
        id: "unit-1",
        title: "Get Ready!",
        titleCn: "準備出發！",
        type: "get-ready",
        stage: "warmup",
        duration: "3 min",
        learningObjectives: [
          { title: "Understand today's mission", icon: "🎯" },
          { title: "Choose a personal focus area", icon: "⚡" },
        ],
        content: {
          explanation: "Students set their personal learning goal from 4 options, personalising the AI tutor hints throughout the lesson.",
          tips: ["Allow students to change their focus at any time during the lesson."],
        },
      },
      // ── TAB 2: Try it Out! ─────────────────────────────────────────────────
      {
        id: "unit-2",
        title: "Try it Out!",
        titleCn: "探索名詞！",
        type: "try-it-out",
        stage: "presentation",
        duration: "10 min",
        learningObjectives: [
          { title: "Understand what a noun is", icon: "📖" },
          { title: "Identify four noun types", icon: "🗂️" },
          { title: "Tell common nouns from proper nouns", icon: "⚖️" },
        ],
        content: {
          explanation: "Students discover what nouns are, explore the four noun types (people, places, things, ideas), and learn the difference between common and proper nouns through interactive examples and AI-guided questions.",
          rules: [
            "noun = naming word",
            "People, places, things, ideas are all noun groups",
            "Common nouns are general names — lowercase",
            "Proper nouns are special names — capital letters",
          ],
          tips: [
            "Use Who is it? What is it? as the key AI prompts",
            "Return to the people/places/things/ideas grid after each noun type",
            "Use paired examples (city / Hong Kong) to make the common/proper contrast concrete",
          ],
        },
        rulesWithExamples: [
          {
            rule: "Nouns name people",
            category: "core",
            mnemonic: "Who is it? That answer is a noun.",
            examples: [
              { sentence: "teacher", translation: "老師", highlight: "teacher" },
              { sentence: "student", translation: "學生", highlight: "student" },
            ],
          },
          {
            rule: "Nouns name places",
            category: "core",
            mnemonic: "Where is it? That answer is a noun.",
            examples: [
              { sentence: "school", translation: "學校", highlight: "school" },
              { sentence: "classroom", translation: "課室", highlight: "classroom" },
            ],
          },
          {
            rule: "Nouns name things",
            category: "core",
            mnemonic: "What is it? That answer is a noun.",
            examples: [
              { sentence: "book", translation: "書", highlight: "book" },
              { sentence: "desk", translation: "桌子", highlight: "desk" },
            ],
          },
          {
            rule: "Nouns name ideas",
            category: "special",
            mnemonic: "You can name it, but you cannot touch it.",
            examples: [
              { sentence: "happiness", translation: "快樂", highlight: "happiness" },
              { sentence: "love", translation: "愛", highlight: "love" },
            ],
          },
          {
            rule: "Common nouns are general — no capital letter",
            category: "core",
            mnemonic: "General = common = lowercase",
            examples: [
              { sentence: "city, teacher, dog", translation: "城市，老師，狗", highlight: "city, teacher, dog" },
            ],
          },
          {
            rule: "Proper nouns are special names — capital letter",
            category: "core",
            mnemonic: "Special name = capital letter",
            examples: [
              { sentence: "Hong Kong, Miss Chan, Asia, Monday", translation: "香港，陳老師，亞洲，星期一", highlight: "Hong Kong, Miss Chan, Asia, Monday" },
            ],
          },
        ],
        examples: [
          { sentence: "The teacher is kind.", translation: "老師很善良。", highlight: "teacher" },
          { sentence: "I live in Japan.", translation: "我住在日本。", highlight: "Japan" },
          { sentence: "I love Monday!", translation: "我喜歡星期一！", highlight: "Monday" },
        ],
      },
      // ── TAB 3: Practise with a Pro! ───────────────────────────────────────
      {
        id: "unit-3",
        title: "Practise with a Pro!",
        titleCn: "與 AI 導師練習！",
        type: "practice-ai",
        stage: "guided-practice",
        duration: "8 min",
        learningObjectives: [
          { title: "Identify nouns in sentences", icon: "🔍" },
          { title: "Classify noun types", icon: "🗂️" },
          { title: "Apply capital letter rules", icon: "🔠" },
        ],
        content: {
          explanation: "AI-powered MCQ practice with personalised hints. Students choose their difficulty and receive AI coaching — not direct answers — to guide their thinking.",
          tips: ["Encourage students to use Get AI Hint before giving up."],
        },
        questions: [
          {
            id: "p1", type: "multiple", difficulty: "easy",
            question: "Which word is a noun?",
            questionCn: "哪個詞是名詞？",
            options: ["run", "happy", "teacher", "quickly"],
            correctAnswer: "teacher",
            explanation: "Teacher is a noun because it names a person. Run is a verb, happy is an adjective, quickly is an adverb.",
          },
          {
            id: "p2", type: "multiple", difficulty: "easy",
            question: 'What type of noun is "school"?',
            questionCn: '"學校" 是什麼類型的名詞？',
            options: ["People", "Places", "Things", "Ideas"],
            correctAnswer: "Places",
            explanation: "School names a place — where you learn.",
          },
          {
            id: "p3", type: "multiple", difficulty: "easy",
            question: "Which is a proper noun?",
            questionCn: "哪個是專有名詞？",
            options: ["city", "teacher", "Monday", "book"],
            correctAnswer: "Monday",
            explanation: "Monday is a special name — a day of the week — so it starts with a capital letter.",
          },
          {
            id: "p4", type: "multiple", difficulty: "medium",
            question: 'What type of noun is "happiness"?',
            questionCn: '"快樂" 是什麼類型的名詞？',
            options: ["People", "Places", "Things", "Ideas"],
            correctAnswer: "Ideas",
            explanation: "Happiness is an idea noun. You can feel it or think about it, but you cannot touch it.",
          },
          {
            id: "p5", type: "multiple", difficulty: "medium",
            question: "Choose the correct sentence:",
            questionCn: "選擇正確的句子：",
            options: ["I go to school in japan.", "I go to school in Japan.", "I go to School in Japan.", "I Go to school in Japan."],
            correctAnswer: "I go to school in Japan.",
            explanation: "Japan is a proper noun (capital letter). school is a common noun (lowercase).",
          },
          {
            id: "p6", type: "multiple", difficulty: "medium",
            question: 'How many nouns are in: "The dog plays in the park."',
            questionCn: '句子中有多少個名詞："The dog plays in the park."',
            options: ["1", "2", "3", "4"],
            correctAnswer: "2",
            explanation: "Dog and park are nouns. The is an article, plays is a verb, in is a preposition.",
          },
          {
            id: "p7", type: "multiple", difficulty: "hard",
            question: '"Love" is a noun because:',
            questionCn: '"愛" 是名詞，因為：',
            options: [
              "You can hold it in your hand",
              "It names a feeling you can think about",
              "It starts with a capital letter",
              "It always has plural form",
            ],
            correctAnswer: "It names a feeling you can think about",
            explanation: "Love is an idea noun. You cannot touch it, but you can name it and feel it. That makes it a noun.",
          },
          {
            id: "p8", type: "multiple", difficulty: "hard",
            question: "Which sentence uses ALL four noun types correctly?",
            questionCn: "哪個句子正確使用了所有四種名詞類型？",
            options: [
              "Ms. Lee teaches students about love in Hong Kong.",
              "ms. Lee teaches students about love in hong kong.",
              "Ms. Lee teaches about love in hong kong.",
              "Ms. Lee teaches students about Love in Hong Kong.",
            ],
            correctAnswer: "Ms. Lee teaches students about love in Hong Kong.",
            explanation: "Ms. Lee (proper noun - person), students (common noun - people), love (idea noun), Hong Kong (proper noun - place).",
          },
        ],
      },
      // ── TAB 4: Let's Produce! ──────────────────────────────────────────────
      {
        id: "unit-4",
        title: "Let's Produce!",
        titleCn: "創意輸出！",
        type: "produce",
        stage: "production",
        duration: "8 min",
        learningObjectives: [
          { title: "Use nouns in original sentences", icon: "✍️" },
          { title: "Write with both common and proper nouns", icon: "⚖️" },
        ],
        content: {
          explanation: "AI-guided writing tasks from easy to difficult. Students write sentences using nouns they have learned, with AI coaching at each step.",
          tips: ["Start with sentence frames for reluctant writers."],
        },
        questions: [
          {
            id: "w1", type: "fill", difficulty: "easy",
            question: 'Write 2 sentences. Use ONE proper noun (a name or special place with a capital letter). Example: "Amy reads in Hong Kong."',
            questionCn: "寫 2 個句子。使用一個專有名詞（名字或特殊地名，首字母要大寫）。例如：Amy reads in Hong Kong.",
            correctAnswer: "",
            explanation: "Remember: names like Amy, Hong Kong, and Monday always start with capital letters!",
          },
          {
            id: "w2", type: "fill", difficulty: "medium",
            question: 'Write 3 sentences. Use ONE noun from EACH group: people, places, things. Example: "The teacher works in the school with books."',
            questionCn: "寫 3 個句子。每組（人物、地點、事物）各用一個名詞。例如：The teacher works in the school with books.",
            correctAnswer: "",
            explanation: "Try using different nouns each time — teacher, park, desk, friend, classroom...",
          },
          {
            id: "w3", type: "fill", difficulty: "hard",
            question: 'Write 4 sentences about a person. Include: a proper noun (name), a common noun for a person, a common noun for a place, and an idea noun (like love, happiness, music).',
            questionCn: "寫 4 個關於一個人的句子。包括：一個專有名詞（名字）、一個表示人物 的普通名詞、一個表示地點的普通名詞、和一個概念名詞（如愛、快樂、音樂）。",
            correctAnswer: "",
            explanation: "Challenge: try using all four noun types in one short paragraph!",
          },
        ],
      },
      // ── TAB 5: Quiz ────────────────────────────────────────────────────────
      {
        id: "unit-5",
        title: "Quiz",
        titleCn: "測驗",
        type: "quiz",
        stage: "assessment",
        duration: "7 min",
        questions: [
          {
            id: "q1", type: "multiple",
            question: "Which word is a noun?",
            questionCn: "哪個詞是名詞？",
            options: ["beautiful", "teacher", "quickly", "run"],
            correctAnswer: "teacher",
            explanation: "Teacher is a noun — it names a person. Beautiful is an adjective, quickly is an adverb, run is a verb.",
          },
          {
            id: "q2", type: "multiple",
            question: 'What type of noun is "love"?',
            questionCn: '"愛" 是什麼類型的名詞？',
            options: ["People", "Places", "Things", "Ideas"],
            correctAnswer: "Ideas",
            explanation: "Love is an idea noun — you can feel it and name it, but you cannot touch it.",
          },
          {
            id: "q3", type: "multiple",
            question: "Which is a proper noun?",
            questionCn: "哪個是專有名詞？",
            options: ["city", "book", "London", "teacher"],
            correctAnswer: "London",
            explanation: "London is a specific place name, so it is a proper noun and starts with a capital letter.",
          },
          {
            id: "q4", type: "multiple",
            question: "Choose the correct sentence:",
            questionCn: "選擇正確的句子：",
            options: ["amy visits the park.", "Amy visits the park.", "Amy visits Park.", "amy visits Park."],
            correctAnswer: "Amy visits the park.",
            explanation: "Amy is a proper noun (name), so it needs a capital letter. Park is a common noun here, so it stays lowercase.",
          },
          {
            id: "q5", type: "fill",
            question: 'Complete: "____ is my teacher. (mr. lee / Mr. Lee)"',
            questionCn: "完成句子。",
            correctAnswer: "Mr. Lee",
            explanation: "A persons special name is a proper noun and begins with capitals.",
            caseSensitive: true,
          },
          {
            id: "q6", type: "multiple",
            question: 'How many nouns: "The student reads a book in the library."',
            questionCn: '有多少個名詞："The student reads a book in the library."',
            options: ["1", "2", "3", "4"],
            correctAnswer: "3",
            explanation: "Student, book, and library are all nouns. The is an article, reads is a verb, in is a preposition.",
          },
        ],
      },
      // ── TAB 6: Check & Think ───────────────────────────────────────────────
      {
        id: "unit-6",
        title: "Check & Think",
        titleCn: "回顧與反思",
        type: "review",
        stage: "assessment",
        duration: "3 min",
        learningObjectives: [
          { title: "Reflect on today's learning", icon: "🤔" },
          { title: "Choose next steps", icon: "🎯" },
        ],
        content: {
          explanation: "Students review what they learned, reflect on their strengths, and choose their next learning step.",
          tips: ["Celebrate every checkbox — all four skills matter."],
        },
      },
    ],
  },

  {
    id: "1b",
    level: "1B",
    title: "Singular & Plural",
    titleCn: "One and Many",
    description: "Move from meaning to form as students learn how English nouns change from one to many.",
    descriptionCn: "從意義到形式學習英語名詞如何表達一個和多個。",
    color: "plural-blue",
    cards: 15,
    xpReward: 120,
    units: [
      {
        id: "unit-1",
        title: "Warm-up - Review Nouns + How Many",
        titleCn: "熱身：複習名詞和數量",
        type: "warmup",
        stage: "warmup",
        duration: "5 min",
        learningObjectives: [
          { title: "Review familiar nouns", icon: "🔁" },
          { title: "Connect nouns to quantity", icon: "🔢" }
        ],
        content: {
          explanation: "Students answer quick how many questions to reactivate noun meaning before plural form appears.",
          tips: ["Keep the review oral and fast so students feel the one/many contrast."]
        },
        teacherScript: oneAndManyScripts.warmup,
        activity: pluralReviewActivity,
        examples: [
          { sentence: "one pencil / three pencils", translation: "一支鉛筆 / 三支鉛筆", highlight: "pencil, pencils" }
        ]
      },
      {
        id: "unit-2",
        title: "Presentation - The Magic -s",
        titleCn: "呈現：神奇的 -s",
        type: "activity",
        stage: "presentation",
        duration: "10 min",
        learningObjectives: [
          { title: "Understand singular vs plural meaning", icon: "🎯" },
          { title: "Use regular plural forms orally", icon: "🗣️" }
        ],
        content: {
          explanation: "English often changes a noun when the meaning changes from one to many. The first regular pattern is adding -s.",
          rules: [
            "singular = one",
            "plural = two or more",
            "most nouns add -s"
          ],
          tips: ["Anchor the rule in picture pairs: one cat, two cats."]
        },
        teacherScript: oneAndManyScripts.presentation,
        activity: magicSActivity,
        rulesWithExamples: [
          {
            rule: "Most nouns add -s",
            category: "core",
            mnemonic: "One to many often needs -s.",
            examples: [
              { sentence: "cat -> cats", translation: "貓 -> 多隻貓", highlight: "cat, cats" },
              { sentence: "book -> books", translation: "書 -> 多本書", highlight: "book, books" }
            ]
          },
          {
            rule: "Plural meaning changes the noun form",
            category: "core",
            examples: [
              { sentence: "one pen / two pens", translation: "一支筆 / 兩支筆", highlight: "pen, pens" }
            ]
          }
        ]
      },
      {
        id: "unit-3",
        title: "Guided - -s vs -es Sound Game",
        titleCn: "指導練習：-s 與 -es 發音遊戲",
        type: "activity",
        stage: "guided-practice",
        duration: "10 min",
        learningObjectives: [
          { title: "Hear common plural sound patterns", icon: "👂" },
          { title: "Link sound and spelling", icon: "🔤" }
        ],
        content: {
          explanation: "Students listen to plural nouns and match them to the sound pattern they hear in a bingo-style game.",
          tips: ["Have the whole class repeat each plural after every bingo mark."]
        },
        teacherScript: oneAndManyScripts.guidedPractice,
        activity: soundBingoActivity,
        rulesWithExamples: [
          {
            rule: "Many nouns still use -s in writing",
            category: "core",
            examples: [
              { sentence: "cats, books", translation: "貓，多本書", highlight: "cats, books" }
            ]
          },
          {
            rule: "Words ending in s, x, ch, sh often add -es",
            category: "core",
            mnemonic: "Hissing endings often need -es.",
            examples: [
              { sentence: "buses, boxes, watches, dishes", translation: "公交車，盒子，手表，盤子", highlight: "buses, boxes, watches, dishes" }
            ]
          }
        ]
      },
      {
        id: "unit-4",
        title: "Discovery - Irregular Plurals",
        titleCn: "發現：不規則複數",
        type: "activity",
        stage: "discovery",
        duration: "10 min",
        learningObjectives: [
          { title: "Notice irregular plural changes", icon: "🔎" },
          { title: "Remember common plural pairs", icon: "🧠" }
        ],
        content: {
          explanation: "Students compare singular/plural pairs and discover that some nouns do not simply add -s.",
          tips: ["Collect student observations before giving the label irregular plural."]
        },
        teacherScript: oneAndManyScripts.discovery,
        activity: irregularPluralActivity,
        rulesWithExamples: [
          {
            rule: "Some plurals change inside the word",
            category: "core",
            mnemonic: "Not every plural adds -s.",
            examples: [
              { sentence: "man -> men", translation: "男人 -> 男人們", highlight: "man, men" },
              { sentence: "foot -> feet", translation: "腳 -> 腳", highlight: "foot, feet" }
            ]
          },
          {
            rule: "Some words have unique plural forms",
            category: "special",
            examples: [
              { sentence: "child -> children", translation: "孩子 -> 孩子們", highlight: "child, children" },
              { sentence: "mouse -> mice", translation: "老鼠 -> 老鼠們", highlight: "mouse, mice" }
            ]
          }
        ]
      },
      {
        id: "unit-5",
        title: "Production - My Classroom Description",
        titleCn: "輸出：描述我的教室",
        type: "activity",
        stage: "production",
        duration: "8 min",
        learningObjectives: [
          { title: "Use singular and plural nouns in context", icon: "✍️" },
          { title: "Describe a real classroom", icon: "🏫" }
        ],
        content: {
          explanation: "Students describe the classroom with at least one singular noun and two plural nouns.",
          tips: ["Push students to look up from the frame and use their real classroom."]
        },
        teacherScript: oneAndManyScripts.production,
        activity: classroomDescriptionActivity,
        examples: [
          { sentence: "There is one board.", translation: "有一塊黑板。", highlight: "board" },
          { sentence: "There are many desks.", translation: "有很多桌子。", highlight: "desks" }
        ]
      },
      {
        id: "unit-6",
        title: "Quiz",
        titleCn: "測驗",
        type: "quiz",
        stage: "assessment",
        duration: "7 min",
        questions: [
          {
            id: "q1",
            type: "multiple",
            question: 'What is the plural of "box"?',
            questionCn: "box 的複數是什麼？",
            options: ["boxs", "boxes", "boxeses", "box"],
            correctAnswer: "boxes",
            explanation: "Words ending in x usually add -es."
          },
          {
            id: "q2",
            type: "multiple",
            question: 'What is the plural of "child"?',
            questionCn: "child 的複數是什麼？",
            options: ["childs", "childes", "children", "child"],
            correctAnswer: "children",
            explanation: "Child is irregular, so it changes to children."
          },
          {
            id: "q3",
            type: "multiple",
            question: "Choose the best sentence.",
            questionCn: "选择正確的句子。",
            options: [
              "There are two watch on the desk.",
              "There are two watches on the desk.",
              "There is two watches on the desk.",
              "There are two watchs on the desk."
            ],
            correctAnswer: "There are two watches on the desk.",
            explanation: "Watch takes -es in the plural, and the verb agrees with the plural noun."
          },
          {
            id: "q4",
            type: "fill",
            question: 'Complete: "One foot, two ____."',
            questionCn: "完成句子。",
            correctAnswer: "feet",
            explanation: "Foot is an irregular plural. It changes to feet."
          }
        ]
      }
    ]
  },
  {
    id: "1c",
    level: "1C",
    title: "Countable & Uncountable",
    titleCn: "Can We Count It?",
    description: "Teach countability through concrete problems, sorting, roleplay, and home-based production.",
    descriptionCn: "透過具體情境、分類和角色扮演學習可數與不可數名詞。",
    color: "countable-purple",
    cards: 10,
    xpReward: 100,
    units: [
      {
        id: "unit-1",
        title: "Warm-up - Review Plurals",
        titleCn: "熱身：複習複數",
        type: "warmup",
        stage: "warmup",
        duration: "5 min",
        learningObjectives: [
          { title: "Recall regular and irregular plurals", icon: "🔁" },
          { title: "Prepare for a new counting problem", icon: "🤔" }
        ],
        content: {
          explanation: "Students review plural forms quickly, then notice that some words do not fit the simple counting pattern.",
          tips: ["Include one tricky noun like water to create curiosity."]
        },
        teacherScript: canWeCountItScripts.warmup,
        activity: countableReviewActivity
      },
      {
        id: "unit-2",
        title: "Presentation - The Water Problem",
        titleCn: "呈現：水的問題",
        type: "activity",
        stage: "presentation",
        duration: "10 min",
        learningObjectives: [
          { title: "Understand countable vs uncountable meaning", icon: "💡" },
          { title: "Use a real-world example to notice the contrast", icon: "💧" }
        ],
        content: {
          explanation: "Students compare apples with water to see why some nouns can be counted directly and some cannot.",
          rules: [
            "countable nouns can use one, two, three...",
            "uncountable nouns are measured, not counted directly"
          ],
          tips: ["Keep returning to the apple/water contrast to anchor meaning."]
        },
        teacherScript: canWeCountItScripts.presentation,
        activity: waterProblemActivity,
        rulesWithExamples: [
          {
            rule: "Countable nouns can take numbers and plural forms",
            category: "core",
            mnemonic: "If you can say one and two, it is usually countable.",
            examples: [
              { sentence: "one apple / two apples", translation: "一個蘋果 / 兩個蘋果", highlight: "apple, apples" },
              { sentence: "one chair / three chairs", translation: "一把椅子 / 三把椅子", highlight: "chair, chairs" }
            ]
          },
          {
            rule: "Uncountable nouns need measurement or quantity words",
            category: "core",
            examples: [
              { sentence: "some water", translation: "一些水", highlight: "water" },
              { sentence: "much rice", translation: "很多米飯", highlight: "rice" }
            ]
          }
        ]
      },
      {
        id: "unit-3",
        title: "Discovery - Countable vs Uncountable",
        titleCn: "發現：可數與不可數",
        type: "activity",
        stage: "discovery",
        duration: "10 min",
        learningObjectives: [
          { title: "Sort nouns by countability", icon: "🗂️" },
          { title: "Explain the reason for each choice", icon: "💬" }
        ],
        content: {
          explanation: "Students sort noun cards and test them with one/two or much/some to discover the countability rule.",
          tips: ["Ask students to say the test phrase aloud when they are unsure."]
        },
        teacherScript: canWeCountItScripts.discovery,
        activity: countabilitySortActivity,
        rulesWithExamples: [
          {
            rule: "Countable nouns work with many",
            category: "core",
            examples: [
              { sentence: "many eggs, many bananas", translation: "很多雞蛋，很多香蕉", highlight: "many eggs, many bananas" }
            ]
          },
          {
            rule: "Uncountable nouns work with much or some",
            category: "core",
            examples: [
              { sentence: "much milk, some homework", translation: "很多牛奶，一些作業", highlight: "much milk, some homework" }
            ]
          }
        ]
      },
      {
        id: "unit-4",
        title: "Guided - Much vs Many",
        titleCn: "指導練習：much 與 many",
        type: "activity",
        stage: "guided-practice",
        duration: "10 min",
        learningObjectives: [
          { title: "Choose much or many accurately", icon: "🛒" },
          { title: "Ask short roleplay questions", icon: "🎭" }
        ],
        content: {
          explanation: "Students roleplay customer and shopkeeper to practice much and many in a meaningful exchange.",
          rules: [
            "many + countable plural noun",
            "much + uncountable noun"
          ],
          tips: ["Keep the nouns concrete at first: apples, eggs, rice, milk."]
        },
        teacherScript: canWeCountItScripts.guidedPractice,
        activity: muchManyRoleplayActivity,
        rulesWithExamples: [
          {
            rule: "Use many for countable plural nouns",
            category: "core",
            mnemonic: "many + things you can count",
            examples: [
              { sentence: "How many apples do you need?", translation: "你需要多少蘋果？", highlight: "many apples" }
            ]
          },
          {
            rule: "Use much for uncountable nouns",
            category: "core",
            mnemonic: "much + things you measure",
            examples: [
              { sentence: "How much rice do you need?", translation: "你需要多少米飯？", highlight: "much rice" }
            ]
          }
        ]
      },
      {
        id: "unit-5",
        title: "Production - My Kitchen",
        titleCn: "輸出：我的廚房",
        type: "activity",
        stage: "production",
        duration: "8 min",
        learningObjectives: [
          { title: "Describe a familiar home scene", icon: "🏠" },
          { title: "Use both noun types in connected output", icon: "✍️" }
        ],
        content: {
          explanation: "Students describe what is in their kitchen, mixing countable and uncountable nouns in short connected sentences.",
          tips: ["Require at least one sentence with many and one with much or some."]
        },
        teacherScript: canWeCountItScripts.production,
        activity: kitchenProductionActivity,
        examples: [
          { sentence: "There are many plates in my kitchen.", translation: "我的廚房里有很多盤子。", highlight: "many plates" },
          { sentence: "There is some rice in the jar.", translation: "罐子里有一些米飯。", highlight: "some rice" }
        ]
      },
      {
        id: "unit-6",
        title: "Quiz",
        titleCn: "測驗",
        type: "quiz",
        stage: "assessment",
        duration: "7 min",
        questions: [
          {
            id: "q1",
            type: "multiple",
            question: "Which noun is uncountable?",
            questionCn: "哪個名詞是不可數名詞？",
            options: ["apple", "rice", "egg", "chair"],
            correctAnswer: "rice",
            explanation: "Rice is usually treated as an uncountable noun."
          },
          {
            id: "q2",
            type: "multiple",
            question: 'Complete: "How ____ oranges do you need?"',
            questionCn: "完成句子。",
            options: ["much", "many", "some", "little"],
            correctAnswer: "many",
            explanation: "Oranges are countable plural nouns, so we use many."
          },
          {
            id: "q3",
            type: "multiple",
            question: 'Choose the best sentence.',
            questionCn: "选择正確的句子。",
            options: [
              "There is many milk in the fridge.",
              "There are much eggs on the table.",
              "There is some milk in the fridge.",
              "There are some rice on the table."
            ],
            correctAnswer: "There is some milk in the fridge.",
            explanation: "Milk is uncountable, so some or much can be used with a singular verb."
          },
          {
            id: "q4",
            type: "fill",
            question: 'Complete: "How ____ homework do you have?"',
            questionCn: "完成句子。",
            correctAnswer: "much",
            explanation: "Homework is uncountable, so we use much."
          }
        ]
      }
    ]
  },
  {
    id: "1d",
    level: "1D",
    title: "Writing Workshop",
    titleCn: "Writing Workshop",
    description: "Apply everything you learned in 1a-1c to write a complete article. Generate a personalized poster showcasing your writing journey.",
    descriptionCn: "Apply everything you learned in 1a-1c to write a complete article. Generate a personalized poster showcasing your writing journey.",
    color: "writing-pink",
    cards: 20,
    xpReward: 150,
    units: [
      {
        id: "unit-1",
        title: "Review: Nouns",
        titleCn: "Review: Nouns",
        type: "teach",
        content: {
          explanation: "Let's review what we learned in Lesson 1a. Nouns name people, places, things, or ideas. Common nouns are general (dog, city), while proper nouns are specific (Mary, Tokyo) and always capitalized.",
          rules: [
            "Common nouns: general things, not capitalized (dog, school, teacher)",
            "Proper nouns: specific names, always capitalized (Mary, Tokyo, Christmas)",
            "Nouns can be subjects or objects in sentences"
          ],
          tips: ['Remember: "the one and only" = proper noun = capitalize!']
        },
        examples: [
          { sentence: "The teacher lives in Tokyo.", translation: "The teacher lives in Tokyo.", highlight: "teacher, Tokyo" },
          { sentence: "Mary loves her dog.", translation: "Mary loves her dog.", highlight: "Mary, dog" }
        ]
      },
      {
        id: "unit-2",
        title: "Review: Singular & Plural",
        titleCn: "Review: Singular & Plural",
        type: "teach",
        content: {
          explanation: "From Lesson 1b: Singular = one, Plural = two or more. Regular plurals add -s/-es, but some nouns are irregular (child -> children, foot -> feet).",
          rules: [
            "Regular: add -s (cat -> cats) or -es for s, x, ch, sh endings (box -> boxes)",
            "Consonant + y -> i+es (baby -> babies)",
            "Irregular: man -> men, woman -> women, child -> children, foot -> feet"
          ],
          tips: ['Say it out loud: "one cat, two cats" - if it sounds right, it probably is!']
        },
        examples: [
          { sentence: "I have three books and two boxes.", translation: "I have three books and two boxes.", highlight: "books, boxes" },
          { sentence: "The children are playing with their toys.", translation: "The children are playing with their toys.", highlight: "children, toys" }
        ]
      },
      {
        id: "unit-3",
        title: "Review: Countable & Uncountable",
        titleCn: "Review: Countable & Uncountable",
        type: "teach",
        content: {
          explanation: "From Lesson 1c: Countable nouns can be counted (one apple, two apples). Uncountable nouns cannot (water, rice, information) and use much/little instead of many/few.",
          rules: [
            "Countable: can use numbers, have plural forms (apple -> apples)",
            "Uncountable: liquids, abstract concepts, no plural (water, advice, love)",
            "Use many/few for countable, much/little for uncountable"
          ],
          tips: ['Can you count "one, two, three" of it? If yes, it\'s countable!']
        },
        examples: [
          { sentence: "How many apples do you have?", translation: "How many apples do you have?", highlight: "apples" },
          { sentence: "I need some water and rice.", translation: "I need some water and rice.", highlight: "water, rice" }
        ]
      },
      {
        id: "unit-4",
        title: "Your Writing Task",
        titleCn: "Your Writing Task",
        type: "practice",
        content: {
          explanation: "Now it's your turn to write! Use everything you've learned about nouns, plurals, and countable/uncountable nouns to complete this writing task.",
          rules: [
            'Write 5-8 sentences about "My Daily Life"',
            "Include at least 3 proper nouns (names, places)",
            "Use both singular and plural nouns correctly",
            "Include at least 2 uncountable nouns (water, rice, time, etc.)"
          ],
          tips: ["Check your work: Are proper nouns capitalized? Are plurals formed correctly?"]
        }
      },
      {
        id: "unit-5",
        title: "Write Your Article",
        titleCn: "Write Your Article",
        type: "quiz",
        questions: [
          {
            id: "writing-task",
            type: "fill",
            question: 'Write your article about "My Daily Life" here (5-8 sentences):\n\nRemember to:\n- Use proper nouns (names, places) with capital letters\n- Use singular and plural nouns correctly\n- Include uncountable nouns like water, rice, time, love, etc.\n\nYour article:',
            questionCn: 'Write your article about "My Daily Life"',
            correctAnswer: "",
            explanation: "Great job! Your writing will be featured on your achievement poster!"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    level: "2",
    title: "Articles",
    titleCn: "Articles",
    description: "Master the use of a, an, and the.",
    descriptionCn: "Master the use of a, an, and the.",
    color: "article-green",
    cards: 8,
    xpReward: 100,
    units: [
      {
        id: "unit-1",
        title: "What are Articles?",
        titleCn: "What are Articles?",
        type: "teach",
        content: {
          explanation: 'Articles are small words placed before nouns to indicate specificity. English has three articles: a, an, and the.',
          rules: [
            'a / an = indefinite article, means "one"',
            'the = definite article, means "that specific one"',
            'a is used before consonant sounds: a book, a cat',
            'an is used before vowel sounds: an apple, an hour'
          ],
          tips: ['Remember: a/an means "one," the means "that one"!']
        },
        examples: [
          { sentence: "I saw a cat.", translation: "I saw a cat.", highlight: "a cat" },
          { sentence: "The cat was black.", translation: "The cat was black.", highlight: "The cat" }
        ]
      },
      {
        id: "unit-2",
        title: "A vs An",
        titleCn: "A vs An",
        type: "teach",
        content: {
          explanation: `Both a and an are indefinite articles with the same meaning, but they're used differently. The choice depends on the "sound" that follows, not the spelling.`,
          rules: [
            "a + consonant sound: a book, a university",
            "an + vowel sound: an apple, an hour",
            "Focus on pronunciation, not spelling!"
          ],
          tips: ['Say the word out loud. If it starts with a vowel sound, use "an"!']
        },
        examples: [
          { sentence: "a book, a car, a university", translation: "a book, a car, a university", highlight: "" },
          { sentence: "an apple, an egg, an hour", translation: "an apple, an egg, an hour", highlight: "" }
        ]
      },
      {
        id: "unit-3",
        title: "Practice Quiz",
        titleCn: "Practice Quiz",
        type: "quiz",
        questions: [
          {
            id: "q1",
            type: "multiple",
            question: 'Complete: "I have ____ apple."',
            questionCn: "Complete the sentence",
            options: ["a", "an", "the", "—"],
            correctAnswer: "an",
            explanation: '"Apple" starts with a vowel sound, so we use "an."'
          },
          {
            id: "q2",
            type: "multiple",
            question: 'Complete: "He is ____ honest man."',
            questionCn: "Complete the sentence",
            options: ["a", "an", "the", "—"],
            correctAnswer: "an",
            explanation: 'The "h" in "honest" is silent, so it starts with a vowel sound. Use "an."'
          },
          {
            id: "q3",
            type: "fill",
            question: 'Complete: "She is ____ university student."',
            questionCn: "Complete the sentence",
            correctAnswer: "a",
            explanation: '"University" starts with a consonant sound /j/, so we use "a."'
          }
        ]
      }
    ]
  }
];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonProgress(lessonId: string): number {
  const progressMap: Record<string, number> = {
    "1a": 100,
    "1b": 100,
    "1c": 100,
    "1d": 100,
    "2": 100
  };

  return progressMap[lessonId] || 0;
}

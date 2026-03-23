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
    description: "Build noun meaning through movement, discovery, classification, and sentence production.",
    descriptionCn: "透過動作、發現和分類建立名詞概念。",
    color: "noun-brown",
    cards: 12,
    xpReward: 100,
    units: [
      {
        id: "unit-1",
        title: "Warm-up - I Spy Game",
        titleCn: "熱身：I Spy 遊戲",
        type: "warmup",
        stage: "warmup",
        duration: "5 min",
        learningObjectives: [
          { title: "Notice naming words in the classroom", icon: "👀" },
          { title: "Respond physically before speaking", icon: "🖐️" }
        ],
        content: {
          explanation: "Students begin with meaningful classroom clues. They move first, then say the noun they found.",
          tips: ["Keep the pace quick so students rely on meaning, not translation."]
        },
        teacherScript: nounAdventureScripts.warmup,
        activity: nounISpyActivity,
        examples: [
          { sentence: "It is a book.", translation: "它是一本書。", highlight: "book" },
          { sentence: "That is the teacher.", translation: "那是老師。", highlight: "teacher" }
        ]
      },
      {
        id: "unit-2",
        title: "Presentation - What is a Noun?",
        titleCn: "呈現：什麼是名詞？",
        type: "activity",
        stage: "presentation",
        duration: "10 min",
        learningObjectives: [
          { title: "Understand the meaning of noun", icon: "🎯" },
          { title: "Connect noun groups to TPR actions", icon: "🕺" }
        ],
        content: {
          explanation: "A noun is a naming word. It can name a person, place, thing, or idea. Students attach each category to a clear action.",
          rules: [
            "noun = naming word",
            "person, place, thing, idea are all noun groups"
          ],
          tips: ["Model the gesture first, then say the noun group clearly."]
        },
        teacherScript: nounAdventureScripts.presentation,
        activity: nounTprActivity,
        rulesWithExamples: [
          {
            rule: "Nouns name people",
            category: "core",
            mnemonic: "Who is it? That answer is often a noun.",
            examples: [
              { sentence: "teacher", translation: "老師", highlight: "teacher" },
              { sentence: "doctor", translation: "醫生", highlight: "doctor" }
            ]
          },
          {
            rule: "Nouns name places and things",
            category: "core",
            examples: [
              { sentence: "school, park", translation: "學校，公園", highlight: "school, park" },
              { sentence: "book, pencil", translation: "書，鉛筆", highlight: "book, pencil" }
            ]
          },
          {
            rule: "Some nouns name ideas",
            category: "special",
            mnemonic: "You cannot touch an idea, but you can name it.",
            examples: [
              { sentence: "love, joy", translation: "愛，快樂", highlight: "love, joy" }
            ]
          }
        ]
      },
      {
        id: "unit-3",
        title: "Discovery - People, Places, Things, Ideas",
        titleCn: "發現：人物、地點、事物、想法",
        type: "activity",
        stage: "discovery",
        duration: "10 min",
        learningObjectives: [
          { title: "Sort nouns by meaning", icon: "🗂️" },
          { title: "Explain category choices", icon: "💬" }
        ],
        content: {
          explanation: "Students discover the four noun groups by sorting examples and explaining their reasoning.",
          tips: ["Prompt with why questions so students verbalize the pattern."]
        },
        teacherScript: nounAdventureScripts.discovery,
        activity: nounDiscoveryActivity,
        rulesWithExamples: [
          {
            rule: "People nouns answer who",
            category: "core",
            examples: [
              { sentence: "mother, teacher, friend", translation: "媽媽，老師，朋友", highlight: "mother, teacher, friend" }
            ]
          },
          {
            rule: "Place and thing nouns answer where or what",
            category: "core",
            examples: [
              { sentence: "library, city, desk, ball", translation: "圖書馆，城市，桌子，球", highlight: "library, city, desk, ball" }
            ]
          },
          {
            rule: "Idea nouns cannot be touched",
            category: "special",
            examples: [
              { sentence: "kindness, hope, music", translation: "善良，希望，音樂", highlight: "kindness, hope, music" }
            ]
          }
        ]
      },
      {
        id: "unit-4",
        title: "Guided Practice - Common vs Proper",
        titleCn: "指導練習：普通名詞與專有名詞",
        type: "activity",
        stage: "guided-practice",
        duration: "10 min",
        learningObjectives: [
          { title: "Tell general nouns from special names", icon: "🏷️" },
          { title: "Capitalize proper nouns", icon: "🔠" }
        ],
        content: {
          explanation: "Students sort nouns into common and proper categories with teacher guidance and immediate feedback.",
          rules: [
            "common noun = general person, place, or thing",
            "proper noun = special name and starts with a capital letter"
          ],
          tips: ["Use paired examples such as city / Shanghai to keep the contrast concrete."]
        },
        teacherScript: nounAdventureScripts.guidedPractice,
        activity: nounClassificationActivity,
        rulesWithExamples: [
          {
            rule: "Common nouns are general words",
            category: "core",
            mnemonic: "General = common",
            examples: [
              { sentence: "city, teacher, dog", translation: "城市，老師，狗", highlight: "city, teacher, dog" }
            ]
          },
          {
            rule: "Proper nouns are special names",
            category: "core",
            mnemonic: "Special name = capital letter",
            examples: [
              { sentence: "Shanghai, Ms. Wang, China", translation: "上海，王老師，中國", highlight: "Shanghai, Ms. Wang, China" }
            ]
          }
        ]
      },
      {
        id: "unit-5",
        title: "Production - Use Nouns in Sentences",
        titleCn: "輸出：用名詞造句",
        type: "activity",
        stage: "production",
        duration: "8 min",
        learningObjectives: [
          { title: "Use nouns in original sentences", icon: "✍️" },
          { title: "Edit capitalization independently", icon: "✅" }
        ],
        content: {
          explanation: "Students combine noun cards into simple original sentences and refine them with a partner.",
          tips: ["Offer one sentence frame, then invite students to leave the frame when ready."]
        },
        teacherScript: nounAdventureScripts.production,
        activity: nounSentenceActivity,
        examples: [
          { sentence: "Amy reads a book in Beijing.", translation: "Amy 在北京讀書。", highlight: "Amy, book, Beijing" },
          { sentence: "The teacher visits the park.", translation: "老師去公園。", highlight: "teacher, park" }
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
            question: "Which word is a noun idea?",
            questionCn: "哪個詞是表示想法的名詞？",
            options: ["desk", "teacher", "love", "park"],
            correctAnswer: "love",
            explanation: "Love is an idea noun because you can name it, but you cannot touch it."
          },
          {
            id: "q2",
            type: "multiple",
            question: "Which word is a proper noun?",
            questionCn: "哪個詞是專有名詞？",
            options: ["city", "book", "London", "teacher"],
            correctAnswer: "London",
            explanation: "London is a specific place name, so it is a proper noun."
          },
          {
            id: "q3",
            type: "multiple",
            question: "Choose the best sentence.",
            questionCn: "选择正確的句子。",
            options: ["amy visits the park.", "Amy visits the park.", "Amy visits Park.", "amy visits Park."],
            correctAnswer: "Amy visits the park.",
            explanation: "Amy is a proper noun, so it needs a capital letter. Park is common here, so it stays lowercase."
          },
          {
            id: "q4",
            type: "fill",
            question: 'Complete: "____ is my teacher. (mr. lee / Mr. Lee)"',
            questionCn: "完成句子。",
            correctAnswer: "Mr. Lee",
            explanation: "A person's special name is a proper noun and begins with capitals.",
            caseSensitive: true
          }
        ]
      }
    ]
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

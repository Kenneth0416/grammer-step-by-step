/**
 * Lesson Scripts - 教師教學腳本
 * 每個 Unit 包含 warmup, presentation, guided practice 等環節的教師臺詞
 */

export interface TeacherScript {
  opening: string;        // 開場白
  instructions: string;    // 給學生的指示
  modelAnswers: string[];  // 示範答案
  transition: string;     // 環節過渡語
  encouragement: string;  // 鼓勵語
}

export interface UnitScript {
  warmup: {
    script: string;
    purpose: string;
    duration: string;
    cues: string[];
  };
  presentation: TeacherScript;
  guided: TeacherScript;
  production: TeacherScript;
}

export const lessonScripts = {
  '1a': {
    warmup: {
      script: "Class, look around the classroom! What can you see? I see something... I see a BOARD! What do you see?",
      purpose: "啟動已有知識，引出名詞概念",
      duration: "5min",
      cues: [
        "Point to different items as you speak",
        "Make eye contact with students as you ask questions",
        "Accept all answers enthusiastically"
      ]
    },
    presentation: {
      opening: "Class, today we are going to learn about a very important word type: NOUNS!",
      instructions: "A noun is a word that names something. Let me show you...",
      modelAnswers: [
        "Teacher: I am a teacher. 'Teacher' is a noun.",
        "This is a book. 'Book' is a noun.",
        "We are in a school. 'School' is a noun."
      ],
      transition: "Now you know what nouns are. Let's learn about two special types!",
      encouragement: "Excellent! You are finding nouns like real detectives!"
    },
    guidedPractice: {
      opening: "Now, let's practice together! I will say a word, and you tell me: Is it a noun?",
      instructions: "Look at the picture. Can you find the nouns? Point and say!",
      modelAnswers: [
        "Student: I see a dog!",
        "Teacher: Good! 'Dog' is a noun. What noun do you see?"
      ],
      transition: "Amazing! You can identify nouns. Now, let's discover something special...",
      encouragement: "Perfect! You are becoming noun experts!"
    },
    discovery: {
      opening: "Let's discover the four noun groups together!",
      instructions: "Sort these words: teacher, school, love, city. Can you find the pattern?",
      modelAnswers: [
        "People: teacher",
        "Places: school, city",
        "Ideas: love"
      ],
      transition: "Excellent discovery! Now let's learn the special names...",
      encouragement: "Fantastic detective work!"
    },
    production: {
      opening: "Now it's your turn to be the teacher! Make sentences with nouns.",
      instructions: "Use this picture. Say a complete sentence with at least TWO nouns.",
      modelAnswers: [
        "The boy has a ball.",
        "A girl is reading a book in the park."
      ],
      transition: "Wonderful sentences! Let's review what we learned today.",
      encouragement: "Fantastic work! You are true noun masters!"
    }
  },

  '1b': {
    warmup: {
      script: "Class, what did we learn yesterday? That's right - NOUNS! Today we'll learn something new about nouns. How many eyes do you have? How many ears?",
      purpose: "複習名詞概念，引出數量概念",
      duration: "5min",
      cues: [
        "Use gestures: hold up fingers for numbers",
        "Make it interactive - ask individual students",
        "Build anticipation for the new topic"
      ]
    },
    presentation: {
      opening: "Class, nouns can tell us HOW MANY! Look: one book... two books! The -s makes it more than one!",
      instructions: "When we want to say 'more than one', we add -s to most nouns.",
      modelAnswers: [
        "one cat → two cats",
        "one dog → two dogs",
        "one book → three books"
      ],
      transition: "But wait! Some words are tricky. They don't follow the -s rule...",
      encouragement: "Great listening! You're ready to discover the magic -s!"
    },
    guidedPractice: {
      opening: "Let's practice the -s together! I'll hold up a card, you say the plural!",
      instructions: "Remember: most words add -s. But some special words add -es!",
      modelAnswers: [
        "box → boxes (ends in x, so add -es!)",
        "bus → buses (ends in s, so add -es!)",
        "watch → watches (ends in ch, so add -es!)"
      ],
      transition: "Now for the really tricky ones - irregular plurals!",
      encouragement: "Wow! You're getting the -s magic!"
    },
    discovery: {
      opening: "Time to be word detectives! Some words do NOT add -s.",
      instructions: "Look at these pairs. What do you notice?",
      modelAnswers: [
        "man → men (not mans!)",
        "child → children (not childs!)",
        "foot → feet (not foots!)"
      ],
      transition: "These are called 'irregular plurals'. We just remember them!",
      encouragement: "Amazing! You're discovering the secrets of English!"
    },
    production: {
      opening: "Time to be plural detectives! Look around the classroom and tell me plurals!",
      instructions: "Find things in our classroom. Say the singular and the plural!",
      modelAnswers: [
        "I see one chair... I see three chairs!",
        "One pencil → many pencils"
      ],
      transition: "Excellent plural power! Let's test your skills!",
      encouragement: "Incredible! You are plural champions!"
    }
  },

  '1c': {
    warmup: {
      script: "Class, quick question: How many cats can you see? Great! Now... how many water can you see? Wait... that's different, isn't it?",
      purpose: "引出可數/不可數的概念衝突",
      duration: "5min",
      cues: [
        "Create genuine confusion - it's intentional!",
        "Let students notice the difference",
        "Build suspense for the lesson"
      ]
    },
    presentation: {
      opening: "Great question, right? SOME things we can count: one apple, two apples! But OTHER things... we cannot count like this. Why not? Let's find out!",
      instructions: "Countable nouns: things we can count one, two, three! Uncountable nouns: liquids, ideas... we cannot separate them into numbers.",
      modelAnswers: [
        "Countable: one apple, two apples, three apples",
        "Uncountable: water, rice, love, information"
      ],
      transition: "Now let's practice identifying them!",
      encouragement: "Brilliant deduction! You're understanding a big grammar idea!"
    },
    guidedPractice: {
      opening: "Let's sort these words together! Is it countable or uncountable?",
      instructions: "Remember: if you can say 'one, two, three', it's countable! If not... it's uncountable!",
      modelAnswers: [
        "apple - countable! We can say 'one apple, two apples'",
        "water - uncountable! We cannot say 'one water, two waters'"
      ],
      transition: "Now let's use much and many - the special words for uncountable and countable!",
      encouragement: "Perfect sorting! You're becoming grammar wizards!"
    },
    discovery: {
      opening: "Let's discover how much and many work!",
      instructions: "Look at the sentences. When do we use MUCH? When do we use MANY?",
      modelAnswers: [
        "many apples (countable!)",
        "much water (uncountable!)",
        "many books (countable!)",
        "much rice (uncountable!)"
      ],
      transition: "Now let's practice in a real situation...",
      encouragement: "Excellent! You're mastering countable and uncountable!"
    },
    production: {
      opening: "Imagine you're in a restaurant! Order food using much and many correctly!",
      instructions: "Say: 'I would like some... (use much for uncountable, many for countable)'",
      modelAnswers: [
        "I would like much water, please.",
        "I would like many apples, please."
      ],
      transition: "Excellent restaurant skills! Let's do the final quiz!",
      encouragement: "Superstar! You understand countable and uncountable nouns!"
    }
  }
};

export type LessonScriptKey = keyof typeof lessonScripts;

// ==================== NAMED EXPORTS FOR LESSON INTEGRATION ====================
// These exports match the imports in lessons.ts

export const nounAdventureScripts = lessonScripts['1a'];
export const oneAndManyScripts = lessonScripts['1b'];
export const canWeCountItScripts = lessonScripts['1c'];

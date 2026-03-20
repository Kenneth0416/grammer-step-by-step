export interface LessonUnit {
  id: string;
  title: string;
  titleCn: string;
  type: 'teach' | 'video' | 'examples' | 'practice' | 'quiz';
  videoUrl?: string;
  videoDuration?: string;
  content?: {
    explanation: string;
    rules?: string[];
    tips?: string[];
  };
  examples?: {
    sentence: string;
    translation: string;
    highlight?: string;
  }[];
  questions?: {
    id: string;
    type: 'multiple' | 'fill' | 'drag';
    question: string;
    questionCn: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
    caseSensitive?: boolean;
  }[];
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

export const lessons: Lesson[] = [
  {
    id: '1a',
    level: '1A',
    title: 'Common & Proper Nouns',
    titleCn: 'Common & Proper Nouns',
    description: 'Learn the difference between common nouns and proper nouns.',
    descriptionCn: 'Learn the difference between common nouns and proper nouns.',
    color: 'noun-brown',
    cards: 12,
    xpReward: 100,
    units: [
      {
        id: 'unit-1',
        title: 'What is a Noun?',
        titleCn: 'What is a Noun?',
        type: 'teach',
        content: {
          explanation: 'A noun is a word that names a person, place, thing, or idea. Nouns are essential building blocks of sentences, often serving as subjects or objects.',
          rules: [
            'Nouns can name people: teacher, Mary, doctor',
            'Nouns can name places: school, Tokyo, home',
            'Nouns can name things: book, apple, computer',
            'Nouns can name ideas: happiness, love, freedom'
          ],
          tips: ['To check if a word is a noun, try putting "The" or "A" before it. If it makes sense, it\'s likely a noun!']
        },
        examples: [
          { sentence: 'The dog is sleeping.', translation: 'The dog is sleeping.', highlight: 'dog' },
          { sentence: 'I live in Tokyo.', translation: 'I live in Tokyo.', highlight: 'Tokyo' }
        ]
      },
      {
        id: 'unit-1-video',
        title: 'Video: Understanding Nouns',
        titleCn: 'Video: Understanding Nouns',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=5o5MJAWsJSE',
        videoDuration: '3:45',
        content: {
          explanation: 'Watch this video to see real-world examples of nouns and how they are used in everyday English.'
        }
      },
      {
        id: 'unit-2',
        title: 'Common Nouns',
        titleCn: 'Common Nouns',
        type: 'teach',
        content: {
          explanation: 'A common noun names general people, places, or things. Common nouns are not capitalized unless they begin a sentence.',
          rules: [
            'Common nouns refer to general things, not specific ones',
            'They are not capitalized (except at sentence start)',
            'They can usually be preceded by articles (a/an/the)'
          ],
          tips: ['Common nouns are like "a kind of" thing, not "this specific" thing.']
        },
        examples: [
          { sentence: 'I saw a dog in the park.', translation: 'I saw a dog in the park.', highlight: 'dog, park' },
          { sentence: 'She is a teacher at a school.', translation: 'She is a teacher at a school.', highlight: 'teacher, school' }
        ]
      },
      {
        id: 'unit-3',
        title: 'Proper Nouns',
        titleCn: 'Proper Nouns',
        type: 'teach',
        content: {
          explanation: 'A proper noun names a specific person, place, or thing. Proper nouns always begin with a capital letter.',
          rules: [
            'Names of people: Mary, John, Dr. Smith',
            'Names of places: London, Asia, Mount Fuji',
            'Brand names: Apple, Nike, McDonald\'s',
            'Holidays, months, days: Christmas, January, Monday'
          ],
          tips: ['If the name refers to "the one and only" person or place, it\'s a proper noun.']
        },
        examples: [
          { sentence: 'Mary lives in London.', translation: 'Mary lives in London.', highlight: 'Mary, London' },
          { sentence: 'I love Christmas!', translation: 'I love Christmas!', highlight: 'Christmas' }
        ]
      },
      {
        id: 'unit-4',
        title: 'Practice Quiz',
        titleCn: 'Practice Quiz',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            type: 'multiple',
            question: 'Which word is a common noun?',
            questionCn: 'Which word is a common noun?',
            options: ['London', 'dog', 'Monday', 'Apple'],
            correctAnswer: 'dog',
            explanation: '"dog" is a common noun - it refers to dogs in general, not a specific dog.'
          },
          {
            id: 'q2',
            type: 'multiple',
            question: 'Which word is a proper noun?',
            questionCn: 'Which word is a proper noun?',
            options: ['city', 'teacher', 'Tokyo', 'book'],
            correctAnswer: 'Tokyo',
            explanation: '"Tokyo" is the name of a specific city, making it a proper noun that must be capitalized.'
          },
          {
            id: 'q3',
            type: 'multiple',
            question: 'Choose the correct sentence:',
            questionCn: 'Choose the correct sentence:',
            options: ['I live in tokyo.', 'I live in Tokyo.', 'I Live in tokyo.', 'I live in tokyo.'],
            correctAnswer: 'I live in Tokyo.',
            explanation: 'Proper nouns like Tokyo must always be capitalized.'
          },
          {
            id: 'q4',
            type: 'fill',
            question: 'Complete: "I was born in ____ (july/July)."',
            questionCn: 'Complete the sentence',
            correctAnswer: 'July',
            explanation: 'Months are proper nouns and must be capitalized.',
            caseSensitive: true
          }
        ]
      }
    ]
  },
  {
    id: '1b',
    level: '1B',
    title: 'Singular & Plural',
    titleCn: 'Singular & Plural',
    description: 'Learn regular and irregular plural forms.',
    descriptionCn: 'Learn regular and irregular plural forms.',
    color: 'plural-blue',
    cards: 15,
    xpReward: 120,
    units: [
      {
        id: 'unit-1',
        title: 'Singular and Plural',
        titleCn: 'Singular and Plural',
        type: 'teach',
        content: {
          explanation: 'In English, nouns have two forms: singular (one) and plural (two or more). Most nouns form the plural by adding -s or -es.',
          rules: [
            'Singular = one: cat, book, child',
            'Plural = two or more: cats, books, children',
            'Most nouns add -s to form the plural'
          ],
          tips: ['To indicate "more than one," usually just add s to the noun!']
        },
        examples: [
          { sentence: 'I have one cat.', translation: 'I have one cat. (singular)', highlight: 'cat' },
          { sentence: 'I have three cats.', translation: 'I have three cats. (plural)', highlight: 'cats' }
        ]
      },
      {
        id: 'unit-2',
        title: 'Regular Plurals',
        titleCn: 'Regular Plurals',
        type: 'teach',
        content: {
          explanation: 'Most nouns follow regular patterns. Depending on the word ending, add -s, -es, or -ies.',
          rules: [
            'Most nouns +s: cat → cats, book → books',
            'Words ending in s, x, ch, sh +es: bus → buses, box → boxes',
            'Consonant + y → i+es: baby → babies, city → cities',
            'f/fe → v+es: leaf → leaves, knife → knives'
          ],
          tips: ['Remember: box, bus, watch need -es, not just -s!']
        },
        examples: [
          { sentence: 'cat → cats', translation: 'cat → cats (plural)', highlight: '' },
          { sentence: 'box → boxes', translation: 'box → boxes (plural)', highlight: '' },
          { sentence: 'baby → babies', translation: 'baby → babies (plural)', highlight: '' }
        ]
      },
      {
        id: 'unit-3',
        title: 'Irregular Plurals',
        titleCn: 'Irregular Plurals',
        type: 'teach',
        content: {
          explanation: 'Some nouns have irregular plural forms that must be memorized. These don\'t follow the standard -s/-es rules.',
          rules: [
            'man → men',
            'woman → women',
            'child → children',
            'tooth → teeth',
            'foot → feet',
            'mouse → mice'
          ],
          tips: ['These irregular forms require extra practice to remember!']
        },
        examples: [
          { sentence: 'One man, two men.', translation: 'One man, two men.', highlight: 'man, men' },
          { sentence: 'The child is playing. The children are playing.', translation: 'The child/children is/are playing.', highlight: 'child, children' }
        ]
      },
      {
        id: 'unit-4',
        title: 'Practice Quiz',
        titleCn: 'Practice Quiz',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            type: 'multiple',
            question: 'What is the plural of "box"?',
            questionCn: 'What is the plural of "box"?',
            options: ['boxs', 'boxes', 'boxies', 'box'],
            correctAnswer: 'boxes',
            explanation: 'Nouns ending in x form the plural by adding -es.'
          },
          {
            id: 'q2',
            type: 'multiple',
            question: 'What is the plural of "child"?',
            questionCn: 'What is the plural of "child"?',
            options: ['childs', 'childes', 'children', 'child'],
            correctAnswer: 'children',
            explanation: '"child" has an irregular plural form: children.'
          },
          {
            id: 'q3',
            type: 'fill',
            question: 'Complete: "One foot, two ____."',
            questionCn: 'Complete the sentence',
            correctAnswer: 'feet',
            explanation: '"foot" has an irregular plural form: feet.'
          }
        ]
      }
    ]
  },
  {
    id: '1c',
    level: '1C',
    title: 'Countable & Uncountable',
    titleCn: 'Countable & Uncountable',
    description: 'Learn which nouns can be counted.',
    descriptionCn: 'Learn which nouns can be counted.',
    color: 'countable-purple',
    cards: 10,
    xpReward: 100,
    units: [
      {
        id: 'unit-1',
        title: 'Countable Nouns',
        titleCn: 'Countable Nouns',
        type: 'teach',
        content: {
          explanation: 'Countable nouns are things that can be counted individually. They have both singular and plural forms.',
          rules: [
            'Can use numbers: one apple, two books',
            'Have plural forms: apple → apples',
            'Can use a/an: a car, an elephant',
            'Can use many/few: many students'
          ],
          tips: ['If you can count "one, two, three" of something, it\'s countable!']
        },
        examples: [
          { sentence: 'I have three apples.', translation: 'I have three apples.', highlight: 'apples' },
          { sentence: 'She bought a book.', translation: 'She bought a book.', highlight: 'book' }
        ]
      },
      {
        id: 'unit-2',
        title: 'Uncountable Nouns',
        titleCn: 'Uncountable Nouns',
        type: 'teach',
        content: {
          explanation: 'Uncountable nouns cannot be counted individually. They typically don\'t have a plural form.',
          rules: [
            'Liquids: water, milk, coffee',
            'Food: rice, bread, sugar',
            'Abstract concepts: information, advice, love',
            'Use much/little, not many/few'
          ],
          tips: ['Uncountable nouns represent things that "cannot be separated into parts."']
        },
        examples: [
          { sentence: 'I drink water every day.', translation: 'I drink water every day.', highlight: 'water' },
          { sentence: 'She gave me some advice.', translation: 'She gave me some advice.', highlight: 'advice' }
        ]
      },
      {
        id: 'unit-3',
        title: 'Practice Quiz',
        titleCn: 'Practice Quiz',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            type: 'multiple',
            question: 'Which word is uncountable?',
            questionCn: 'Which word is uncountable?',
            options: ['apple', 'water', 'book', 'cat'],
            correctAnswer: 'water',
            explanation: 'Water is a liquid and cannot be counted individually.'
          },
          {
            id: 'q2',
            type: 'multiple',
            question: 'Complete: "How ____ apples do you want?"',
            questionCn: 'Complete the sentence',
            options: ['much', 'many', 'a lot', 'some'],
            correctAnswer: 'many',
            explanation: '"Apple" is countable, so we use "many."'
          },
          {
            id: 'q3',
            type: 'fill',
            question: 'Complete: "How ____ rice do you need?"',
            questionCn: 'Complete the sentence',
            correctAnswer: 'much',
            explanation: 'Rice is uncountable, so we use "much."'
          }
        ]
      }
    ]
  },
  {
    id: '1d',
    level: '1D',
    title: 'Writing Workshop',
    titleCn: 'Writing Workshop',
    description: 'Apply everything you learned in 1a-1c to write a complete article. Generate a personalized poster showcasing your writing journey.',
    descriptionCn: 'Apply everything you learned in 1a-1c to write a complete article. Generate a personalized poster showcasing your writing journey.',
    color: 'writing-pink',
    cards: 20,
    xpReward: 150,
    units: [
      {
        id: 'unit-1',
        title: 'Review: Nouns',
        titleCn: 'Review: Nouns',
        type: 'teach',
        content: {
          explanation: 'Let\'s review what we learned in Lesson 1a. Nouns name people, places, things, or ideas. Common nouns are general (dog, city), while proper nouns are specific (Mary, Tokyo) and always capitalized.',
          rules: [
            'Common nouns: general things, not capitalized (dog, school, teacher)',
            'Proper nouns: specific names, always capitalized (Mary, Tokyo, Christmas)',
            'Nouns can be subjects or objects in sentences'
          ],
          tips: ['Remember: "the one and only" = proper noun = capitalize!']
        },
        examples: [
          { sentence: 'The teacher lives in Tokyo.', translation: 'The teacher lives in Tokyo.', highlight: 'teacher, Tokyo' },
          { sentence: 'Mary loves her dog.', translation: 'Mary loves her dog.', highlight: 'Mary, dog' }
        ]
      },
      {
        id: 'unit-2',
        title: 'Review: Singular & Plural',
        titleCn: 'Review: Singular & Plural',
        type: 'teach',
        content: {
          explanation: 'From Lesson 1b: Singular = one, Plural = two or more. Regular plurals add -s/-es, but some nouns are irregular (child → children, foot → feet).',
          rules: [
            'Regular: add -s (cat → cats) or -es for s, x, ch, sh endings (box → boxes)',
            'Consonant + y → i+es (baby → babies)',
            'Irregular: man → men, woman → women, child → children, foot → feet'
          ],
          tips: ['Say it out loud: "one cat, two cats" - if it sounds right, it probably is!']
        },
        examples: [
          { sentence: 'I have three books and two boxes.', translation: 'I have three books and two boxes.', highlight: 'books, boxes' },
          { sentence: 'The children are playing with their toys.', translation: 'The children are playing with their toys.', highlight: 'children, toys' }
        ]
      },
      {
        id: 'unit-3',
        title: 'Review: Countable & Uncountable',
        titleCn: 'Review: Countable & Uncountable',
        type: 'teach',
        content: {
          explanation: 'From Lesson 1c: Countable nouns can be counted (one apple, two apples). Uncountable nouns cannot (water, rice, information) and use much/little instead of many/few.',
          rules: [
            'Countable: can use numbers, have plural forms (apple → apples)',
            'Uncountable: liquids, abstract concepts, no plural (water, advice, love)',
            'Use many/few for countable, much/little for uncountable'
          ],
          tips: ['Can you count "one, two, three" of it? If yes, it\'s countable!']
        },
        examples: [
          { sentence: 'How many apples do you have?', translation: 'How many apples do you have?', highlight: 'apples' },
          { sentence: 'I need some water and rice.', translation: 'I need some water and rice.', highlight: 'water, rice' }
        ]
      },
      {
        id: 'unit-4',
        title: 'Your Writing Task',
        titleCn: 'Your Writing Task',
        type: 'practice',
        content: {
          explanation: 'Now it\'s your turn to write! Use everything you\'ve learned about nouns, plurals, and countable/uncountable nouns to complete this writing task.',
          rules: [
            'Write 5-8 sentences about "My Daily Life"',
            'Include at least 3 proper nouns (names, places)',
            'Use both singular and plural nouns correctly',
            'Include at least 2 uncountable nouns (water, rice, time, etc.)'
          ],
          tips: ['Check your work: Are proper nouns capitalized? Are plurals formed correctly?']
        }
      },
      {
        id: 'unit-5',
        title: 'Write Your Article',
        titleCn: 'Write Your Article',
        type: 'quiz',
        questions: [
          {
            id: 'writing-task',
            type: 'fill',
            question: 'Write your article about "My Daily Life" here (5-8 sentences):\n\nRemember to:\n- Use proper nouns (names, places) with capital letters\n- Use singular and plural nouns correctly\n- Include uncountable nouns like water, rice, time, love, etc.\n\nYour article:',
            questionCn: 'Write your article about "My Daily Life"',
            correctAnswer: '',
            explanation: 'Great job! Your writing will be featured on your achievement poster!'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    level: '2',
    title: 'Articles',
    titleCn: 'Articles',
    description: 'Master the use of a, an, and the.',
    descriptionCn: 'Master the use of a, an, and the.',
    color: 'article-green',
    cards: 8,
    xpReward: 100,
    units: [
      {
        id: 'unit-1',
        title: 'What are Articles?',
        titleCn: 'What are Articles?',
        type: 'teach',
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
          { sentence: 'I saw a cat.', translation: 'I saw a cat.', highlight: 'a cat' },
          { sentence: 'The cat was black.', translation: 'The cat was black.', highlight: 'The cat' }
        ]
      },
      {
        id: 'unit-2',
        title: 'A vs An',
        titleCn: 'A vs An',
        type: 'teach',
        content: {
          explanation: 'Both a and an are indefinite articles with the same meaning, but they\'re used differently. The choice depends on the "sound" that follows, not the spelling.',
          rules: [
            'a + consonant sound: a book, a university',
            'an + vowel sound: an apple, an hour',
            'Focus on pronunciation, not spelling!'
          ],
          tips: ['Say the word out loud. If it starts with a vowel sound, use "an"!']
        },
        examples: [
          { sentence: 'a book, a car, a university', translation: 'a book, a car, a university', highlight: '' },
          { sentence: 'an apple, an egg, an hour', translation: 'an apple, an egg, an hour', highlight: '' }
        ]
      },
      {
        id: 'unit-3',
        title: 'Practice Quiz',
        titleCn: 'Practice Quiz',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            type: 'multiple',
            question: 'Complete: "I have ____ apple."',
            questionCn: 'Complete the sentence',
            options: ['a', 'an', 'the', '—'],
            correctAnswer: 'an',
            explanation: '"Apple" starts with a vowel sound, so we use "an."'
          },
          {
            id: 'q2',
            type: 'multiple',
            question: 'Complete: "He is ____ honest man."',
            questionCn: 'Complete the sentence',
            options: ['a', 'an', 'the', '—'],
            correctAnswer: 'an',
            explanation: 'The "h" in "honest" is silent, so it starts with a vowel sound. Use "an."'
          },
          {
            id: 'q3',
            type: 'fill',
            question: 'Complete: "She is ____ university student."',
            questionCn: 'Complete the sentence',
            correctAnswer: 'a',
            explanation: '"University" starts with a consonant sound /j/, so we use "a."'
          }
        ]
      }
    ]
  }
];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find(l => l.id === id);
}

export function getLessonProgress(lessonId: string): number {
  const progressMap: Record<string, number> = {
    '1a': 100,
    '1b': 100,
    '1c': 100,
    '1d': 100,
    '2': 100
  };
  return progressMap[lessonId] || 0;
}
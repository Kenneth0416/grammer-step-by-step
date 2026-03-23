/**
 * 課堂活動庫 - Classroom Activities Library
 * 包含 I Spy, Bingo, Classification, TPR 等活動
 */

export type ActivityType =
  | 'tpr'           // Total Physical Response
  | 'game'          // 遊戲
  | 'roleplay'      // 角色扮演
  | 'discovery'     // 發現學習
  | 'classification' // 分類活動
  | 'bingo'         // Bingo 遊戲
  | 'flashcard'     // 閃卡
  | 'sorting'       // 排序活動
  | 'matching'      // 配對活動
  | 'race'          // 競賽活動
  | 'story'         // 故事講述
  | 'survey'         // 調查問卷
  | 'interview'     // 訪談活動
  | 'presentation'; // 展示活動

export interface Activity {
  id: string;
  name: string;
  nameCn: string;
  type: ActivityType;
  description: string;
  descriptionCn: string;
  purpose: string;
  duration: string;
  materials: string[];
  steps: string[];
  stepsCn: string[];
  tips?: string[];
  tipsCn?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  groupSize: 'individual' | 'pair' | 'group' | 'class';
  vocabulary?: string[];
  examples?: string[];
}

export interface ActivityResult {
  activityId: string;
  completed: boolean;
  score?: number;
  feedback?: string;
}

// ==================== ACTIVITY LIBRARY ====================

export const activities: Record<string, Activity> = {
  // ==================== WARM-UP ACTIVITIES ====================
  
  'i-spy': {
    id: 'i-spy',
    name: 'I Spy',
    nameCn: '我說你猜',
    type: 'tpr',
    description: 'Students find and name things in the classroom based on clues.',
    descriptionCn: '學生根據線索找出並說出教室裡的物品名稱。',
    purpose: '啟動名詞詞彙，引出名詞概念',
    duration: '5-7min',
    materials: [],
    steps: [
      'Teacher says: "I spy with my little eye something that is..."',
      'Teacher gives a clue: "It is red." or "It is a thing we use to write."',
      'Students look around and guess.',
      'Student who guesses correctly becomes the next spy.'
    ],
    stepsCn: [
      '老師說："我用小眼睛看到一個東西..."',
      '老師給出線索："它是红色的。"或"這是我們用來寫字的東西。"',
      '學生環顧四周並猜測。',
      '猜對的學生成為下一個出題者。'
    ],
    tips: [
      'Start with obvious items',
      'Gradually increase difficulty',
      'Accept approximations from beginners'
    ],
    tipsCn: [
      '從顯而易見的物品開始',
      '逐漸增加難度',
      '對初學者接受近似答案'
    ],
    difficulty: 'easy',
    groupSize: 'class',
    vocabulary: ['red', 'big', 'small', 'soft', 'hard', 'round', 'long'],
    examples: ['I spy with my little eye something that is... RED!', 'I spy something that we use to write.']
  },

  'quick-fire': {
    id: 'quick-fire',
    name: 'Quick Fire Round',
    nameCn: '快問快答',
    type: 'game',
    description: 'Rapid question and answer to review vocabulary.',
    descriptionCn: '快速問答複習詞彙',
    purpose: '快速啟動已學知識，檢測掌握程度',
    duration: '3-5min',
    materials: [],
    steps: [
      'Teacher asks rapid questions.',
      'Students answer as quickly as possible.',
      'Correct answer = 1 point.',
      'First to 10 points wins.'
    ],
    stepsCn: [
      '老師快速提問',
      '學生盡快回答',
      '答對得1分',
      '先到10分獲勝'
    ],
    difficulty: 'easy',
    groupSize: 'class',
    vocabulary: []
  },

  'flashcard-race': {
    id: 'flashcard-race',
    name: 'Flashcard Race',
    nameCn: '閃卡賽跑',
    type: 'race',
    description: 'Students race to identify flashcards.',
    descriptionCn: '學生搶答閃卡上的內容',
    purpose: '快速識別詞彙，建立詞彙與意義的聯繫',
    duration: '5min',
    materials: [' flashcards '],
    steps: [
      'Teacher holds up flashcards quickly.',
      'First student to shout the correct word wins the card.',
      'Student with most cards at the end wins.'
    ],
    stepsCn: [
      '老師快速展示閃卡',
      '第一個喊出正確單字的學生贏得卡片',
      '最後卡片最多的學生獲勝'
    ],
    tips: [
      'Go fast but clear',
      'Include a mix of learned and new vocabulary'
    ],
    difficulty: 'easy',
    groupSize: 'class'
  },

  // ==================== NOUN ACTIVITIES ====================
  
  'noun-hunt': {
    id: 'noun-hunt',
    name: 'Noun Hunt',
    nameCn: '名詞獵手',
    type: 'discovery',
    description: 'Students find and categorize nouns in texts or around the classroom.',
    descriptionCn: '學生在課文或教室中找出並分類名詞',
    purpose: '識別和分類名詞，鞏固 Common vs Proper Nouns 概念',
    duration: '10min',
    materials: [' worksheets ', ' pencils '],
    steps: [
      'Teacher gives each student a worksheet.',
      'Students walk around the classroom or read the text.',
      'Students find and circle nouns.',
      'Students categorize: People / Places / Things / Ideas.'
    ],
    stepsCn: [
      '老師給每個學生分發工作表',
      '學生在教室走動或閱讀課文',
      '學生找出並圈出名詞',
      '學生分類：人物/地點/事物/概念'
    ],
    difficulty: 'medium',
    groupSize: 'individual',
    vocabulary: ['person', 'place', 'thing', 'idea', 'common', 'proper']
  },

  'proper-noun-hunt': {
    id: 'proper-noun-hunt',
    name: 'Proper Noun Detective',
    nameCn: '專有名詞偵探',
    type: 'discovery',
    description: 'Students find and correct proper nouns in sentences.',
    descriptionCn: '學生找出並改正句子中的專有名詞',
    purpose: '識別專有名詞的大寫規則',
    duration: '8min',
    materials: [' worksheet with mistakes '],
    steps: [
      'Teacher shows sentences with capitalization errors.',
      'Example: "i went to london last summer."',
      'Students find and correct the errors.',
      'Discuss: Why do we capitalize these words?'
    ],
    stepsCn: [
      '老師展示有大小寫錯誤的句子',
      '例如：「i went to london last summer.」',
      '學生找出並改正錯誤',
      '討論：為什麼這些詞要大寫？'
    ],
    tips: [
      'Make errors obvious at first',
      'Include famous places, names, holidays'
    ],
    difficulty: 'medium',
    groupSize: 'pair'
  },

  'sentence-build': {
    id: 'sentence-build',
    name: 'Sentence Building',
    nameCn: '造句大師',
    type: 'game',
    description: 'Students build sentences using target nouns.',
    descriptionCn: '學生用目標名詞造句',
    purpose: '在語境中使用名詞',
    duration: '10min',
    materials: [' word cards '],
    steps: [
      'Each student gets 3-5 word cards (nouns).',
      'Using the nouns, students build sentences.',
      'Share with partner or class.',
      'Bonus points for creative sentences!'
    ],
    stepsCn: [
      '每個學生獲得3-5張詞卡（名詞）',
      '用這些名詞造句',
      '與同伴或全班分享',
      '創意句子加分！'
    ],
    difficulty: 'medium',
    groupSize: 'pair'
  },

  // ==================== PLURAL ACTIVITIES ====================
  
  'sound-bingo': {
    id: 'sound-bingo',
    name: 'Sound Bingo',
    nameCn: '發音賓果',
    type: 'bingo',
    description: 'Bingo game practicing -s vs -es pronunciation.',
    descriptionCn: '賓果遊戲練習 -s 和 -es 的發音',
    purpose: '區分 -s 和 -es 的發音，建立音形聯繫',
    duration: '10min',
    materials: [' bingo cards ', ' markers '],
    steps: [
      'Each student gets a bingo card with plural words.',
      'Teacher calls out plural words.',
      'Students mark the correct plural.',
      'First to get a row wins: BINGO!'
    ],
    stepsCn: [
      '每個學生拿到一張賓果卡，上面有複數單字',
      '老師報出複數單字',
      '學生標記正確的複數形式',
      '先連成一行的獲勝：BINGO！'
    ],
    vocabulary: ['cats', 'dogs', 'books', 'buses', 'boxes', 'watches', 'dishes', 'babies'],
    difficulty: 'medium',
    groupSize: 'class'
  },

  'plural-match': {
    id: 'plural-match',
    name: 'Plural Memory Match',
    nameCn: '複數記憶配對',
    type: 'matching',
    description: 'Memory game matching singular to plural forms.',
    descriptionCn: '記憶遊戲，配對單數和複數形式',
    purpose: '配對單數和複數形式，鞏固複數變化規則',
    duration: '8min',
    materials: [' cards with singular and plural words '],
    steps: [
      'Cards are placed face down.',
      'Students flip two cards at a time.',
      'Match singular to plural.',
      'Keep matching to collect pairs.'
    ],
    stepsCn: [
      '卡片正面朝下放置',
      '學生每次翻開兩張卡片',
      '將單數與複數配對',
      '繼續配對收集卡片'
    ],
    difficulty: 'easy',
    groupSize: 'pair'
  },

  'irregular-story': {
    id: 'irregular-story',
    name: 'Irregular Plural Story',
    nameCn: '不規則複數故事',
    type: 'story',
    description: 'Students create stories using irregular plurals.',
    descriptionCn: '學生用不規則複數創作故事',
    purpose: '在語境中練習不規則複數形式',
    duration: '15min',
    materials: [' paper ', ' pencils '],
    steps: [
      'Teacher introduces the "magic words" (man→men, child→children, etc.)',
      'Students create a short story using at least 3 irregular plurals.',
      'Stories are shared and celebrated.',
      'Vote for the most creative story!'
    ],
    stepsCn: [
      '老師介紹"魔法單字"（man→men, child→children等）',
      '學生創作一個短故事，必須使用至少3個不規則複數',
      '分享故事並給予肯定',
      '投票選出最有創意的故事！'
    ],
    vocabulary: ['man→men', 'woman→women', 'child→children', 'tooth→teeth', 'foot→feet', 'mouse→mice'],
    difficulty: 'hard',
    groupSize: 'individual'
  },

  'plural-showdown': {
    id: 'plural-showdown',
    name: 'Plural Showdown',
    nameCn: '複數對決',
    type: 'race',
    description: 'Teams compete to form plurals correctly.',
    descriptionCn: '小組競賽正確變複數',
    purpose: '透過競賽練習複數形式，鞏固規則',
    duration: '8min',
    materials: [' whiteboard '],
    steps: [
      'Divide class into 2 teams.',
      'Teacher says a singular noun.',
      'First team member writes the correct plural.',
      'Correct = 1 point, wrong = point to other team.'
    ],
    stepsCn: [
      '將班級分成2隊',
      '老師說出一個單數名詞',
      '第一個隊員寫出正確的複數',
      '正確得1分，錯誤則對方得分'
    ],
    difficulty: 'medium',
    groupSize: 'group'
  },

  // ==================== COUNTABLE/UNCOUNTABLE ACTIVITIES ====================
  
  'countable-sort': {
    id: 'countable-sort',
    name: 'Countable or Not?',
    nameCn: '能數還是不能數？',
    type: 'classification',
    description: 'Students sort words into countable and uncountable categories.',
    descriptionCn: '學生將單字分類為可數和不可數',
    purpose: '通過分類活動理解可數與不可數名詞的區別',
    duration: '8min',
    materials: [' word cards ', ' two hoops or containers '],
    steps: [
      'Teacher places two hoops on the floor: "Countable" and "Uncountable".',
      'Teacher shows a word card (e.g., "apple").',
      'Students decide: Can we count it?',
      'Student places card in the correct hoop.'
    ],
    stepsCn: [
      '老師在地上放兩個呼拉圈："可數"和"不可數"',
      '老師展示詞卡（如"apple"）',
      '學生決定：我們能數嗎？',
      '學生將卡片放入正確的圈中'
    ],
    vocabulary: ['apple', 'water', 'rice', 'cat', 'information', 'book', 'love', 'sugar'],
    difficulty: 'easy',
    groupSize: 'class'
  },

  'restaurant-roleplay': {
    id: 'restaurant-roleplay',
    name: 'Restaurant Role-play',
    nameCn: '餐廳角色扮演',
    type: 'roleplay',
    description: 'Students practice ordering food using much/many.',
    descriptionCn: '學生練習用 much/many 點餐',
    purpose: '在真實情境中練習使用 much 和 many',
    duration: '10min',
    materials: [' menus ', ' role cards '],
    steps: [
      'Assign roles: waiter/waitress and customer.',
      'Customer orders using "much" for uncountable and "many" for countable.',
      'Example: "I would like MUCH water and MANY apples, please."',
      'Switch roles and practice again.'
    ],
    stepsCn: [
      '分配角色：服務員和顧客',
      '顧客用 "much" 表示不可數，"many" 表示可數來點餐',
      '示例：「I would like MUCH water and MANY apples, please.」',
      '交換角色再次練習'
    ],
    vocabulary: ['much', 'many', 'water', 'rice', 'apples', 'bread', 'sugar', 'coffee'],
    difficulty: 'medium',
    groupSize: 'pair'
  },

  'much-many-survey': {
    id: 'much-many-survey',
    name: 'Much or Many Survey',
    nameCn: 'Much 還是 Many 調查',
    type: 'survey',
    description: 'Students survey classmates using much/many questions.',
    descriptionCn: '學生用 much/many 問題調查同學',
    purpose: '透過調查活動練習使用 much 和 many 提問',
    duration: '10min',
    materials: [' survey worksheet '],
    steps: [
      'Students get survey worksheet with questions.',
      'Questions include: "How much water do you drink?" "How many friends do you have?"',
      'Students walk around and ask classmates.',
      'Report findings to class.'
    ],
    stepsCn: [
      '學生獲得調查工作表',
      '問題包括：「How much water do you drink?」「How many friends do you have?」',
      '學生在教室裡走動詢問同學',
      '向全班報告調查結果'
    ],
    vocabulary: ['much', 'many', 'water', 'time', 'friends', 'books', 'homework'],
    difficulty: 'medium',
    groupSize: 'pair'
  },

  'kitchen-description': {
    id: 'kitchen-description',
    name: 'My Kitchen',
    nameCn: '我的廚房',
    type: 'presentation',
    description: 'Students describe their kitchen using countable and uncountable nouns.',
    descriptionCn: '學生用可數和不可數名詞描述他們的廚房',
    purpose: '綜合運用可數和不可數名詞進行寫作輸出',
    duration: '15min',
    materials: [' drawing materials '],
    steps: [
      'Students draw their ideal kitchen.',
      'Write 5 sentences describing it.',
      'Include both countable and uncountable nouns.',
      'Present to class or partner.'
    ],
    stepsCn: [
      '學生畫出他們理想的廚房',
      '寫5句話描述它',
      '同時使用可數和不可數名詞',
      '向全班或同伴展示'
    ],
    vocabulary: ['cups', 'plates', 'water', 'rice', 'bread', 'fruits', 'vegetables'],
    difficulty: 'hard',
    groupSize: 'individual'
  },

  // ==================== REVIEW GAMES ====================
  
  'grammar-gramps': {
    id: 'grammar-gramps',
    name: 'Grammar Gramps',
    nameCn: '語法爺爺',
    type: 'game',
    description: 'Quiz show style review game.',
    descriptionCn: '知识競賽風格複習遊戲',
    purpose: '通過競賽遊戲複習和巩固所學語法知识',
    duration: '15min',
    materials: [' question cards ', ' bell or buzzer '],
    steps: [
      'Divide into teams.',
      'Teacher reads a question.',
      'First team to buzz/call out wins the right to answer.',
      'Correct answer = points, wrong answer = other team can steal.'
    ],
    stepsCn: [
      '分成若幹隊',
      '老師讀題',
      '先按鈴/先喊出的隊伍獲得答題權',
      '答對得分，答錯另一隊可以搶答'
    ],
    difficulty: 'medium',
    groupSize: 'group'
  },

  'exit-ticket': {
    id: 'exit-ticket',
    name: 'Exit Ticket',
    nameCn: '出門票',
    type: 'game',
    description: 'Quick assessment before leaving class.',
    descriptionCn: '下課前的快速檢測',
    purpose: '快速檢測學生對本節課內容的掌握程度',
    duration: '3min',
    materials: [' small cards or paper '],
    steps: [
      'Teacher asks 3 quick questions.',
      'Students write answers on cards.',
      'Cards collected at the door.',
      'Teacher reviews for next lesson planning.'
    ],
    stepsCn: [
      '老師提出3個快速問題',
      '學生在卡片上寫答案',
      '在門口收集卡片',
      '老師審閱以規劃下節課'
    ],
    difficulty: 'easy',
    groupSize: 'individual'
  }
};

// ==================== ACTIVITY UTILITIES ====================

export function getActivityById(id: string): Activity | undefined {
  return activities[id];
}

export function getActivitiesByType(type: ActivityType): Activity[] {
  return Object.values(activities).filter(a => a.type === type);
}

export function getActivitiesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Activity[] {
  return Object.values(activities).filter(a => a.difficulty === difficulty);
}

export function getActivitiesByGroupSize(groupSize: Activity['groupSize']): Activity[] {
  return Object.values(activities).filter(a => a.groupSize === groupSize);
}

// Get recommended activities for a lesson level
export function getRecommendedActivities(level: string): Activity[] {
  const recommendations: Record<string, string[]> = {
    '1a': ['i-spy', 'quick-fire', 'noun-hunt', 'proper-noun-hunt', 'sentence-build'],
    '1b': ['flashcard-race', 'sound-bingo', 'plural-match', 'irregular-story', 'plural-showdown'],
    '1c': ['countable-sort', 'restaurant-roleplay', 'much-many-survey', 'kitchen-description'],
    'review': ['grammar-gramps', 'exit-ticket']
  };
  
  const activityIds = recommendations[level] || recommendations['review'];
  return activityIds.map(id => activities[id]).filter(Boolean);
}

export default activities;

// ==================== NAMED EXPORTS FOR LESSON INTEGRATION ====================
// These exports match the imports in lessons.ts

export const nounISpyActivity = activities['i-spy'];
export const nounTprActivity = activities['noun-hunt'];
export const nounDiscoveryActivity = activities['proper-noun-hunt'];
export const nounClassificationActivity = activities['sentence-build'];
export const nounSentenceActivity = activities['noun-hunt'];

export const pluralReviewActivity = activities['quick-fire'];
export const magicSActivity = activities['flashcard-race'];
export const soundBingoActivity = activities['sound-bingo'];
export const irregularPluralActivity = activities['irregular-story'];
export const classroomDescriptionActivity = activities['sentence-build'];

export const countableReviewActivity = activities['quick-fire'];
export const waterProblemActivity = activities['countable-sort'];
export const countabilitySortActivity = activities['countable-sort'];
export const muchManyRoleplayActivity = activities['restaurant-roleplay'];
export const kitchenProductionActivity = activities['kitchen-description'];

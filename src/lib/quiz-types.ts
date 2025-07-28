export interface OpenTDBQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface OpenTDBResponse {
  response_code: number;
  results: OpenTDBQuestion[];
}

// Internal question format
export interface Question {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: (number | null)[];
  timeSpent: number;
}

export const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const transformOpenTDBQuestion = (question: OpenTDBQuestion, index: number): Question => {
  const allOptions = [...question.incorrect_answers, question.correct_answer];
  const shuffledOptions = shuffleArray(allOptions);
  const correctAnswer = shuffledOptions.findIndex(option => option === question.correct_answer);

  return {
    id: index + 1,
    category: decodeHtmlEntities(question.category),
    difficulty: question.difficulty,
    question: decodeHtmlEntities(question.question),
    options: shuffledOptions.map(option => decodeHtmlEntities(option)),
    correctAnswer
  };
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
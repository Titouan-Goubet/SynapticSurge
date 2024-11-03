export interface Option {
  text: string;
}

export interface Question {
  text: string;
  correctOptionIndex: number;
  options: string[];
}

export interface QuizData {
  title: string;
  theme: string;
  description?: string;
  questions: Question[];
}

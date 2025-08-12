export interface Question {
  id: string;
  section: string;
  type: 'likert' | 'mcq' | 'scenario' | 'rating';
  question: string;
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
}

export interface Answer {
  questionId: string;
  value: number | string;
}

export interface AssessmentResult {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'no' | 'maybe';
  insights: string[];
  learningPath: string[];
  alternativePaths: string[];
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}
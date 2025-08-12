import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Answer, AssessmentResult } from '@/types/assessment';

interface AssessmentState {
  currentSection: number;
  answers: Answer[];
  isComplete: boolean;
  result: AssessmentResult | null;
}

type AssessmentAction =
  | { type: 'SET_ANSWER'; payload: Answer }
  | { type: 'NEXT_SECTION' }
  | { type: 'PREV_SECTION' }
  | { type: 'COMPLETE_ASSESSMENT'; payload: AssessmentResult }
  | { type: 'RESET_ASSESSMENT' };

const initialState: AssessmentState = {
  currentSection: 0,
  answers: [],
  isComplete: false,
  result: null,
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'SET_ANSWER':
      const existingIndex = state.answers.findIndex(a => a.questionId === action.payload.questionId);
      const newAnswers = existingIndex >= 0 
        ? state.answers.map((a, i) => i === existingIndex ? action.payload : a)
        : [...state.answers, action.payload];
      return { ...state, answers: newAnswers };
    
    case 'NEXT_SECTION':
      return { ...state, currentSection: state.currentSection + 1 };
    
    case 'PREV_SECTION':
      return { ...state, currentSection: Math.max(0, state.currentSection - 1) };
    
    case 'COMPLETE_ASSESSMENT':
      return { ...state, isComplete: true, result: action.payload };
    
    case 'RESET_ASSESSMENT':
      return initialState;
    
    default:
      return state;
  }
}

interface AssessmentContextType extends AssessmentState {
  setAnswer: (answer: Answer) => void;
  nextSection: () => void;
  prevSection: () => void;
  completeAssessment: (result: AssessmentResult) => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const setAnswer = (answer: Answer) => {
    dispatch({ type: 'SET_ANSWER', payload: answer });
  };

  const nextSection = () => {
    dispatch({ type: 'NEXT_SECTION' });
  };

  const prevSection = () => {
    dispatch({ type: 'PREV_SECTION' });
  };

  const completeAssessment = (result: AssessmentResult) => {
    dispatch({ type: 'COMPLETE_ASSESSMENT', payload: result });
  };

  const resetAssessment = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
  };

  return (
    <AssessmentContext.Provider
      value={{
        ...state,
        setAnswer,
        nextSection,
        prevSection,
        completeAssessment,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
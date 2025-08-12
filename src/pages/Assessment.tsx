import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '@/context/AssessmentContext';
import { assessmentSections } from '@/data/assessmentQuestions';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ProgressBar } from '@/components/assessment/ProgressBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { calculateAssessmentResult } from '@/utils/assessmentScoring';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Assessment() {
  const navigate = useNavigate();
  const { 
    currentSection, 
    answers, 
    setAnswer, 
    nextSection, 
    prevSection, 
    completeAssessment 
  } = useAssessment();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const currentSectionData = assessmentSections[currentSection];
  const currentQuestion = currentSectionData?.questions[currentQuestionIndex];
  const isLastSection = currentSection === assessmentSections.length - 1;
  const isLastQuestion = currentQuestionIndex === currentSectionData?.questions.length - 1;
  
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  
  const handleAnswer = (answer: any) => {
    setAnswer(answer);
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      if (isLastSection) {
        // Complete assessment
        const result = calculateAssessmentResult(answers);
        completeAssessment(result);
        navigate('/results');
      } else {
        // Next section
        nextSection();
        setCurrentQuestionIndex(0);
      }
    } else {
      // Next question
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex === 0) {
      if (currentSection > 0) {
        prevSection();
        setCurrentQuestionIndex(assessmentSections[currentSection - 1].questions.length - 1);
      }
    } else {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const sectionProgress = (currentQuestionIndex + 1) / currentSectionData?.questions.length;
  const canProceed = currentAnswer !== undefined;

  if (!currentSectionData || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
          <Button onClick={() => navigate('/results')} variant="hero">
            View Results
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
              Content Marketing Specialist Assessment
            </h1>
            <p className="text-muted-foreground">
              {currentSectionData.description}
            </p>
          </div>
          
          <ProgressBar 
            currentSection={currentSection}
            totalSections={assessmentSections.length}
            sectionProgress={sectionProgress}
          />
        </div>

        {/* Section Header */}
        <Card className="mb-6 p-6 bg-gradient-card shadow-card border-0">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-primary mb-2">
              {currentSectionData.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {currentSectionData.questions.length}
            </p>
          </div>
        </Card>

        {/* Question */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            answer={currentAnswer}
            onAnswer={handleAnswer}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0 && currentQuestionIndex === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="text-center flex-1 mx-4">
            <p className="text-sm text-muted-foreground">
              {canProceed ? 'Ready to continue' : 'Please answer to continue'}
            </p>
          </div>

          <Button
            variant={canProceed ? "assessment" : "outline"}
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center space-x-2"
          >
            <span>
              {isLastQuestion && isLastSection ? 'Complete Assessment' : 'Next'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
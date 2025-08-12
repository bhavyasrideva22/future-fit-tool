import React from 'react';
import { Question, Answer } from '@/types/assessment';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  answer?: Answer;
  onAnswer: (answer: Answer) => void;
}

export function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  const handleAnswer = (value: number | string) => {
    onAnswer({ questionId: question.id, value });
  };

  const renderLikertScale = () => {
    if (!question.scale) return null;
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center space-x-2">
          {question.scale.labels.map((label, index) => (
            <Button
              key={index}
              variant={answer?.value === (index + 1) ? "assessment" : "outline"}
              size="sm"
              onClick={() => handleAnswer(index + 1)}
              className={cn(
                "flex-1 min-h-12 text-xs transition-all",
                answer?.value === (index + 1) && "shadow-glow"
              )}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground px-2">
          <span>{question.scale.min}</span>
          <span>{question.scale.max}</span>
        </div>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    if (!question.options) return null;
    
    return (
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant={answer?.value === option ? "assessment" : "outline"}
            onClick={() => handleAnswer(option)}
            className={cn(
              "w-full justify-start text-left h-auto p-4 transition-all",
              answer?.value === option && "shadow-elegant"
            )}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-4 h-4 rounded-full border-2 transition-all",
                answer?.value === option 
                  ? "bg-white border-white" 
                  : "border-muted-foreground"
              )} />
              <span className="text-sm leading-relaxed">{option}</span>
            </div>
          </Button>
        ))}
      </div>
    );
  };

  const renderRating = () => {
    if (!question.scale) return null;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {question.scale.labels.map((label, index) => (
            <Button
              key={index}
              variant={answer?.value === (index + 1) ? "assessment" : "outline"}
              onClick={() => handleAnswer(index + 1)}
              className={cn(
                "h-16 flex-col text-xs transition-all",
                answer?.value === (index + 1) && "shadow-glow"
              )}
            >
              <div className="font-semibold">{index + 1}</div>
              <div className="text-center leading-tight">{label}</div>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-card border-0 transition-all hover:shadow-elegant">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground leading-relaxed">
            {question.question}
          </h3>
        </div>
        
        <div>
          {question.type === 'likert' && renderLikertScale()}
          {question.type === 'mcq' && renderMultipleChoice()}
          {question.type === 'scenario' && renderMultipleChoice()}
          {question.type === 'rating' && renderRating()}
        </div>
      </div>
    </Card>
  );
}
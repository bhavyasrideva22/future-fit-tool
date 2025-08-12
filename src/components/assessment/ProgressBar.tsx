import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentSection: number;
  totalSections: number;
  sectionProgress: number;
}

export function ProgressBar({ currentSection, totalSections, sectionProgress }: ProgressBarProps) {
  const overallProgress = ((currentSection + sectionProgress) / totalSections) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Section {currentSection + 1} of {totalSections}</span>
        <span>{Math.round(overallProgress)}% Complete</span>
      </div>
      <Progress 
        value={overallProgress} 
        className="h-2 bg-muted"
      />
    </div>
  );
}
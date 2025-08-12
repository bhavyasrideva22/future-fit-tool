import React from 'react';
import { AssessmentResult } from '@/types/assessment';
import { Card } from '@/components/ui/card';

interface ResultsChartProps {
  result: AssessmentResult;
}

export function ResultsChart({ result }: ResultsChartProps) {
  const wiscarData = [
    { label: 'Will', value: result.wiscarScores.will, color: 'hsl(268 85% 65%)' },
    { label: 'Interest', value: result.wiscarScores.interest, color: 'hsl(195 100% 65%)' },
    { label: 'Skill', value: result.wiscarScores.skill, color: 'hsl(45 100% 60%)' },
    { label: 'Cognitive', value: result.wiscarScores.cognitive, color: 'hsl(268 95% 75%)' },
    { label: 'Ability', value: result.wiscarScores.ability, color: 'hsl(195 100% 75%)' },
    { label: 'Real-World', value: result.wiscarScores.realWorld, color: 'hsl(142 76% 45%)' },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Overall Scores */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <h3 className="text-lg font-semibold mb-4">Overall Assessment Scores</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Psychometric Fit</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${result.psychometricScore}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{result.psychometricScore}%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Technical Readiness</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary transition-all duration-1000"
                  style={{ width: `${result.technicalScore}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{result.technicalScore}%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-medium">Overall Score</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-hero transition-all duration-1000"
                  style={{ width: `${result.overallScore}%` }}
                />
              </div>
              <span className="font-bold text-lg">{result.overallScore}%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* WISCAR Radar Chart */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <h3 className="text-lg font-semibold mb-4">WISCAR Framework Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          {wiscarData.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm font-semibold">{item.value}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000"
                  style={{ 
                    width: `${item.value}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '@/context/AssessmentContext';
import { ResultsChart } from '@/components/assessment/ResultsChart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, RotateCcw, Download } from 'lucide-react';

export default function Results() {
  const navigate = useNavigate();
  const { result, resetAssessment } = useAssessment();

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
          <p className="text-muted-foreground mb-6">Please complete the assessment first.</p>
          <Button onClick={() => navigate('/')} variant="hero">
            Start Assessment
          </Button>
        </div>
      </div>
    );
  }

  const getRecommendationIcon = () => {
    switch (result.recommendation) {
      case 'yes':
        return <CheckCircle className="w-6 h-6 text-assessment-complete" />;
      case 'maybe':
        return <AlertCircle className="w-6 h-6 text-assessment-warning" />;
      case 'no':
        return <XCircle className="w-6 h-6 text-destructive" />;
    }
  };

  const getRecommendationText = () => {
    switch (result.recommendation) {
      case 'yes':
        return 'Yes, content marketing is an excellent fit for you!';
      case 'maybe':
        return 'Content marketing could work with some development';
      case 'no':
        return 'Consider alternative paths that better match your profile';
    }
  };

  const getRecommendationVariant = () => {
    switch (result.recommendation) {
      case 'yes':
        return 'default';
      case 'maybe':
        return 'secondary';
      case 'no':
        return 'destructive';
    }
  };

  const handleRetakeAssessment = () => {
    resetAssessment();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Your Assessment Results
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive analysis of your content marketing readiness
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="mb-8 p-8 bg-gradient-card shadow-elegant border-0">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {getRecommendationIcon()}
            </div>
            <h2 className="text-2xl font-bold mb-2">{getRecommendationText()}</h2>
            <div className="flex justify-center mb-4">
              <Badge variant={getRecommendationVariant()} className="text-lg px-4 py-2">
                Overall Score: {result.overallScore}%
              </Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based on your personality profile, technical aptitude, and WISCAR analysis, 
              here's your personalized career guidance.
            </p>
          </div>
        </Card>

        {/* Charts and Analysis */}
        <div className="mb-8">
          <ResultsChart result={result} />
        </div>

        {/* Insights */}
        <Card className="mb-8 p-6 bg-gradient-card shadow-card">
          <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
          <div className="space-y-3">
            {result.insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="w-5 h-5 text-assessment-complete mt-0.5 flex-shrink-0" />
                <p className="text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Learning Path */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card shadow-card">
            <h3 className="text-xl font-semibold mb-4">Recommended Learning Path</h3>
            <div className="space-y-2">
              {result.learningPath.map((step, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Alternative Paths */}
          {result.alternativePaths.length > 0 && (
            <Card className="p-6 bg-gradient-card shadow-card">
              <h3 className="text-xl font-semibold mb-4">Alternative Career Paths</h3>
              <div className="space-y-2">
                {result.alternativePaths.map((path, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50">
                    <span className="text-sm font-medium">{path}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Next Steps */}
        <Card className="p-6 bg-gradient-card shadow-card">
          <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Build Foundation</h4>
              <p className="text-sm text-muted-foreground">
                Start with content marketing fundamentals and writing skills
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Practice & Portfolio</h4>
              <p className="text-sm text-muted-foreground">
                Create sample content and build a portfolio to showcase your skills
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Network & Apply</h4>
              <p className="text-sm text-muted-foreground">
                Connect with professionals and start applying for entry-level positions
              </p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            onClick={handleRetakeAssessment}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </Button>
          
          <Button 
            onClick={() => window.print()}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Save Results</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            variant="hero"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
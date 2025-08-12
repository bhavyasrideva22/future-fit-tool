import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp, Users, Zap, Clock } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Psychological Fit Analysis",
      description: "Evaluate personality alignment with content marketing roles"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Technical Aptitude Test",
      description: "Assess your marketing knowledge and logical reasoning"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "WISCAR Framework",
      description: "Comprehensive 6-dimension readiness analysis"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Career Guidance",
      description: "Personalized learning paths and role recommendations"
    }
  ];

  const traits = [
    "Creativity and storytelling ability",
    "Strong written communication",
    "Strategic thinking",
    "Analytical insight",
    "Curiosity about audience behavior",
    "Adaptability to digital trends"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-accent text-foreground">
            AI-Powered Career Assessment
          </Badge>
          <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Should I Learn Content Marketing?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover if content marketing aligns with your personality, skills, and career aspirations 
            through our comprehensive psychological and technical assessment.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>20-30 minutes</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4" />
              <span>Instant results</span>
            </div>
          </div>

          <Button 
            onClick={handleStartAssessment}
            variant="hero"
            size="lg"
            className="text-lg px-8 py-4"
          >
            Start Assessment
          </Button>
        </div>

        {/* What is Content Marketing */}
        <Card className="mb-16 p-8 bg-gradient-card shadow-elegant border-0">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">What is Content Marketing?</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Content marketing is the strategic approach of creating, publishing, and distributing 
              valuable content—like blogs, videos, social media posts, and ebooks—to attract, 
              engage, and retain a target audience while driving profitable customer actions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Typical Career Roles</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Content Marketing Specialist</li>
                <li>• Content Strategist</li>
                <li>• Brand Journalist</li>
                <li>• Social Media Content Manager</li>
                <li>• Copywriter</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Traits That Excel</h3>
              <ul className="space-y-2 text-muted-foreground">
                {traits.map((trait, index) => (
                  <li key={index}>• {trait}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Assessment Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Comprehensive Assessment</h2>
            <p className="text-lg text-muted-foreground">
              Our assessment combines psychology, technical aptitude, and career alignment analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center bg-gradient-card shadow-card border-0 hover:shadow-elegant transition-all">
                <div className="flex justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Results Preview */}
        <Card className="p-8 bg-gradient-card shadow-elegant border-0 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">What You'll Get</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-assessment-progress">Overall Score</div>
              <p className="text-sm text-muted-foreground">Comprehensive readiness percentage</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-assessment-complete">Recommendation</div>
              <p className="text-sm text-muted-foreground">Clear Yes/No/Maybe guidance</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-assessment-warning">Learning Path</div>
              <p className="text-sm text-muted-foreground">Personalized skill development plan</p>
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              onClick={handleStartAssessment}
              variant="assessment"
              size="lg"
              className="text-lg px-8 py-4"
            >
              Begin Your Assessment Journey
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;

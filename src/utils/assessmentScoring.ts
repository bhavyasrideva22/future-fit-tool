import { Answer, AssessmentResult } from '@/types/assessment';

export function calculateAssessmentResult(answers: Answer[]): AssessmentResult {
  // Categorize answers by section
  const psychometricAnswers = answers.filter(a => a.questionId.startsWith('p'));
  const technicalAnswers = answers.filter(a => a.questionId.startsWith('t'));
  const wiscarAnswers = answers.filter(a => a.questionId.startsWith('w') || 
                                          a.questionId.startsWith('i') || 
                                          a.questionId.startsWith('s') || 
                                          a.questionId.startsWith('c') || 
                                          a.questionId.startsWith('a') || 
                                          a.questionId.startsWith('r'));

  // Calculate psychometric score
  const psychometricScore = calculatePsychometricScore(psychometricAnswers);
  
  // Calculate technical score
  const technicalScore = calculateTechnicalScore(technicalAnswers);
  
  // Calculate WISCAR scores
  const wiscarScores = calculateWiscarScores(wiscarAnswers);
  
  // Calculate overall score
  const overallScore = Math.round((psychometricScore + technicalScore + 
    Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) / 3);

  // Generate recommendation
  const recommendation = generateRecommendation(overallScore, psychometricScore, technicalScore);
  
  // Generate insights
  const insights = generateInsights(psychometricScore, technicalScore, wiscarScores, answers);
  
  // Generate learning path
  const learningPath = generateLearningPath(technicalScore, wiscarScores);
  
  // Generate alternative paths
  const alternativePaths = generateAlternativePaths(psychometricScore, recommendation);

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    insights,
    learningPath,
    alternativePaths
  };
}

function calculatePsychometricScore(answers: Answer[]): number {
  let totalScore = 0;
  let maxScore = 0;

  answers.forEach(answer => {
    if (typeof answer.value === 'number') {
      totalScore += answer.value;
      maxScore += 5; // Assuming 5-point scale
    } else {
      // For scenario questions, assign scores based on content marketing alignment
      const scenarioScore = getScenarioScore(answer.questionId, answer.value as string);
      totalScore += scenarioScore;
      maxScore += 5;
    }
  });

  return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
}

function calculateTechnicalScore(answers: Answer[]): number {
  let correctAnswers = 0;
  const totalQuestions = answers.length;

  answers.forEach(answer => {
    if (typeof answer.value === 'string') {
      const isCorrect = checkTechnicalAnswer(answer.questionId, answer.value);
      if (isCorrect) correctAnswers++;
    } else if (typeof answer.value === 'number') {
      // For rating questions, score based on level
      correctAnswers += (answer.value / 5);
    }
  });

  return totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
}

function calculateWiscarScores(answers: Answer[]): {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
} {
  const categories = {
    will: answers.filter(a => a.questionId.startsWith('w')),
    interest: answers.filter(a => a.questionId.startsWith('i')),
    skill: answers.filter(a => a.questionId.startsWith('s')),
    cognitive: answers.filter(a => a.questionId.startsWith('c')),
    ability: answers.filter(a => a.questionId.startsWith('a')),
    realWorld: answers.filter(a => a.questionId.startsWith('r'))
  };

  const scores: any = {};

  Object.entries(categories).forEach(([key, categoryAnswers]) => {
    let totalScore = 0;
    let maxScore = 0;

    categoryAnswers.forEach(answer => {
      if (typeof answer.value === 'number') {
        totalScore += answer.value;
        maxScore += 5;
      } else {
        const scenarioScore = getScenarioScore(answer.questionId, answer.value as string);
        totalScore += scenarioScore;
        maxScore += 5;
      }
    });

    scores[key] = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 75; // Default score if no answers
  });

  return scores;
}

function getScenarioScore(questionId: string, answer: string): number {
  const scenarioScores: { [key: string]: { [answer: string]: number } } = {
    'p5': {
      'A collaborative creative space with frequent brainstorming sessions': 5,
      'A quiet, structured environment focused on detailed analysis': 2,
      'A dynamic environment switching between creative and strategic work': 4,
      'A results-focused environment with clear metrics and deadlines': 3
    },
    'i1': {
      'Researching and understanding target audiences': 4,
      'Creating compelling stories and narratives': 5,
      'Analyzing performance metrics and optimizing': 3,
      'Building brand communities and engagement': 4
    },
    'c1': {
      'Post the same content across all platforms': 1,
      'Slightly modify the caption for each platform': 2,
      'Completely reimagine the content for each platform\'s audience and format': 5,
      'Focus on just one platform to avoid confusion': 2
    },
    'r1': {
      'Mainly writing blog posts and articles': 3,
      'Mostly managing social media accounts': 3,
      'Primarily analyzing data and creating reports': 2,
      'A mix of strategy, creation, distribution, and analysis': 5
    }
  };

  return scenarioScores[questionId]?.[answer] || 3;
}

function checkTechnicalAnswer(questionId: string, answer: string): boolean {
  const correctAnswers: { [key: string]: string } = {
    't1': 'To help content rank higher in search engine results',
    't2': 'Short-form video content',
    't3': 'Analyze audience behavior and content performance data',
    't4': 'A detailed profile of your ideal customer'
  };

  return correctAnswers[questionId] === answer;
}

function generateRecommendation(
  overallScore: number, 
  psychometricScore: number, 
  technicalScore: number
): 'yes' | 'no' | 'maybe' {
  if (overallScore >= 75 && psychometricScore >= 70) return 'yes';
  if (overallScore < 50 || psychometricScore < 40) return 'no';
  return 'maybe';
}

function generateInsights(
  psychometricScore: number,
  technicalScore: number,
  wiscarScores: any,
  answers: Answer[]
): string[] {
  const insights: string[] = [];

  if (psychometricScore >= 80) {
    insights.push("Your personality profile shows excellent alignment with content marketing roles");
  } else if (psychometricScore >= 60) {
    insights.push("Good personality fit with some areas for development in creative confidence");
  } else {
    insights.push("Consider developing stronger storytelling and audience empathy skills");
  }

  if (technicalScore >= 80) {
    insights.push("Strong technical foundation in content marketing principles");
  } else if (technicalScore >= 50) {
    insights.push("Basic technical understanding with room for growth in strategy and tools");
  } else {
    insights.push("Recommend foundational learning in content marketing fundamentals");
  }

  // Highest WISCAR dimension
  const highestDimension = Object.entries(wiscarScores).reduce((max, [key, value]) => 
    (value as number) > max.value ? { key, value: value as number } : max, { key: '', value: 0 });

  switch(highestDimension.key) {
    case 'will':
      insights.push("Your motivation and persistence are key strengths for content marketing success");
      break;
    case 'interest':
      insights.push("Strong natural interest in content creation and audience engagement");
      break;
    case 'cognitive':
      insights.push("Excellent strategic thinking and adaptability for content marketing");
      break;
  }

  return insights;
}

function generateLearningPath(technicalScore: number, wiscarScores: any): string[] {
  const path: string[] = [];

  if (technicalScore < 60) {
    path.push("Content Marketing Fundamentals");
    path.push("SEO Writing Basics");
    path.push("Social Media Content Strategy");
  }

  if (wiscarScores.skill < 70) {
    path.push("Copywriting and Storytelling");
    path.push("Content Management Systems");
  }

  if (wiscarScores.cognitive < 70) {
    path.push("Analytics and Performance Measurement");
    path.push("Audience Research and Persona Development");
  }

  path.push("Advanced Content Strategy");
  path.push("Brand Voice and Positioning");

  return path;
}

function generateAlternativePaths(psychometricScore: number, recommendation: string): string[] {
  if (recommendation === 'yes') return [];

  const alternatives: string[] = [];

  if (psychometricScore >= 60) {
    alternatives.push("Copywriting (Creative Focus)");
    alternatives.push("UX Writing (User-Centric)");
    alternatives.push("Social Media Management");
  } else {
    alternatives.push("Digital Marketing Analytics");
    alternatives.push("SEO Specialist");
    alternatives.push("Email Marketing Specialist");
  }

  return alternatives;
}
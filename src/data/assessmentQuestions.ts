import { AssessmentSection } from '@/types/assessment';

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Personality & Interest Assessment',
    description: 'Evaluate your psychological alignment with content marketing roles',
    questions: [
      {
        id: 'p1',
        section: 'psychometric',
        type: 'likert',
        question: 'I enjoy creating engaging stories that connect with people emotionally',
        scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
      },
      {
        id: 'p2',
        section: 'psychometric',
        type: 'likert',
        question: 'I find myself naturally curious about what motivates different audiences',
        scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
      },
      {
        id: 'p3',
        section: 'psychometric',
        type: 'likert',
        question: 'I prefer working on creative projects rather than purely analytical tasks',
        scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
      },
      {
        id: 'p4',
        section: 'psychometric',
        type: 'likert',
        question: 'I am persistent when working on long-term creative projects',
        scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
      },
      {
        id: 'p5',
        section: 'psychometric',
        type: 'scenario',
        question: 'Your ideal work environment would be:',
        options: [
          'A collaborative creative space with frequent brainstorming sessions',
          'A quiet, structured environment focused on detailed analysis',
          'A dynamic environment switching between creative and strategic work',
          'A results-focused environment with clear metrics and deadlines'
        ]
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical & Aptitude Assessment',
    description: 'Test your logical reasoning and content marketing knowledge',
    questions: [
      {
        id: 't1',
        section: 'technical',
        type: 'mcq',
        question: 'What is the primary purpose of SEO in content marketing?',
        options: [
          'To make content more visually appealing',
          'To help content rank higher in search engine results',
          'To reduce content creation costs',
          'To automate content distribution'
        ]
      },
      {
        id: 't2',
        section: 'technical',
        type: 'mcq',
        question: 'Which content format typically generates the highest engagement on social media?',
        options: [
          'Long-form blog posts',
          'Static images with text',
          'Short-form video content',
          'PDF documents'
        ]
      },
      {
        id: 't3',
        section: 'technical',
        type: 'scenario',
        question: 'Your content strategy isn\'t generating expected engagement. What\'s your first step?',
        options: [
          'Create more content immediately',
          'Analyze audience behavior and content performance data',
          'Switch to a completely different content format',
          'Increase advertising spend'
        ]
      },
      {
        id: 't4',
        section: 'technical',
        type: 'mcq',
        question: 'What does "buyer persona" mean in content marketing?',
        options: [
          'A famous person who endorses your brand',
          'A detailed profile of your ideal customer',
          'A type of content calendar',
          'A social media advertising strategy'
        ]
      },
      {
        id: 't5',
        section: 'technical',
        type: 'rating',
        question: 'Rate your familiarity with content management systems (CMS) like WordPress',
        scale: { min: 1, max: 5, labels: ['Never used', 'Basic awareness', 'Some experience', 'Comfortable using', 'Expert level'] }
      }
    ]
  },
  {
    id: 'wiscar',
    title: 'WISCAR Framework Analysis',
    description: 'Comprehensive readiness assessment across six key dimensions',
    questions: [
      {
        id: 'w1',
        section: 'wiscar',
        type: 'likert',
        question: 'I am motivated to consistently create content even when I don\'t feel inspired',
        scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
      },
      {
        id: 'i1',
        section: 'wiscar',
        type: 'scenario',
        question: 'Which aspect of content marketing excites you most?',
        options: [
          'Researching and understanding target audiences',
          'Creating compelling stories and narratives',
          'Analyzing performance metrics and optimizing',
          'Building brand communities and engagement'
        ]
      },
      {
        id: 's1',
        section: 'wiscar',
        type: 'rating',
        question: 'Rate your current writing and communication skills',
        scale: { min: 1, max: 5, labels: ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
      },
      {
        id: 'c1',
        section: 'wiscar',
        type: 'scenario',
        question: 'You need to adapt the same message for LinkedIn, Instagram, and TikTok. Your approach:',
        options: [
          'Post the same content across all platforms',
          'Slightly modify the caption for each platform',
          'Completely reimagine the content for each platform\'s audience and format',
          'Focus on just one platform to avoid confusion'
        ]
      },
      {
        id: 'a1',
        section: 'wiscar',
        type: 'likert',
        question: 'I actively seek feedback to improve my creative work',
        scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
      },
      {
        id: 'r1',
        section: 'wiscar',
        type: 'scenario',
        question: 'A typical day as a Content Marketing Specialist would involve:',
        options: [
          'Mainly writing blog posts and articles',
          'Mostly managing social media accounts',
          'Primarily analyzing data and creating reports',
          'A mix of strategy, creation, distribution, and analysis'
        ]
      }
    ]
  }
];
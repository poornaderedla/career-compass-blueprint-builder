
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Code, Timer } from "lucide-react";

interface TechnicalSectionProps {
  onNext: (data: Record<string, any>) => void;
  canGoBack: boolean;
}

const sections = [
  {
    id: "logical_reasoning",
    title: "A. Logical Reasoning",
    description: "Pattern recognition and problem-solving",
    questions: [
      {
        id: "pattern_1",
        text: "What comes next in this sequence: 2, 6, 18, 54, ?",
        type: "multiple_choice",
        options: ["162", "108", "72", "216"],
        correct: 0
      },
      {
        id: "logic_1",
        text: "If all Pythons are snakes, and some snakes are venomous, which statement is definitely true?",
        type: "multiple_choice",
        options: [
          "All Pythons are venomous",
          "Some Pythons might be venomous",
          "No Pythons are venomous",
          "All snakes are Pythons"
        ],
        correct: 1
      }
    ]
  },
  {
    id: "programming_concepts",
    title: "B. Programming Fundamentals",
    description: "Basic programming knowledge and concepts",
    questions: [
      {
        id: "variables_1",
        text: "Which of these is the best variable name for storing a user's age?",
        type: "multiple_choice",
        options: ["a", "user_age", "x1", "data"],
        correct: 1
      },
      {
        id: "loops_1",
        text: "What would this pseudocode output? \n\nfor i from 1 to 3:\n    print i * 2",
        type: "multiple_choice",
        options: ["2, 4, 6", "1, 2, 3", "2, 4, 6, 8", "1, 4, 9"],
        correct: 0
      }
    ]
  },
  {
    id: "python_specific",
    title: "C. Python & Web Development",
    description: "Python syntax and web development concepts",
    questions: [
      {
        id: "python_syntax_1",
        text: "Which Python code correctly creates a list of even numbers from 0 to 10?",
        type: "multiple_choice",
        options: [
          "[x for x in range(11) if x % 2 == 0]",
          "[x for x in range(10) if x % 2 == 1]",
          "[x*2 for x in range(5)]",
          "Both A and C are correct"
        ],
        correct: 3
      },
      {
        id: "web_concepts_1",
        text: "What does REST stand for in web development?",
        type: "multiple_choice",
        options: [
          "Really Easy Server Technology",
          "Representational State Transfer",
          "Remote Execution Service Tool",
          "Rapid Enterprise Software Testing"
        ],
        correct: 1
      }
    ]
  }
];

export const TechnicalSection = ({ onNext, canGoBack }: TechnicalSectionProps) => {
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  const allQuestions = sections.flatMap(section => section.questions);
  const totalQuestions = allQuestions.length;
  const progress = (Object.keys(responses).length / totalQuestions) * 100;
  const isComplete = Object.keys(responses).length === totalQuestions;

  const currentQ = sections[currentSection].questions[currentQuestion];

  const handleResponse = (questionId: string, optionIndex: number) => {
    setResponses(prev => ({ ...prev, [questionId]: optionIndex }));
    
    // Auto-advance to next question
    setTimeout(() => {
      if (currentQuestion < sections[currentSection].questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else if (currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
        setCurrentQuestion(0);
      }
    }, 500);
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    
    sections.forEach(section => {
      section.questions.forEach(question => {
        total++;
        if (responses[question.id] === question.correct) {
          correct++;
        }
      });
    });
    
    return Math.round((correct / total) * 100);
  };

  const handleNext = () => {
    if (isComplete) {
      const score = calculateScore();
      onNext({ 
        responses, 
        score, 
        timeSpent,
        sectionalScores: sections.map(section => {
          let sectionCorrect = 0;
          let sectionTotal = section.questions.length;
          
          section.questions.forEach(question => {
            if (responses[question.id] === question.correct) {
              sectionCorrect++;
            }
          });
          
          return {
            section: section.title,
            score: Math.round((sectionCorrect / sectionTotal) * 100)
          };
        })
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-green-100 text-green-700">
          3️⃣ TECHNICAL & APTITUDE SECTION
        </Badge>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Code className="w-8 h-8 text-green-600" />
          🧠 Technical Readiness Assessment
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Assess your logical reasoning, programming aptitude, and Python-specific knowledge 
          to determine your technical readiness for Full Stack Python development.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {Object.keys(responses).length + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
            <Timer className="w-4 h-4" />
            Section: {sections[currentSection].title}
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Section Info */}
      <Card className="border-2 border-green-200 bg-green-50 mb-6">
        <CardHeader>
          <CardTitle className="text-green-800 text-lg">
            {sections[currentSection].title}
          </CardTitle>
          <p className="text-green-700">{sections[currentSection].description}</p>
        </CardHeader>
      </Card>

      {/* Current Question */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-blue-700 border-blue-300">
              Question {currentQuestion + 1} of {sections[currentSection].questions.length}
            </Badge>
            <span className="text-sm text-gray-500">
              {sections[currentSection].title}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQ.text}
          </h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={responses[currentQ.id] === index ? "default" : "outline"}
                className={`w-full p-4 h-auto justify-start text-left transition-all ${
                  responses[currentQ.id] === index 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "hover:border-blue-300 hover:bg-blue-50"
                }`}
                onClick={() => handleResponse(currentQ.id, index)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                    responses[currentQ.id] === index 
                      ? "border-white text-white" 
                      : "border-blue-300 text-blue-600"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium whitespace-pre-line">{option}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section Progress */}
      <div className="flex justify-center space-x-4">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="text-center">
            <div className={`w-4 h-4 rounded-full mx-auto mb-1 ${
              sectionIndex < currentSection ? 'bg-green-500' :
              sectionIndex === currentSection ? 'bg-blue-500' : 'bg-gray-300'
            }`} />
            <span className="text-xs text-gray-600">{section.title.split('.')[0]}</span>
          </div>
        ))}
      </div>

      {/* Next Button */}
      {isComplete && (
        <div className="text-center">
          <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-800 font-semibold">
              Technical Assessment Complete! Score: {calculateScore()}%
            </p>
          </div>
          <Button 
            onClick={handleNext}
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4"
          >
            Continue to WISCAR Framework
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Target, Star, Brain, Lightbulb, Users, Compass } from "lucide-react";

interface WiscarSectionProps {
  onNext: (data: Record<string, any>) => void;
  canGoBack: boolean;
}

interface Question {
  id: string;
  text: string;
  type: string;
  options?: string[];
}

const wiscarDimensions = [
  {
    code: "W",
    title: "Will",
    subtitle: "Consistency of interest & perseverance",
    icon: Target,
    color: "red",
    questions: [
      {
        id: "will_1",
        text: "I keep learning programming even when concepts become difficult to understand.",
        type: "likert"
      },
      {
        id: "will_2", 
        text: "When I start a coding project, I usually finish it even if it takes longer than expected.",
        type: "likert"
      }
    ] as Question[]
  },
  {
    code: "I",
    title: "Interest",
    subtitle: "Curiosity about Python-based roles",
    icon: Star,
    color: "yellow",
    questions: [
      {
        id: "interest_1",
        text: "I enjoy building websites or applications from scratch.",
        type: "likert"
      },
      {
        id: "interest_2",
        text: "I find myself reading about web development trends in my free time.",
        type: "likert"
      }
    ] as Question[]
  },
  {
    code: "S",
    title: "Skill",
    subtitle: "Current capability assessment",
    icon: Brain,
    color: "blue",
    questions: [
      {
        id: "skill_1",
        text: "Rate your confidence with Python basics (variables, loops, functions):",
        type: "confidence",
        options: ["No experience", "Beginner", "Some experience", "Comfortable", "Advanced"]
      },
      {
        id: "skill_2",
        text: "Rate your experience with web technologies (HTML, CSS, JavaScript):",
        type: "confidence", 
        options: ["No experience", "Beginner", "Some experience", "Comfortable", "Advanced"]
      }
    ] as Question[]
  },
  {
    code: "C",
    title: "Cognitive Readiness",
    subtitle: "Analytical thinking & pattern recognition",
    icon: Lightbulb,
    color: "purple",
    questions: [
      {
        id: "cognitive_1",
        text: "I can easily break down complex problems into smaller, manageable steps.",
        type: "likert"
      },
      {
        id: "cognitive_2",
        text: "I enjoy figuring out why something isn't working and finding the solution.",
        type: "likert"
      }
    ] as Question[]
  },
  {
    code: "A",
    title: "Ability to Learn",
    subtitle: "Self-reflection & metacognition",
    icon: Users,
    color: "green",
    questions: [
      {
        id: "ability_1",
        text: "When I don't understand something, I actively try new ways to learn it.",
        type: "likert"
      },
      {
        id: "ability_2",
        text: "I can identify my own learning strengths and weaknesses.",
        type: "likert"
      }
    ] as Question[]
  },
  {
    code: "R",
    title: "Real-World Alignment",
    subtitle: "Understanding of Python career paths",
    icon: Compass,
    color: "indigo",
    questions: [
      {
        id: "real_world_1",
        text: "How interested are you in building full-stack web applications for businesses?",
        type: "scenario",
        options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"]
      },
      {
        id: "real_world_2",
        text: "How appealing is working on both frontend user interfaces and backend server logic?",
        type: "scenario",
        options: ["Not appealing", "Slightly appealing", "Moderately appealing", "Very appealing", "Extremely appealing"]
      }
    ] as Question[]
  }
];

const likertOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" }
];

export const WiscarSection = ({ onNext, canGoBack }: WiscarSectionProps) => {
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [currentDimension, setCurrentDimension] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const allQuestions = wiscarDimensions.flatMap(dim => dim.questions);
  const totalQuestions = allQuestions.length;
  const progress = (Object.keys(responses).length / totalQuestions) * 100;
  const isComplete = Object.keys(responses).length === totalQuestions;

  const currentDim = wiscarDimensions[currentDimension];
  const currentQ = currentDim.questions[currentQuestion];
  const Icon = currentDim.icon;

  const getColorClasses = (color: string) => {
    const colors = {
      red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", button: "bg-red-600 hover:bg-red-700" },
      yellow: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", button: "bg-yellow-600 hover:bg-yellow-700" },
      blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", button: "bg-blue-600 hover:bg-blue-700" },
      purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", button: "bg-purple-600 hover:bg-purple-700" },
      green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", button: "bg-green-600 hover:bg-green-700" },
      indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-800", button: "bg-indigo-600 hover:bg-indigo-700" }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const colorClasses = getColorClasses(currentDim.color);

  const handleResponse = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    
    // Auto-advance to next question
    setTimeout(() => {
      if (currentQuestion < currentDim.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else if (currentDimension < wiscarDimensions.length - 1) {
        setCurrentDimension(prev => prev + 1);
        setCurrentQuestion(0);
      }
    }, 500);
  };

  const calculateWiscarScores = () => {
    const scores: Record<string, number> = {};
    
    wiscarDimensions.forEach(dimension => {
      let total = 0;
      let count = 0;
      
      dimension.questions.forEach(question => {
        if (responses[question.id] !== undefined) {
          total += responses[question.id];
          count++;
        }
      });
      
      scores[dimension.code] = count > 0 ? Math.round((total / count / 5) * 100) : 0;
    });
    
    return scores;
  };

  const handleNext = () => {
    if (isComplete) {
      const wiscarScores = calculateWiscarScores();
      const overallScore = Math.round(
        Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / Object.keys(wiscarScores).length
      );
      
      onNext({ 
        responses, 
        wiscarScores,
        overallScore 
      });
    }
  };

  const getOptions = () => {
    if (currentQ.type === "likert") {
      return likertOptions;
    } else if (currentQ.options) {
      return currentQ.options.map((option, index) => ({ value: index + 1, label: option }));
    }
    return [];
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-indigo-100 text-indigo-700">
          4️⃣ WISCAR FRAMEWORK ANALYSIS
        </Badge>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🧩 Multi-Dimensional Readiness Assessment
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A research-backed framework that evaluates your readiness across six key dimensions 
          for success in Full Stack Python development.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {Object.keys(responses).length + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* WISCAR Dimensions Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
        {wiscarDimensions.map((dim, index) => {
          const DimIcon = dim.icon;
          const dimColors = getColorClasses(dim.color);
          const isActive = index === currentDimension;
          const isCompleted = index < currentDimension || 
            (index === currentDimension && currentQuestion >= dim.questions.length);
          
          return (
            <div
              key={dim.code}
              className={`p-3 rounded-lg text-center transition-all ${
                isActive ? `${dimColors.bg} ${dimColors.border} border-2` :
                isCompleted ? 'bg-gray-100 border border-gray-300' :
                'bg-white border border-gray-200'
              }`}
            >
              <DimIcon className={`w-6 h-6 mx-auto mb-1 ${
                isActive ? dimColors.text.replace('text-', 'text-') :
                isCompleted ? 'text-gray-600' :
                'text-gray-400'
              }`} />
              <div className={`font-bold text-lg ${
                isActive ? dimColors.text :
                isCompleted ? 'text-gray-600' :
                'text-gray-400'
              }`}>
                {dim.code}
              </div>
              <div className={`text-xs ${
                isActive ? dimColors.text :
                isCompleted ? 'text-gray-600' :
                'text-gray-400'
              }`}>
                {dim.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Dimension */}
      <Card className={`border-2 ${colorClasses.bg} ${colorClasses.border}`}>
        <CardHeader>
          <CardTitle className={`${colorClasses.text} text-lg flex items-center gap-2`}>
            <Icon className="w-6 h-6" />
            {currentDim.code} - {currentDim.title}
          </CardTitle>
          <p className={colorClasses.text}>{currentDim.subtitle}</p>
        </CardHeader>
      </Card>

      {/* Current Question */}
      <Card className="border-2 border-gray-200 bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-gray-700 border-gray-300">
              Question {currentQuestion + 1} of {currentDim.questions.length}
            </Badge>
            <span className="text-sm text-gray-500">
              {currentDim.code} - {currentDim.title}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {currentQ.text}
          </h3>
          
          <div className="space-y-3">
            {getOptions().map((option) => (
              <Button
                key={option.value}
                variant={responses[currentQ.id] === option.value ? "default" : "outline"}
                className={`w-full p-4 h-auto justify-start text-left transition-all ${
                  responses[currentQ.id] === option.value 
                    ? `${colorClasses.button} text-white` 
                    : "hover:border-gray-400 hover:bg-gray-50"
                }`}
                onClick={() => handleResponse(currentQ.id, option.value)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                    responses[currentQ.id] === option.value 
                      ? "border-white text-white" 
                      : "border-gray-400 text-gray-600"
                  }`}>
                    {option.value}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Button */}
      {isComplete && (
        <div className="text-center">
          <div className="mb-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <p className="text-indigo-800 font-semibold">
              WISCAR Framework Assessment Complete!
            </p>
            <p className="text-indigo-700 text-sm mt-1">
              Ready to see your comprehensive results and recommendations.
            </p>
          </div>
          <Button 
            onClick={handleNext}
            size="lg" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4"
          >
            View Results & Recommendations
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

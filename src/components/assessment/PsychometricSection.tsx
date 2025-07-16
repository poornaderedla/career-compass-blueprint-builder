
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Brain } from "lucide-react";

interface PsychometricSectionProps {
  onNext: (data: Record<string, number>) => void;
  canGoBack: boolean;
}

const questions = [
  {
    id: "problem_solving",
    text: "I enjoy solving abstract problems using code and logic.",
    category: "Problem Solving"
  },
  {
    id: "flexibility",
    text: "I prefer tools that offer flexibility and creativity over rigid structures.",
    category: "Flexibility"
  },
  {
    id: "automation",
    text: "I often experiment with automating repetitive tasks in my daily life.",
    category: "Automation Interest"
  },
  {
    id: "learning_persistence",
    text: "When learning something new, I persist even when it becomes challenging.",
    category: "Grit"
  },
  {
    id: "curiosity",
    text: "I'm naturally curious about how websites and applications work behind the scenes.",
    category: "Technical Curiosity"
  },
  {
    id: "collaboration",
    text: "I enjoy collaborating with others to build something meaningful.",
    category: "Collaboration"
  },
  {
    id: "detail_oriented",
    text: "I pay attention to small details and catch errors that others might miss.",
    category: "Attention to Detail"
  },
  {
    id: "continuous_learning",
    text: "I actively seek out new technologies and programming concepts to learn.",
    category: "Growth Mindset"
  },
  {
    id: "user_focused",
    text: "I think about user experience when building or designing anything.",
    category: "User Focus"
  },
  {
    id: "systematic_thinking",
    text: "I like to break down complex problems into smaller, manageable parts.",
    category: "Systematic Thinking"
  }
];

const scaleOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" }
];

export const PsychometricSection = ({ onNext, canGoBack }: PsychometricSectionProps) => {
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const progress = (Object.keys(responses).length / questions.length) * 100;
  const isComplete = Object.keys(responses).length === questions.length;

  const handleResponse = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    
    // Auto-advance to next question if not the last one
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 300);
    }
  };

  const handleNext = () => {
    if (isComplete) {
      onNext(responses);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-purple-100 text-purple-700">
          2️⃣ PSYCHOMETRIC SECTION
        </Badge>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Brain className="w-8 h-8 text-purple-600" />
          🧠 Psychological Fit Assessment
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          These questions evaluate your cognitive style, interests, motivation, and personality 
          alignment with Full Stack Python development using validated psychometric constructs.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {Object.keys(responses).length} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Current Question */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-purple-700 border-purple-300">
              {currentQ.category}
            </Badge>
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {currentQ.text}
          </h3>
          
          <div className="space-y-3">
            {scaleOptions.map((option) => (
              <Button
                key={option.value}
                variant={responses[currentQ.id] === option.value ? "default" : "outline"}
                className={`w-full p-4 h-auto justify-start text-left transition-all ${
                  responses[currentQ.id] === option.value 
                    ? "bg-purple-600 text-white hover:bg-purple-700" 
                    : "hover:border-purple-300 hover:bg-purple-50"
                }`}
                onClick={() => handleResponse(currentQ.id, option.value)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                    responses[currentQ.id] === option.value 
                      ? "border-white text-white" 
                      : "border-purple-300 text-purple-600"
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

      {/* Question Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {questions.map((_, index) => (
          <Button
            key={index}
            variant={responses[questions[index].id] ? "default" : "outline"}
            size="sm"
            className={`w-10 h-10 p-0 rounded-full ${
              index === currentQuestion ? "ring-2 ring-purple-400" : ""
            } ${
              responses[questions[index].id] 
                ? "bg-purple-600 text-white" 
                : "border-purple-300"
            }`}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      {isComplete && (
        <div className="text-center">
          <Button 
            onClick={handleNext}
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4"
          >
            Continue to Technical Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

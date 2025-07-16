
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentData } from "../AssessmentFlow";
import { CheckCircle, AlertCircle, XCircle, Target, Star, Brain, Lightbulb, Users, Compass, TrendingUp, BookOpen, Code, Zap } from "lucide-react";

interface ResultsSectionProps {
  assessmentData: AssessmentData;
  onNext?: () => void;
  canGoBack: boolean;
}

export const ResultsSection = ({ assessmentData }: ResultsSectionProps) => {
  // Calculate overall scores
  const psychometricScore = Math.round(
    Object.values(assessmentData.psychometric).reduce((sum, val) => sum + val, 0) / 
    Object.keys(assessmentData.psychometric).length / 5 * 100
  );

  const technicalScore = assessmentData.technical.score || 0;
  const wiscarScore = assessmentData.wiscar.overallScore || 0;
  
  const overallScore = Math.round((psychometricScore + technicalScore + wiscarScore) / 3);

  const getRecommendation = (score: number) => {
    if (score >= 80) return { verdict: "YES", message: "You're strongly suited to dive into Full Stack Python. Start now!", color: "green", icon: CheckCircle };
    if (score >= 60) return { verdict: "MAYBE", message: "You're close – address a few key areas to prepare.", color: "yellow", icon: AlertCircle };
    return { verdict: "NO", message: "Python Full Stack may not match your strengths right now. Consider an alternate track.", color: "red", icon: XCircle };
  };

  const recommendation = getRecommendation(overallScore);
  const RecommendationIcon = recommendation.icon;

  const wiscarDimensions = [
    { code: "W", title: "Will", icon: Target, color: "red" },
    { code: "I", title: "Interest", icon: Star, color: "yellow" },
    { code: "S", title: "Skill", icon: Brain, color: "blue" },
    { code: "C", title: "Cognitive", icon: Lightbulb, color: "purple" },
    { code: "A", title: "Ability", icon: Users, color: "green" },
    { code: "R", title: "Real-World", icon: Compass, color: "indigo" }
  ];

  const learningPath = [
    { phase: "Phase 1", title: "Python Foundations", topics: ["Syntax, variables, control flow", "Functions and data structures", "Error handling"], duration: "2-4 weeks" },
    { phase: "Phase 2", title: "Web Basics", topics: ["HTML, CSS fundamentals", "JavaScript basics", "Git & GitHub"], duration: "3-4 weeks" },
    { phase: "Phase 3", title: "Web Framework", topics: ["Flask or Django", "Routing and templating", "Build a blog/TODO app"], duration: "4-6 weeks" },
    { phase: "Phase 4", title: "APIs & Integration", topics: ["REST APIs, JSON", "Authentication", "Database integration"], duration: "3-4 weeks" },
    { phase: "Phase 5", title: "Database Mastery", topics: ["SQL fundamentals", "ORM (Django/SQLAlchemy)", "Database design"], duration: "2-3 weeks" },
    { phase: "Phase 6", title: "Deployment & DevOps", topics: ["Docker basics", "CI/CD pipelines", "Cloud deployment"], duration: "3-4 weeks" }
  ];

  const careerPaths = [
    { role: "Python Full Stack Developer", description: "Build end-to-end web apps using Django/Flask and JS", match: overallScore },
    { role: "Django Developer", description: "Backend-heavy web dev with security, scalability", match: Math.max(technicalScore, wiscarScore) },
    { role: "Backend Engineer (Python)", description: "API development, integrations, automation", match: technicalScore },
    { role: "AI/ML-Enabled App Developer", description: "Python for backend + ML inference", match: Math.round((technicalScore + psychometricScore) / 2) },
    { role: "Python DevOps Engineer", description: "Automate, deploy and manage infrastructure", match: Math.round((technicalScore + wiscarScore) / 2) }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-purple-100 text-purple-700">
          5️⃣ RESULTS & RECOMMENDATIONS
        </Badge>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎯 Your Full Stack Python Assessment Results
        </h2>
      </div>

      {/* Overall Recommendation */}
      <Card className={`border-2 ${
        recommendation.color === 'green' ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50' :
        recommendation.color === 'yellow' ? 'border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50' :
        'border-red-500 bg-gradient-to-r from-red-50 to-pink-50'
      }`}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl flex items-center justify-center gap-3 ${
            recommendation.color === 'green' ? 'text-green-800' :
            recommendation.color === 'yellow' ? 'text-yellow-800' :
            'text-red-800'
          }`}>
            <RecommendationIcon className="w-8 h-8" />
            📌 Should You Learn Full Stack Python?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className={`text-4xl font-bold mb-4 ${
            recommendation.color === 'green' ? 'text-green-600' :
            recommendation.color === 'yellow' ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {recommendation.verdict === 'YES' ? '✅' : recommendation.verdict === 'MAYBE' ? '🟡' : '❌'} {recommendation.verdict}
          </div>
          <p className="text-xl text-gray-700 mb-4">{recommendation.message}</p>
          <div className="text-3xl font-bold text-gray-900">
            Overall Score: {overallScore}%
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader className="text-center">
            <CardTitle className="text-purple-800 flex items-center justify-center gap-2">
              <Brain className="w-6 h-6" />
              Psychometric Fit
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{psychometricScore}%</div>
            <Progress value={psychometricScore} className="mb-2" />
            <p className="text-sm text-gray-600">
              {psychometricScore >= 80 ? "Excellent personality fit" :
               psychometricScore >= 60 ? "Good alignment" : "Consider other paths"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <CardTitle className="text-green-800 flex items-center justify-center gap-2">
              <Code className="w-6 h-6" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{technicalScore}%</div>
            <Progress value={technicalScore} className="mb-2" />
            <p className="text-sm text-gray-600">
              {technicalScore >= 80 ? "Ready to start" :
               technicalScore >= 60 ? "Some prep needed" : "Build fundamentals first"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-indigo-200 bg-indigo-50">
          <CardHeader className="text-center">
            <CardTitle className="text-indigo-800 flex items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6" />
              WISCAR Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{wiscarScore}%</div>
            <Progress value={wiscarScore} className="mb-2" />
            <p className="text-sm text-gray-600">
              {wiscarScore >= 80 ? "High readiness" :
               wiscarScore >= 60 ? "Moderate readiness" : "Needs development"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">🧩 WISCAR Dimensional Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {wiscarDimensions.map((dim) => {
              const score = assessmentData.wiscar.wiscarScores?.[dim.code] || 0;
              const Icon = dim.icon;
              return (
                <div key={dim.code} className="text-center p-4 bg-gray-50 rounded-lg">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <div className="font-bold text-lg text-gray-900">{dim.code} - {dim.title}</div>
                  <div className="text-2xl font-bold text-blue-600 my-2">{score}%</div>
                  <Progress value={score} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card className="border-2 border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800">🔍 Career Paths & Match Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerPaths.map((career, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{career.role}</h3>
                  <p className="text-sm text-gray-600">{career.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-orange-600">{career.match}%</div>
                  <Progress value={career.match} className="w-24 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            🧭 Your Personalized Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {learningPath.map((phase, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 bg-white p-4 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{phase.phase} – {phase.title}</h3>
                    <Badge variant="outline">{phase.duration}</Badge>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {phase.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            🚀 Immediate Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overallScore >= 80 ? (
              <>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <strong>Start Learning Now:</strong> Begin with Python fundamentals on platforms like Python.org, Codecademy, or freeCodeCamp.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <strong>Build Projects:</strong> Start with simple scripts, then move to web applications using Flask.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <strong>Join Communities:</strong> Connect with Python developers on GitHub, Stack Overflow, and Reddit.
                  </div>
                </div>
              </>
            ) : overallScore >= 60 ? (
              <>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <strong>Strengthen Foundations:</strong> Focus on {technicalScore < 60 ? "programming basics and logical thinking" : "psychological readiness and motivation"}.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <strong>Explore First:</strong> Try Python tutorials and see if you enjoy the learning process.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <strong>Reassess in 3 Months:</strong> Retake this assessment after gaining some experience.
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <strong>Consider Alternatives:</strong> Explore frontend development, data science, or no-code platforms.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <strong>Build Interest:</strong> Try visual programming tools or game development to spark interest.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <strong>Skill Development:</strong> Focus on general problem-solving and logical thinking skills first.
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl"
          onClick={() => window.print()}
        >
          📄 Download Results Report
        </Button>
        
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            🔄 Retake Assessment
          </Button>
          <Button variant="outline">
            📚 Explore Learning Resources
          </Button>
        </div>
        
        <p className="text-sm text-gray-600">
          Keep this report for reference as you begin your Full Stack Python journey!
        </p>
      </div>
    </div>
  );
};

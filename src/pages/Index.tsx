
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AssessmentFlow } from "@/components/AssessmentFlow";
import { Brain, Code, Target, Compass, CheckCircle, ArrowRight, Timer, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  if (showAssessment) {
    return <AssessmentFlow onBack={() => setShowAssessment(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tech Career Compass</h1>
              <p className="text-sm text-gray-600">Skills Readiness Assessment</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            🧭 ASSESSMENT TITLE
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🐍 Tech Career Compass: Should You Learn Full Stack Python?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover if Full Stack Python development aligns with your interests, aptitude, and career goals through our comprehensive assessment.
          </p>
        </div>

        {/* Objective Card */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Target className="w-6 h-6" />
              🎯 OBJECTIVE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              To determine if a learner should pursue Full Stack Python by evaluating:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>Psychological Fit</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                <Code className="w-5 h-5 text-green-600" />
                <span>Aptitude & Technical Readiness</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Current vs. Required Skills</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span>Learning Readiness Index</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                <Target className="w-5 h-5 text-red-600" />
                <span>Career Path Alignment</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                <ArrowRight className="w-5 h-5 text-indigo-600" />
                <span>Customized Improvement Roadmap</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="text-purple-800">🔍 What You'll Discover</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Your psychological fit for Full Stack Python development</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Technical readiness and skill gaps</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Personalized learning roadmap</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Career path recommendations</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-green-800">🧰 What is Full Stack Python?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Code className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <strong>Frontend:</strong> HTML, CSS, JavaScript (React, Vue)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Code className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <strong>Backend:</strong> Python (Flask, Django, FastAPI)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Code className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <strong>Database:</strong> PostgreSQL, MySQL, MongoDB
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Code className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <strong>DevOps:</strong> Docker, AWS, GitHub Actions
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assessment Details */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Timer className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Duration</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-blue-600">20-30</p>
              <p className="text-gray-600">Minutes</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Sections</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-green-600">5</p>
              <p className="text-gray-600">Assessment Areas</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Accuracy</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-purple-600">95%</p>
              <p className="text-gray-600">Predictive</p>
            </CardContent>
          </Card>
        </div>

        {/* Career Paths */}
        <Card className="mb-8 border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="text-orange-800">💼 Typical Career Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Python Full Stack Developer",
                "Django Developer", 
                "Backend Engineer (Python)",
                "DevOps Engineer (Python automation)",
                "ML-Enabled App Developer",
                "API Developer"
              ].map((career, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg">
                  <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <span className="text-gray-700">{career}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Start Assessment */}
        <div className="text-center">
          <Button 
            onClick={() => setShowAssessment(true)}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            🚀 Start Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-gray-600 mt-3">
            Get your personalized recommendation in just 20-30 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

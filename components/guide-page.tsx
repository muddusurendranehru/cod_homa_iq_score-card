"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Printer, Heart, Activity, Apple, Dumbbell, ExternalLink } from "lucide-react"

interface GuidePageProps {
  patientData: any
  results: any
  onNext: () => void
  onBack: () => void
  onPrint: () => void
}

export default function GuidePage({ patientData, results, onNext, onBack, onPrint }: GuidePageProps) {
  const getPersonalizedRecommendations = () => {
    const recommendations = []

    if (results.score >= 70) {
      recommendations.push({
        category: "Immediate Action Required",
        icon: <Heart className="h-5 w-5 text-red-500" />,
        items: [
          "Schedule immediate consultation with Dr. Muddu Surendra Nehru MD",
          "Consider comprehensive metabolic panel and cardiac evaluation",
          "Implement strict dietary modifications under medical supervision",
          "Begin supervised exercise program with cardiac monitoring",
        ],
      })
    } else if (results.score >= 40) {
      recommendations.push({
        category: "Moderate Risk Management",
        icon: <Activity className="h-5 w-5 text-orange-500" />,
        items: [
          "Schedule follow-up appointment within 4-6 weeks",
          "Implement lifestyle modifications with regular monitoring",
          "Consider preventive medications if lifestyle changes insufficient",
          "Regular blood pressure and glucose monitoring at home",
        ],
      })
    } else {
      recommendations.push({
        category: "Preventive Care",
        icon: <Heart className="h-5 w-5 text-green-500" />,
        items: [
          "Continue current healthy lifestyle practices",
          "Annual health screenings and check-ups",
          "Maintain optimal weight and regular exercise routine",
          "Monitor for any changes in health parameters",
        ],
      })
    }

    // Specific parameter-based recommendations
    if (Number.parseFloat(patientData.waistCircumference) >= 100) {
      recommendations.push({
        category: "Abdominal Obesity Management",
        icon: <Apple className="h-5 w-5 text-blue-500" />,
        items: [
          "Reduce caloric intake by 500-750 calories per day",
          "Focus on whole foods: vegetables, lean proteins, whole grains",
          "Limit processed foods, sugary drinks, and refined carbohydrates",
          "Consider consultation with registered dietitian",
        ],
      })
    }

    if (Number.parseInt(patientData.systolicBP) >= 130) {
      recommendations.push({
        category: "Blood Pressure Management",
        icon: <Heart className="h-5 w-5 text-red-500" />,
        items: [
          "Adopt DASH diet (Dietary Approaches to Stop Hypertension)",
          "Reduce sodium intake to less than 2,300mg per day",
          "Increase potassium-rich foods (bananas, spinach, beans)",
          "Regular aerobic exercise 150 minutes per week",
        ],
      })
    }

    if (Number.parseFloat(patientData.fastingGlucose) >= 100) {
      recommendations.push({
        category: "Glucose Management",
        icon: <Activity className="h-5 w-5 text-purple-500" />,
        items: [
          "Follow low glycemic index diet",
          "Monitor carbohydrate intake and timing",
          "Include fiber-rich foods to slow glucose absorption",
          "Regular post-meal walks to improve glucose uptake",
        ],
      })
    }

    if (results.bmi >= 25) {
      recommendations.push({
        category: "Weight Management",
        icon: <Dumbbell className="h-5 w-5 text-green-500" />,
        items: [
          "Set realistic weight loss goal of 1-2 pounds per week",
          "Combine cardiovascular and resistance training exercises",
          "Track food intake and physical activity",
          "Consider behavioral counseling for sustainable habits",
        ],
      })
    }

    return recommendations
  }

  const generalGuidelines = [
    {
      title: "Dietary Guidelines",
      items: [
        "Eat 5-9 servings of fruits and vegetables daily",
        "Choose whole grains over refined grains",
        "Include lean proteins: fish, poultry, legumes, nuts",
        "Limit saturated fats to less than 10% of total calories",
        "Stay hydrated with 8-10 glasses of water daily",
      ],
    },
    {
      title: "Exercise Recommendations",
      items: [
        "150 minutes of moderate-intensity aerobic activity per week",
        "2 days of muscle-strengthening activities per week",
        "Include flexibility and balance exercises",
        "Start slowly and gradually increase intensity",
        "Consult healthcare provider before starting new exercise program",
      ],
    },
    {
      title: "Lifestyle Modifications",
      items: [
        "Maintain consistent sleep schedule (7-9 hours nightly)",
        "Practice stress management techniques (meditation, yoga)",
        "Avoid tobacco use and limit alcohol consumption",
        "Regular health screenings and preventive care",
        "Build strong social support networks",
      ],
    },
    {
      title: "Monitoring & Follow-up",
      items: [
        "Regular blood pressure monitoring if elevated",
        "Annual lipid panel and glucose screening",
        "Weight monitoring and BMI calculation",
        "Keep food and exercise diary",
        "Schedule regular follow-up appointments",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 print:mb-4">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 print:shadow-none print:border print:border-gray-300">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">HEALTH GUIDE</h1>
            <p className="text-lg text-gray-600 mb-2">Personalized Recommendations & Guidelines</p>
            <p className="text-sm text-gray-500">Dr. Muddu Surendra Nehru MD | Professor of Medicine</p>
            <p className="text-sm text-blue-600 font-medium">Homa Health Care Center | www.homahealthcarecenter.in</p>
          </div>
        </div>

        {/* Patient Summary */}
        <Card className="mb-6 print:shadow-none print:border print:border-gray-300">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <strong>Patient:</strong> {patientData.name}
              </div>
              <div>
                <strong>Risk Score:</strong> {results.score}%
              </div>
              <div>
                <strong>Risk Category:</strong> {results.riskCategory}
              </div>
              <div>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personalized Recommendations */}
        <div className="space-y-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Personalized Recommendations</h2>
          {getPersonalizedRecommendations().map((section, index) => (
            <Card key={index} className="print:shadow-none print:border print:border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {section.icon}
                  {section.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* General Guidelines */}
        <div className="space-y-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">General Health Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generalGuidelines.map((guideline, index) => (
              <Card key={index} className="print:shadow-none print:border print:border-gray-300">
                <CardHeader>
                  <CardTitle className="text-lg">{guideline.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guideline.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card
          className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:shadow-lg transition-shadow cursor-pointer print:hidden"
          onClick={() => window.open("https://v0-connect-vercel-apps.vercel.app/", "_blank")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-purple-800">
              <ExternalLink className="h-5 w-5" />
              Advanced Health Analytics Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700 mb-3">
              Access our comprehensive health analytics platform for advanced insights, personalized treatment plans,
              and integrated healthcare management tools.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-600 font-medium">Click to explore advanced features</span>
              <ArrowRight className="h-4 w-4 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-6 bg-yellow-50 border-yellow-200 print:bg-white print:border print:border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-yellow-800">Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">⚠️</span>
                <span>
                  These recommendations are based on your current assessment and should not replace professional medical
                  advice.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">⚠️</span>
                <span>
                  Always consult with Dr. Muddu Surendra Nehru MD before making significant changes to your diet or
                  exercise routine.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">⚠️</span>
                <span>
                  Individual results may vary. Regular monitoring and follow-up are essential for optimal health
                  outcomes.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 print:hidden">
          <Button onClick={onBack} variant="outline" className="sm:w-auto py-3 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Button>
          <Button onClick={onNext} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3">
            View Disclaimer
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={onPrint} variant="outline" className="sm:w-auto py-3 bg-transparent">
            <Printer className="mr-2 h-4 w-4" />
            Print Guide
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center p-4 bg-blue-800 text-white rounded-lg print:bg-gray-100 print:text-black print:border print:border-gray-300">
          <p className="font-semibold">Dr. Muddu Surendra Nehru MD</p>
          <p className="text-sm">Professor of Medicine | Homa Health Care Center</p>
          <p className="text-blue-200 print:text-gray-600">Contact: 09963721999 | www.homahealthcarecenter.in</p>
        </div>
      </div>
    </div>
  )
}


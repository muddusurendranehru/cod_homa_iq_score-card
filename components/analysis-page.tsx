"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ArrowRight, Printer, User, ExternalLink } from "lucide-react"
import TyGCalculator from "./tyg-calculator"
import BMICalculator from "./bmi-calculator"
import HOMAIRCalculator from "./homa-ir-calculator"

interface AnalysisPageProps {
  patientData: any
  results: any
  onNext: () => void
  onPrint: () => void
}

export default function AnalysisPage({ patientData, results, onNext, onPrint }: AnalysisPageProps) {
  const getScoreColor = () => {
    if (results.score >= 70) return "text-red-600"
    if (results.score >= 40) return "text-orange-500"
    return "text-green-600"
  }

  const getProgressBarColor = () => {
    if (results.score >= 70) return "bg-red-500"
    if (results.score >= 40) return "bg-orange-500"
    return "bg-green-500"
  }

  const redirectToHealthcareCenter = () => {
    window.open("https://homahealthcarecenter.in/", "_blank")
  }

  const generateAIAnalysis = () => {
    let analysis = `Based on your C.O.D. H.O.M.A I.Q assessment with a score of ${results.score}%, you fall into the ${results.riskCategory} category.\n\n`

    if (results.score >= 70) {
      analysis +=
        "⚠️ HIGH RISK FINDINGS:\nYour assessment indicates significant cardiometabolic risk factors that require immediate medical attention.\n\n"
    } else if (results.score >= 40) {
      analysis +=
        "⚡ MODERATE RISK FINDINGS:\nYour assessment shows some areas of concern that would benefit from lifestyle modifications and monitoring.\n\n"
    } else {
      analysis +=
        "✅ LOW RISK FINDINGS:\nYour assessment shows good cardiometabolic health with minimal risk factors.\n\n"
    }

    analysis += "PERSONALIZED RECOMMENDATIONS:\n"

    if (Number.parseFloat(patientData.waistCircumference) >= 100) {
      analysis += "• Focus on reducing abdominal obesity through structured diet and exercise\n"
    }

    if (Number.parseInt(patientData.systolicBP) >= 130) {
      analysis += "• Blood pressure management through DASH diet and regular cardiovascular exercise\n"
    }

    if (Number.parseFloat(patientData.fastingGlucose) >= 100) {
      analysis += "• Implement glucose management strategies including low glycemic diet\n"
    }

    if (results.bmi >= 25) {
      analysis += "• Weight management program recommended for optimal BMI range\n"
    }

    analysis += "\n📋 NEXT STEPS:\n"
    analysis += "• Consult with Dr. Muddu Surendra Nehru MD for detailed treatment plan\n"
    analysis += "• Follow-up assessment in 3-6 months to monitor progress\n"
    analysis += "• Consider specialized testing based on risk factors identified"

    return analysis
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 print:mb-4">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 print:shadow-none print:border print:border-gray-300">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">AI ANALYSIS REPORT</h1>
            <p className="text-lg text-gray-600 mb-2">Cardiometabolic Risk Assessment Results</p>
            <p className="text-sm text-gray-500">Dr. Muddu Surendra Nehru MD | Professor of Medicine</p>
            <p className="text-sm text-blue-600 font-medium">Homa Health Care Center | www.homahealthcarecenter.in</p>
          </div>
        </div>

        {/* Patient Info Summary */}
        <Card className="mb-6 print:shadow-none print:border print:border-gray-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Name:</strong> {patientData.name}
              </div>
              <div>
                <strong>Age:</strong> {patientData.age} years
              </div>
              <div>
                <strong>Sex:</strong> {patientData.sex}
              </div>
              <div>
                <strong>Height:</strong> {patientData.height} cm
              </div>
              <div>
                <strong>Weight:</strong> {patientData.weight} kg
              </div>
              <div>
                <strong>BMI:</strong> {results.bmi} kg/m²
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Score Display */}
        <Card className="mb-6 bg-white shadow-xl print:shadow-none print:border print:border-gray-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">C.O.D. H.OM.A. IQ SCORE</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-6xl md:text-8xl font-bold mb-4 ${getScoreColor()}`}>{results.score}%</div>
            <div className="text-lg text-gray-600 mb-6">SCORE RANGE: 0% - 100%</div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-8 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="w-1/3 bg-green-400"></div>
                <div className="w-1/3 bg-orange-400"></div>
                <div className="w-1/3 bg-red-400"></div>
              </div>
              <div
                className={`h-full ${getProgressBarColor()} transition-all duration-500 relative z-10`}
                style={{ width: `${Math.min(results.score, 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-600 mb-6">
              <span>Low Risk (0-39%)</span>
              <span>Moderate Risk (40-69%)</span>
              <span>High Risk (70-100%)</span>
            </div>

            <div className={`text-xl md:text-2xl font-semibold mb-4 ${getScoreColor()}`}>{results.riskCategory}</div>

            <div className="mt-6 print:hidden">
              <Button
                onClick={redirectToHealthcareCenter}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Connect to Homa Healthcare Center
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Visit our website for consultation booking and detailed treatment plans
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis */}
        <Card className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 print:bg-white print:border print:border-gray-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              AI Health Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-sm leading-relaxed">{generateAIAnalysis()}</div>
          </CardContent>
        </Card>

        <div className="mb-6 print:hidden">
          <TyGCalculator
            triglycerides={Number(patientData.triglycerides) || 0}
            glucose={Number(patientData.fastingGlucose) || 0}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 print:hidden">
          <BMICalculator height={Number(patientData.height) || 0} weight={Number(patientData.weight) || 0} />
          <HOMAIRCalculator
            insulin={Number(patientData.fastingInsulin) || 0}
            glucose={Number(patientData.fastingGlucose) || 0}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 print:hidden">
          <Button onClick={onNext} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3">
            View Test Reports
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={onPrint} variant="outline" className="sm:w-auto py-3 bg-transparent">
            <Printer className="mr-2 h-4 w-4" />
            Print Report
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


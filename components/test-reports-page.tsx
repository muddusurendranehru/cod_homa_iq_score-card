"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Printer, Activity } from "lucide-react"

interface TestReportsPageProps {
  patientData: any
  results: any
  onNext: () => void
  onBack: () => void
  onPrint: () => void
}

export default function TestReportsPage({ patientData, results, onNext, onBack, onPrint }: TestReportsPageProps) {
  const normalRanges = {
    bmi: { min: 18.5, max: 24.9, unit: "kg/m²" },
    waistCircumference: {
      male: { max: 94 },
      female: { max: 80 },
      unit: "cm",
    },
    systolicBP: { min: 90, max: 120, unit: "mmHg" },
    diastolicBP: { min: 60, max: 80, unit: "mmHg" },
    fastingGlucose: { min: 70, max: 99, unit: "mg/dL" },
    totalCholesterol: { max: 200, unit: "mg/dL" },
    hdlCholesterol: {
      male: { min: 40 },
      female: { min: 50 },
      unit: "mg/dL",
    },
    triglycerides: { max: 150, unit: "mg/dL" },
    fastingInsulin: { min: 2, max: 20, unit: "μU/mL" },
    tygIndex: { max: 8.5 },
  }

  const getStatus = (value: number, range: any, sex?: string) => {
    if (!value) return { status: "Not provided", color: "text-gray-500" }

    if (range.male && range.female && sex) {
      const genderRange = sex === "male" ? range.male : range.female
      if (genderRange.min && value < genderRange.min) return { status: "Low", color: "text-blue-600" }
      if (genderRange.max && value > genderRange.max) return { status: "High", color: "text-red-600" }
      return { status: "Normal", color: "text-green-600" }
    }

    if (range.min && value < range.min) return { status: "Low", color: "text-blue-600" }
    if (range.max && value > range.max) return { status: "High", color: "text-red-600" }
    return { status: "Normal", color: "text-green-600" }
  }

  const getSpeedometerColor = (score: number) => {
    if (score >= 100) return "#8B0000" // Dark Red
    if (score >= 80) return "#DC2626" // Red
    if (score >= 60) return "#EA580C" // Orange-Red
    if (score >= 40) return "#F59E0B" // Orange
    if (score >= 20) return "#10B981" // Green
    return "#059669" // Dark Green
  }

  const getSpeedometerZone = (score: number) => {
    if (score >= 100) return "CRITICAL RISK"
    if (score >= 80) return "VERY HIGH RISK"
    if (score >= 60) return "HIGH RISK"
    if (score >= 40) return "MODERATE RISK"
    if (score >= 20) return "LOW RISK"
    return "OPTIMAL"
  }

  const testResults = [
    {
      parameter: "BMI",
      value: results.bmi,
      unit: normalRanges.bmi.unit,
      normalRange: `${normalRanges.bmi.min} - ${normalRanges.bmi.max}`,
      status: getStatus(results.bmi, normalRanges.bmi),
    },
    {
      parameter: "Waist Circumference",
      value: Number.parseFloat(patientData.waistCircumference),
      unit: normalRanges.waistCircumference.unit,
      normalRange:
        patientData.sex === "male"
          ? `< ${normalRanges.waistCircumference.male.max}`
          : `< ${normalRanges.waistCircumference.female.max}`,
      status: getStatus(
        Number.parseFloat(patientData.waistCircumference),
        normalRanges.waistCircumference,
        patientData.sex,
      ),
    },
    {
      parameter: "Systolic Blood Pressure",
      value: Number.parseInt(patientData.systolicBP),
      unit: normalRanges.systolicBP.unit,
      normalRange: `${normalRanges.systolicBP.min} - ${normalRanges.systolicBP.max}`,
      status: getStatus(Number.parseInt(patientData.systolicBP), normalRanges.systolicBP),
    },
    {
      parameter: "Diastolic Blood Pressure",
      value: Number.parseInt(patientData.diastolicBP),
      unit: normalRanges.diastolicBP.unit,
      normalRange: `${normalRanges.diastolicBP.min} - ${normalRanges.diastolicBP.max}`,
      status: getStatus(Number.parseInt(patientData.diastolicBP), normalRanges.diastolicBP),
    },
    {
      parameter: "Fasting Glucose",
      value: Number.parseFloat(patientData.fastingGlucose),
      unit: normalRanges.fastingGlucose.unit,
      normalRange: `${normalRanges.fastingGlucose.min} - ${normalRanges.fastingGlucose.max}`,
      status: getStatus(Number.parseFloat(patientData.fastingGlucose), normalRanges.fastingGlucose),
    },
    {
      parameter: "Total Cholesterol",
      value: Number.parseFloat(patientData.totalCholesterol),
      unit: normalRanges.totalCholesterol.unit,
      normalRange: `< ${normalRanges.totalCholesterol.max}`,
      status: getStatus(Number.parseFloat(patientData.totalCholesterol), normalRanges.totalCholesterol),
    },
    {
      parameter: "HDL Cholesterol",
      value: Number.parseFloat(patientData.hdlCholesterol),
      unit: normalRanges.hdlCholesterol.unit,
      normalRange:
        patientData.sex === "male"
          ? `> ${normalRanges.hdlCholesterol.male.min}`
          : `> ${normalRanges.hdlCholesterol.female.min}`,
      status: getStatus(Number.parseFloat(patientData.hdlCholesterol), normalRanges.hdlCholesterol, patientData.sex),
    },
    {
      parameter: "Triglycerides",
      value: Number.parseFloat(patientData.triglycerides),
      unit: normalRanges.triglycerides.unit,
      normalRange: `< ${normalRanges.triglycerides.max}`,
      status: getStatus(Number.parseFloat(patientData.triglycerides), normalRanges.triglycerides),
    },
    {
      parameter: "Fasting Insulin",
      value: Number.parseFloat(patientData.fastingInsulin),
      unit: normalRanges.fastingInsulin.unit,
      normalRange: `${normalRanges.fastingInsulin.min} - ${normalRanges.fastingInsulin.max}`,
      status: getStatus(Number.parseFloat(patientData.fastingInsulin), normalRanges.fastingInsulin),
    },
    {
      parameter: "TYG Index",
      value: results.tygIndex,
      unit: "",
      normalRange: `< ${normalRanges.tygIndex.max}`,
      status: getStatus(results.tygIndex, normalRanges.tygIndex),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 print:mb-4">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 print:shadow-none print:border print:border-gray-300">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">TEST REPORTS</h1>
            <p className="text-lg text-gray-600 mb-2">Laboratory Values & Normal Ranges</p>
            <p className="text-sm text-gray-500">Dr. Muddu Surendra Nehru MD | Professor of Medicine</p>
            <p className="text-sm text-blue-600 font-medium">Homa Health Care Center | www.homahealthcarecenter.in</p>
          </div>
        </div>

        {/* Patient Info */}
        <Card className="mb-6 print:shadow-none print:border print:border-gray-300">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <strong>Patient:</strong> {patientData.name}
              </div>
              <div>
                <strong>Age:</strong> {patientData.age} years
              </div>
              <div>
                <strong>Sex:</strong> {patientData.sex}
              </div>
              <div>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Speedometer Display */}
        <Card className="mb-6 bg-white shadow-xl print:shadow-none print:border print:border-gray-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">CARDIOMETABOLIC RISK SCORE</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative w-64 h-64 mx-auto mb-6">
              {/* Speedometer Arc Background */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Green Zone (0-20) */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="20"
                  strokeDasharray="100.53 401.92"
                  strokeDashoffset="0"
                  opacity="0.3"
                />
                {/* Light Green Zone (20-40) */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="20"
                  strokeDasharray="100.53 401.92"
                  strokeDashoffset="-100.53"
                  opacity="0.3"
                />
                {/* Orange Zone (40-60) */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="20"
                  strokeDasharray="100.53 401.92"
                  strokeDashoffset="-201.06"
                  opacity="0.3"
                />
                {/* Orange-Red Zone (60-80) */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#EA580C"
                  strokeWidth="20"
                  strokeDasharray="100.53 401.92"
                  strokeDashoffset="-301.59"
                  opacity="0.3"
                />
                {/* Red Zone (80-100) */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="20"
                  strokeDasharray="100.53 401.92"
                  strokeDashoffset="-402.12"
                  opacity="0.3"
                />
                
                {/* Actual Score Indicator */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={getSpeedometerColor(results.score)}
                  strokeWidth="20"
                  strokeDasharray={`${(results.score / 100) * 502.65} 502.65`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              
              {/* Center Score Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div 
                  className="text-6xl font-bold mb-2"
                  style={{ color: getSpeedometerColor(results.score) }}
                >
                  {results.score}
                </div>
                <div className="text-sm text-gray-600 font-semibold">
                  {getSpeedometerZone(results.score)}
                </div>
              </div>
            </div>

            {/* Color Legend */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs mb-4">
              <div className="flex flex-col items-center">
                <div className="w-full h-3 rounded" style={{ backgroundColor: "#059669" }}></div>
                <span className="mt-1">0-20 OPTIMAL</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-3 rounded" style={{ backgroundColor: "#10B981" }}></div>
                <span className="mt-1">20-40 LOW</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-3 rounded" style={{ backgroundColor: "#F59E0B" }}></div>
                <span className="mt-1">40-60 MODERATE</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-3 rounded" style={{ backgroundColor: "#EA580C" }}></div>
                <span className="mt-1">60-80 HIGH</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-3 rounded" style={{ backgroundColor: "#DC2626" }}></div>
                <span className="mt-1">80-100+ CRITICAL</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Results Table */}
        <Card className="mb-6 print:shadow-none print:border print:border-gray-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Laboratory Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Parameter</th>
                    <th className="text-center py-3 px-2 font-semibold">Your Value</th>
                    <th className="text-center py-3 px-2 font-semibold">Normal Range</th>
                    <th className="text-center py-3 px-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map((test, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium">{test.parameter}</td>
                      <td className="text-center py-3 px-2">
                        {test.value ? `${test.value} ${test.unit}` : "Not provided"}
                      </td>
                      <td className="text-center py-3 px-2 text-gray-600">
                        {test.normalRange} {test.unit}
                      </td>
                      <td className={`text-center py-3 px-2 font-semibold ${test.status.color}`}>
                        {test.status.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="mb-6 print:shadow-none print:border print:border-gray-300">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Status Legend:</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Normal - Within healthy range</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>High - Above normal range</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Low - Below normal range</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded"></div>
                <span>Not provided - Value not entered</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 print:hidden">
          <Button onClick={onBack} variant="outline" className="sm:w-auto py-3 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Analysis
          </Button>
          <Button onClick={onNext} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3">
            View Health Guide
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


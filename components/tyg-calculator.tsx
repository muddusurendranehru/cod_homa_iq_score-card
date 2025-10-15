"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator } from "lucide-react"

interface TyGCalculatorProps {
  triglycerides?: number // triglycerides from database
  glucose?: number // fasting_glucose from database
}

export default function TyGCalculator({ triglycerides = 0, glucose = 0 }: TyGCalculatorProps) {
  const [triglyceridesValue, setTriglyceridesValue] = useState(triglycerides.toString())
  const [glucoseValue, setGlucoseValue] = useState(glucose.toString())
  const [result, setResult] = useState<string | null>(null)

  // EXACT FORMULA from database schema: ln(triglycerides * fasting_glucose / 2)
  const calculateTyG = (e: React.FormEvent) => {
    e.preventDefault()
    const tg = Number.parseFloat(triglyceridesValue)
    const g = Number.parseFloat(glucoseValue)

    if (!tg || tg <= 0 || !g || g <= 0) {
      setResult("Please enter valid positive numbers for both fields.")
      return
    }

    // Database field calculation: tyg_index = ln(triglycerides * fasting_glucose / 2)
    const tygIndex = Math.log((tg * g) / 2)
    const rounded = tygIndex.toFixed(2)

    let interpretation = ""
    if (tygIndex < 8.5) {
      interpretation = " - Low cardiometabolic risk"
    } else if (tygIndex < 9.0) {
      interpretation = " - Moderate cardiometabolic risk"
    } else {
      interpretation = " - High cardiometabolic risk"
    }

    setResult(`TyG Index: ${rounded}${interpretation}`)
  }

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Calculator className="h-5 w-5" />
          TyG Index Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={calculateTyG} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="triglycerides">Triglycerides (mg/dL)</Label>
              <Input
                id="triglycerides"
                type="number"
                step="0.01"
                value={triglyceridesValue}
                onChange={(e) => setTriglyceridesValue(e.target.value)}
                placeholder="150"
                required
              />
            </div>
            <div>
              <Label htmlFor="glucose">Fasting Glucose (mg/dL)</Label>
              <Input
                id="glucose"
                type="number"
                step="0.01"
                value={glucoseValue}
                onChange={(e) => setGlucoseValue(e.target.value)}
                placeholder="90"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
            Calculate TyG Index
          </Button>
        </form>
        {result && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-orange-200">
            <p className="font-semibold text-orange-800">{result}</p>
            <p className="text-xs text-gray-600 mt-1">
              Formula: ln(Triglycerides × Glucose / 2)
            </p>
            <p className="text-xs text-gray-600">Low risk: &lt; 8.5 | High risk: ≥ 9.0</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator } from "lucide-react"

interface HOMAIRCalculatorProps {
  glucose?: number // fasting_glucose from database
  insulin?: number // fasting_insulin from database
}

export default function HOMAIRCalculator({ glucose = 0, insulin = 0 }: HOMAIRCalculatorProps) {
  const [glucoseValue, setGlucoseValue] = useState(glucose.toString())
  const [insulinValue, setInsulinValue] = useState(insulin.toString())
  const [result, setResult] = useState<string | null>(null)

  // EXACT FORMULA from database schema: (fasting_glucose * fasting_insulin) / 405
  const calculateHOMAIR = (e: React.FormEvent) => {
    e.preventDefault()
    const g = Number.parseFloat(glucoseValue)
    const i = Number.parseFloat(insulinValue)

    if (!g || g <= 0 || !i || i <= 0) {
      setResult("Please enter valid positive numbers for both fields.")
      return
    }

    // Database field calculation: homa_ir = (fasting_glucose * fasting_insulin) / 405
    const homaIR = (g * i) / 405
    const rounded = homaIR.toFixed(2)

    let interpretation = ""
    if (homaIR < 1.0) {
      interpretation = " - Optimal insulin sensitivity"
    } else if (homaIR < 1.9) {
      interpretation = " - Normal insulin sensitivity"
    } else if (homaIR < 2.9) {
      interpretation = " - Early insulin resistance"
    } else {
      interpretation = " - Significant insulin resistance"
    }

    setResult(`HOMA-IR: ${rounded}${interpretation}`)
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Calculator className="h-5 w-5" />
          HOMA-IR Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={calculateHOMAIR} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <Label htmlFor="insulin">Fasting Insulin (μU/mL)</Label>
              <Input
                id="insulin"
                type="number"
                step="0.01"
                value={insulinValue}
                onChange={(e) => setInsulinValue(e.target.value)}
                placeholder="10"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Calculate HOMA-IR
          </Button>
        </form>
        {result && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
            <p className="font-semibold text-purple-800">{result}</p>
            <p className="text-xs text-gray-600 mt-1">
              Formula: (Glucose × Insulin) / 405
            </p>
            <p className="text-xs text-gray-600">Normal: &lt; 1.9 | Insulin Resistance: ≥ 2.9</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


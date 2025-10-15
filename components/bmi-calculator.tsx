"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator } from "lucide-react"

interface BMICalculatorProps {
  height?: number
  weight?: number
}

export default function BMICalculator({ height = 0, weight = 0 }: BMICalculatorProps) {
  const [heightValue, setHeightValue] = useState(height.toString())
  const [weightValue, setWeightValue] = useState(weight.toString())
  const [result, setResult] = useState<string | null>(null)

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault()
    const h = Number.parseFloat(heightValue)
    const w = Number.parseFloat(weightValue)

    if (!h || h <= 0 || !w || w <= 0) {
      setResult("Please enter valid positive numbers for both fields.")
      return
    }

    const heightInMeters = h / 100
    const bmi = w / (heightInMeters * heightInMeters)
    const roundedBMI = bmi.toFixed(1)

    let interpretation = ""
    if (bmi < 18.5) {
      interpretation = " - Underweight"
    } else if (bmi < 25) {
      interpretation = " - Normal weight"
    } else if (bmi < 30) {
      interpretation = " - Overweight"
    } else {
      interpretation = " - Obese"
    }

    setResult(`BMI: ${roundedBMI} kg/m²${interpretation}`)
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Calculator className="h-5 w-5" />
          BMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={calculateBMI} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                value={heightValue}
                onChange={(e) => setHeightValue(e.target.value)}
                placeholder="170"
                required
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={weightValue}
                onChange={(e) => setWeightValue(e.target.value)}
                placeholder="70"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Calculate BMI
          </Button>
        </form>
        {result && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
            <p className="font-semibold text-green-800">{result}</p>
            <p className="text-xs text-gray-600 mt-1">Normal BMI range: 18.5 - 24.9 kg/m²</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


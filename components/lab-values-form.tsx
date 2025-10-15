"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface LabValuesFormProps {
  onSave: (labValues: any) => void
  patientId: string
}

export default function LabValuesForm({ onSave, patientId }: LabValuesFormProps) {
  const [labValues, setLabValues] = useState({
    // CBC
    hemoglobin: "",
    hematocrit: "",
    rbc_count: "",
    wbc_count: "",
    platelet_count: "",

    // Lipid Profile
    total_cholesterol_mg: "",
    ldl_cholesterol: "",
    hdl_cholesterol: "",
    triglycerides: "",

    // Liver Function
    alt_sgpt: "",
    ast_sgot: "",
    total_bilirubin: "",
    albumin: "",

    // Kidney Function
    urea: "",
    creatinine: "",
    uric_acid: "",

    // Thyroid
    tsh: "",
    t3: "",
    t4: "",

    // Diabetes
    fasting_glucose: "",
    hba1c: "",
    c_peptide: "",

    // Vitamins
    vitamin_d: "",
    vitamin_b12: "",

    // Others
    esr: "",
    crp: "",
    lab_notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setLabValues((prev) => ({ ...prev, [field]: value }))
  }

  const getNormalRange = (test: string) => {
    const ranges: { [key: string]: string } = {
      hemoglobin: "12-16 g/dL (F), 14-18 g/dL (M)",
      total_cholesterol_mg: "<200 mg/dL",
      ldl_cholesterol: "<100 mg/dL",
      hdl_cholesterol: ">40 mg/dL (M), >50 mg/dL (F)",
      triglycerides: "<150 mg/dL",
      fasting_glucose: "70-100 mg/dL",
      hba1c: "<5.7%",
      creatinine: "0.6-1.2 mg/dL",
      tsh: "0.4-4.0 mIU/L",
      vitamin_d: "30-100 ng/mL",
      alt_sgpt: "<40 U/L",
      ast_sgot: "<40 U/L",
    }
    return ranges[test] || ""
  }

  const isAbnormal = (test: string, value: string) => {
    if (!value) return false
    const numValue = Number.parseFloat(value)

    const abnormalRanges: { [key: string]: { min?: number; max?: number } } = {
      hemoglobin: { min: 12, max: 18 },
      total_cholesterol_mg: { max: 200 },
      ldl_cholesterol: { max: 100 },
      hdl_cholesterol: { min: 40 },
      triglycerides: { max: 150 },
      fasting_glucose: { min: 70, max: 100 },
      creatinine: { min: 0.6, max: 1.2 },
      tsh: { min: 0.4, max: 4.0 },
    }

    const range = abnormalRanges[test]
    if (!range) return false

    return (range.min && numValue < range.min) || (range.max && numValue > range.max)
  }

  const handleSubmit = () => {
    onSave(labValues)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Comprehensive Lab Values Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cbc" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="cbc">CBC</TabsTrigger>
            <TabsTrigger value="lipid">Lipid</TabsTrigger>
            <TabsTrigger value="liver">Liver</TabsTrigger>
            <TabsTrigger value="kidney">Kidney</TabsTrigger>
            <TabsTrigger value="thyroid">Thyroid</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
          </TabsList>

          <TabsContent value="cbc" className="space-y-4">
            <h3 className="text-lg font-semibold">Complete Blood Count</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "hemoglobin", label: "Hemoglobin", unit: "g/dL" },
                { key: "hematocrit", label: "Hematocrit", unit: "%" },
                { key: "rbc_count", label: "RBC Count", unit: "million/μL" },
                { key: "wbc_count", label: "WBC Count", unit: "/μL" },
                { key: "platelet_count", label: "Platelet Count", unit: "/μL" },
              ].map(({ key, label, unit }) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="flex items-center gap-2">
                    {label} ({unit})
                    {isAbnormal(key, labValues[key as keyof typeof labValues]) && (
                      <Badge variant="destructive" className="text-xs">
                        Abnormal
                      </Badge>
                    )}
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    step="0.1"
                    value={labValues[key as keyof typeof labValues]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder={getNormalRange(key)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lipid" className="space-y-4">
            <h3 className="text-lg font-semibold">Lipid Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "total_cholesterol_mg", label: "Total Cholesterol", unit: "mg/dL" },
                { key: "ldl_cholesterol", label: "LDL Cholesterol", unit: "mg/dL" },
                { key: "hdl_cholesterol", label: "HDL Cholesterol", unit: "mg/dL" },
                { key: "triglycerides", label: "Triglycerides", unit: "mg/dL" },
              ].map(({ key, label, unit }) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="flex items-center gap-2">
                    {label} ({unit})
                    {isAbnormal(key, labValues[key as keyof typeof labValues]) && (
                      <Badge variant="destructive" className="text-xs">
                        Abnormal
                      </Badge>
                    )}
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    step="0.1"
                    value={labValues[key as keyof typeof labValues]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder={getNormalRange(key)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liver" className="space-y-4">
            <h3 className="text-lg font-semibold">Liver Function Tests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "alt_sgpt", label: "ALT (SGPT)", unit: "U/L" },
                { key: "ast_sgot", label: "AST (SGOT)", unit: "U/L" },
                { key: "total_bilirubin", label: "Total Bilirubin", unit: "mg/dL" },
                { key: "albumin", label: "Albumin", unit: "g/dL" },
              ].map(({ key, label, unit }) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="flex items-center gap-2">
                    {label} ({unit})
                    {isAbnormal(key, labValues[key as keyof typeof labValues]) && (
                      <Badge variant="destructive" className="text-xs">
                        Abnormal
                      </Badge>
                    )}
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    step="0.1"
                    value={labValues[key as keyof typeof labValues]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder={getNormalRange(key)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="kidney" className="space-y-4">
            <h3 className="text-lg font-semibold">Kidney Function Tests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "urea", label: "Urea", unit: "mg/dL" },
                { key: "creatinine", label: "Creatinine", unit: "mg/dL" },
                { key: "uric_acid", label: "Uric Acid", unit: "mg/dL" },
              ].map(({ key, label, unit }) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="flex items-center gap-2">
                    {label} ({unit})
                    {isAbnormal(key, labValues[key as keyof typeof labValues]) && (
                      <Badge variant="destructive" className="text-xs">
                        Abnormal
                      </Badge>
                    )}
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    step="0.1"
                    value={labValues[key as keyof typeof labValues]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder={getNormalRange(key)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="thyroid" className="space-y-4">
            <h3 className="text-lg font-semibold">Thyroid Function Tests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "tsh", label: "TSH", unit: "mIU/L" },
                { key: "t3", label: "T3", unit: "ng/mL" },
                { key: "t4", label: "T4", unit: "μg/dL" },
              ].map(({ key, label, unit }) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="flex items-center gap-2">
                    {label} ({unit})
                    {isAbnormal(key, labValues[key as keyof typeof labValues]) && (
                      <Badge variant="destructive" className="text-xs">
                        Abnormal
                      </Badge>
                    )}
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    step="0.01"
                    value={labValues[key as keyof typeof labValues]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder={getNormalRange(key)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="others" className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Tests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "vitamin_d", label: "Vitamin D", unit: "ng/mL" },
                { key: "vitamin_b12", label: "Vitamin B12", unit: "pg/mL" },
                { key: "esr", label: "ESR", unit: "mm/hr" },
                { key: "crp", label: "CRP", unit: "mg/L" },
              ].map(({ key, label, unit }) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="flex items-center gap-2">
                    {label} ({unit})
                    {isAbnormal(key, labValues[key as keyof typeof labValues]) && (
                      <Badge variant="destructive" className="text-xs">
                        Abnormal
                      </Badge>
                    )}
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    step="0.1"
                    value={labValues[key as keyof typeof labValues]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder={getNormalRange(key)}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lab_notes">Lab Notes</Label>
              <textarea
                id="lab_notes"
                className="w-full p-2 border rounded-md"
                rows={3}
                value={labValues.lab_notes}
                onChange={(e) => handleInputChange("lab_notes", e.target.value)}
                placeholder="Additional notes about the lab results..."
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-center">
          <Button onClick={handleSubmit} className="px-8 py-2">
            Save Lab Values
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

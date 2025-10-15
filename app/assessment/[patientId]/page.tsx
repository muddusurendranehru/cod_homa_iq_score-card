"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Activity, Save, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

// CRITICAL: All field names MUST match database schema exactly (snake_case)
interface AssessmentData {
  patient_id: number
  // Basic Measurements
  height?: number
  weight?: number
  bmi?: number // CALCULATED
  waist_circumference?: number
  // Vital Signs
  systolic_bp?: number
  diastolic_bp?: number
  heart_rate?: number
  // Metabolic Panel
  fasting_glucose?: number
  fasting_insulin?: number
  hba1c?: number
  c_peptide?: number
  post_lunch_blood_sugar?: number
  homa_ir?: number // CALCULATED
  // Lipid Profile
  total_cholesterol?: number
  ldl_cholesterol?: number
  hdl_cholesterol?: number
  triglycerides?: number
  vldl_cholesterol?: number
  tyg_index?: number // CALCULATED
  // CBC
  hemoglobin?: number
  hematocrit?: number
  rbc_count?: number
  wbc_count?: number
  platelet_count?: number
  // LFT
  sgpt_alt?: number
  sgot_ast?: number
  alkaline_phosphatase?: number
  total_bilirubin?: number
  // KFT
  creatinine?: number
  blood_urea?: number
  uric_acid?: number
  // TFT
  tsh?: number
  t3?: number
  t4?: number
  // Past History (Tick Boxes - EXACT field names from database)
  history_cag?: boolean
  history_ptca?: boolean
  history_cva?: boolean
  history_alcohol?: boolean
  history_smoker?: boolean
  history_drugs?: boolean
  history_menopause?: boolean
  history_cancer?: boolean
  // Family History
  family_diabetes?: boolean
  family_hypertension?: boolean
  family_heart_disease?: boolean
  // Scoring (calculated on backend/frontend)
  total_score?: number
  waist_score?: number
  speedometer_zone?: string
  risk_category?: string
  // Notes
  lab_notes?: string
}

export default function AssessmentPage() {
  const router = useRouter()
  const params = useParams()
  const patientId = parseInt(params.patientId as string)

  const [isLoading, setIsLoading] = useState(false)
  const [patient, setPatient] = useState<any>(null)
  const [formData, setFormData] = useState<AssessmentData>({
    patient_id: patientId,
  })

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem("auth_token")
    if (!token) {
      toast.error("Please login to access this page")
      router.push("/login")
      return
    }

    // Fetch patient details
    fetchPatient()
  }, [patientId, router])

  const fetchPatient = async () => {
    try {
      const response = await fetch(`/api/patients/${patientId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch patient")

      const data = await response.json()
      setPatient(data.patient)
    } catch (error) {
      console.error("Error fetching patient:", error)
      toast.error("Failed to load patient details")
      router.push("/dashboard")
    }
  }

  const handleInputChange = (field: keyof AssessmentData, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Calculate BMI when height and weight change
  useEffect(() => {
    if (formData.height && formData.weight && formData.height > 0 && formData.weight > 0) {
      const heightInMeters = formData.height / 100
      const bmi = formData.weight / (heightInMeters * heightInMeters)
      setFormData((prev) => ({ ...prev, bmi: parseFloat(bmi.toFixed(2)) }))
    }
  }, [formData.height, formData.weight])

  // Calculate HOMA-IR
  useEffect(() => {
    if (formData.fasting_glucose && formData.fasting_insulin) {
      const homa_ir = (formData.fasting_glucose * formData.fasting_insulin) / 405
      setFormData((prev) => ({ ...prev, homa_ir: parseFloat(homa_ir.toFixed(2)) }))
    }
  }, [formData.fasting_glucose, formData.fasting_insulin])

  // Calculate TYG Index
  useEffect(() => {
    if (formData.triglycerides && formData.fasting_glucose) {
      const tyg_index = Math.log((formData.triglycerides * formData.fasting_glucose) / 2)
      setFormData((prev) => ({ ...prev, tyg_index: parseFloat(tyg_index.toFixed(2)) }))
    }
  }, [formData.triglycerides, formData.fasting_glucose])

  // Calculate Waist Score
  useEffect(() => {
    if (formData.waist_circumference) {
      const waist_score = formData.waist_circumference > 85 ? 20 : 0
      setFormData((prev) => ({ ...prev, waist_score }))
    }
  }, [formData.waist_circumference])

  // Calculate Total Score and Speedometer Zone
  useEffect(() => {
    let score = formData.waist_score || 0
    
    // Add 10 points for each past history item checked
    if (formData.history_alcohol) score += 10
    if (formData.history_smoker) score += 10
    if (formData.history_cag) score += 10
    if (formData.history_ptca) score += 10
    if (formData.history_cva) score += 10
    if (formData.history_drugs) score += 10
    if (formData.history_cancer) score += 10
    if (formData.history_menopause) score += 10

    // Add 5 points for each family history item checked (NEW)
    if (formData.family_diabetes) score += 5
    if (formData.family_hypertension) score += 5
    if (formData.family_heart_disease) score += 5

    // Add 10 points if HOMA-IR > 2.5 (NEW)
    if (formData.homa_ir && formData.homa_ir > 2.5) score += 10

    // Add 10 points if TYG-INDEX > 8.5 (NEW)
    if (formData.tyg_index && formData.tyg_index > 8.5) score += 10

    // Add 5 points for each abnormal blood test (NEW)
    // CBC
    if (formData.hemoglobin && (formData.hemoglobin < 12 || formData.hemoglobin > 18)) score += 5
    if (formData.wbc_count && (formData.wbc_count < 4 || formData.wbc_count > 11)) score += 5
    if (formData.platelet_count && (formData.platelet_count < 150 || formData.platelet_count > 400)) score += 5
    
    // Lipid Profile
    if (formData.total_cholesterol && formData.total_cholesterol > 200) score += 5
    if (formData.ldl_cholesterol && formData.ldl_cholesterol > 100) score += 5
    if (formData.hdl_cholesterol && formData.hdl_cholesterol < 40) score += 5
    if (formData.triglycerides && formData.triglycerides > 150) score += 5
    
    // LFT
    if (formData.sgpt_alt && formData.sgpt_alt > 40) score += 5
    if (formData.sgot_ast && formData.sgot_ast > 40) score += 5
    
    // KFT
    if (formData.creatinine && (formData.creatinine < 0.6 || formData.creatinine > 1.2)) score += 5
    if (formData.uric_acid && formData.uric_acid > 7) score += 5
    
    // TFT
    if (formData.tsh && (formData.tsh < 0.4 || formData.tsh > 4.0)) score += 5

    setFormData((prev) => {
      const total_score = score
      let speedometer_zone = "green"
      let risk_category = "low"

      if (total_score >= 80) {
        speedometer_zone = "red"
        risk_category = "very_high"
      } else if (total_score >= 60) {
        speedometer_zone = "orange_red"
        risk_category = "high"
      } else if (total_score >= 40) {
        speedometer_zone = "blue_red"
        risk_category = "moderate"
      }

      return { ...prev, total_score, speedometer_zone, risk_category }
    })
  }, [
    formData.waist_score,
    formData.history_alcohol,
    formData.history_smoker,
    formData.history_cag,
    formData.history_ptca,
    formData.history_cva,
    formData.history_drugs,
    formData.history_cancer,
    formData.history_menopause,
    formData.family_diabetes,
    formData.family_hypertension,
    formData.family_heart_disease,
    formData.homa_ir,
    formData.tyg_index,
    formData.hemoglobin,
    formData.wbc_count,
    formData.platelet_count,
    formData.total_cholesterol,
    formData.ldl_cholesterol,
    formData.hdl_cholesterol,
    formData.triglycerides,
    formData.sgpt_alt,
    formData.sgot_ast,
    formData.creatinine,
    formData.uric_acid,
    formData.tsh,
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save assessment")
      }

      toast.success("Assessment saved successfully!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving assessment:", error)
      toast.error(error instanceof Error ? error.message : "Failed to save assessment")
    } finally {
      setIsLoading(false)
    }
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-lg">Loading patient details...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Health Assessment</h1>
              <p className="text-xs text-gray-600">
                Patient: {patient.name} ({patient.age}y, {patient.sex})
              </p>
            </div>
          </div>
          <Button onClick={() => router.push("/dashboard")} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
          {/* SECTION 1: BASIC MEASUREMENTS */}
          <Card>
            <CardHeader>
              <CardTitle>1. Basic Measurements</CardTitle>
              <CardDescription>Height, weight, waist circumference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm) *</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.01"
                    value={formData.height || ""}
                    onChange={(e) => handleInputChange("height", parseFloat(e.target.value))}
                    placeholder="175"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    value={formData.weight || ""}
                    onChange={(e) => handleInputChange("weight", parseFloat(e.target.value))}
                    placeholder="70"
                  />
                </div>
                <div>
                  <Label htmlFor="bmi">BMI (Calculated)</Label>
                  <Input
                    id="bmi"
                    type="text"
                    value={formData.bmi || ""}
                    readOnly
                    className="bg-gray-100"
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <Label htmlFor="waist_circumference">Waist Circumference (cm)</Label>
                  <Input
                    id="waist_circumference"
                    type="number"
                    step="0.01"
                    value={formData.waist_circumference || ""}
                    onChange={(e) => handleInputChange("waist_circumference", parseFloat(e.target.value))}
                    placeholder="92"
                  />
                  <p className="text-xs text-gray-500 mt-1">&gt;85cm = 20 points</p>
                </div>
                <div>
                  <Label>Waist Score (Calculated)</Label>
                  <div className="text-lg font-bold text-blue-600 mt-2">{formData.waist_score || 0} points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 2: VITAL SIGNS */}
          <Card>
            <CardHeader>
              <CardTitle>2. Vital Signs</CardTitle>
              <CardDescription>Blood pressure and heart rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="systolic_bp">Systolic BP (mmHg)</Label>
                  <Input
                    id="systolic_bp"
                    type="number"
                    value={formData.systolic_bp || ""}
                    onChange={(e) => handleInputChange("systolic_bp", parseInt(e.target.value))}
                    placeholder="130"
                  />
                </div>
                <div>
                  <Label htmlFor="diastolic_bp">Diastolic BP (mmHg)</Label>
                  <Input
                    id="diastolic_bp"
                    type="number"
                    value={formData.diastolic_bp || ""}
                    onChange={(e) => handleInputChange("diastolic_bp", parseInt(e.target.value))}
                    placeholder="85"
                  />
                </div>
                <div>
                  <Label htmlFor="heart_rate">Heart Rate (bpm)</Label>
                  <Input
                    id="heart_rate"
                    type="number"
                    value={formData.heart_rate || ""}
                    onChange={(e) => handleInputChange("heart_rate", parseInt(e.target.value))}
                    placeholder="72"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 3: METABOLIC PANEL */}
          <Card>
            <CardHeader>
              <CardTitle>3. Metabolic Panel</CardTitle>
              <CardDescription>Glucose, insulin, HbA1c, HOMA-IR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fasting_glucose">Fasting Glucose (mg/dL)</Label>
                  <Input
                    id="fasting_glucose"
                    type="number"
                    step="0.01"
                    value={formData.fasting_glucose || ""}
                    onChange={(e) => handleInputChange("fasting_glucose", parseFloat(e.target.value))}
                    placeholder="90"
                  />
                </div>
                <div>
                  <Label htmlFor="fasting_insulin">Fasting Insulin (μU/mL)</Label>
                  <Input
                    id="fasting_insulin"
                    type="number"
                    step="0.01"
                    value={formData.fasting_insulin || ""}
                    onChange={(e) => handleInputChange("fasting_insulin", parseFloat(e.target.value))}
                    placeholder="10"
                  />
                </div>
                <div>
                  <Label htmlFor="homa_ir">HOMA-IR (Calculated)</Label>
                  <Input
                    id="homa_ir"
                    type="text"
                    value={formData.homa_ir || ""}
                    readOnly
                    className="bg-gray-100"
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <Label htmlFor="hba1c">HbA1c (%)</Label>
                  <Input
                    id="hba1c"
                    type="number"
                    step="0.01"
                    value={formData.hba1c || ""}
                    onChange={(e) => handleInputChange("hba1c", parseFloat(e.target.value))}
                    placeholder="5.7"
                  />
                </div>
                <div>
                  <Label htmlFor="c_peptide">C-Peptide (ng/mL)</Label>
                  <Input
                    id="c_peptide"
                    type="number"
                    step="0.01"
                    value={formData.c_peptide || ""}
                    onChange={(e) => handleInputChange("c_peptide", parseFloat(e.target.value))}
                    placeholder="2.5"
                  />
                </div>
                <div>
                  <Label htmlFor="post_lunch_blood_sugar">Post-Lunch Blood Sugar (mg/dL)</Label>
                  <Input
                    id="post_lunch_blood_sugar"
                    type="number"
                    step="0.01"
                    value={formData.post_lunch_blood_sugar || ""}
                    onChange={(e) => handleInputChange("post_lunch_blood_sugar", parseFloat(e.target.value))}
                    placeholder="140"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 4: LIPID PROFILE */}
          <Card>
            <CardHeader>
              <CardTitle>4. Lipid Profile</CardTitle>
              <CardDescription>Cholesterol, triglycerides, TYG-INDEX</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="total_cholesterol">Total Cholesterol (mg/dL)</Label>
                  <Input
                    id="total_cholesterol"
                    type="number"
                    step="0.01"
                    value={formData.total_cholesterol || ""}
                    onChange={(e) => handleInputChange("total_cholesterol", parseFloat(e.target.value))}
                    placeholder="200"
                  />
                </div>
                <div>
                  <Label htmlFor="ldl_cholesterol">LDL Cholesterol (mg/dL)</Label>
                  <Input
                    id="ldl_cholesterol"
                    type="number"
                    step="0.01"
                    value={formData.ldl_cholesterol || ""}
                    onChange={(e) => handleInputChange("ldl_cholesterol", parseFloat(e.target.value))}
                    placeholder="120"
                  />
                </div>
                <div>
                  <Label htmlFor="hdl_cholesterol">HDL Cholesterol (mg/dL)</Label>
                  <Input
                    id="hdl_cholesterol"
                    type="number"
                    step="0.01"
                    value={formData.hdl_cholesterol || ""}
                    onChange={(e) => handleInputChange("hdl_cholesterol", parseFloat(e.target.value))}
                    placeholder="45"
                  />
                </div>
                <div>
                  <Label htmlFor="triglycerides">Triglycerides (mg/dL)</Label>
                  <Input
                    id="triglycerides"
                    type="number"
                    step="0.01"
                    value={formData.triglycerides || ""}
                    onChange={(e) => handleInputChange("triglycerides", parseFloat(e.target.value))}
                    placeholder="150"
                  />
                </div>
                <div>
                  <Label htmlFor="vldl_cholesterol">VLDL Cholesterol (mg/dL)</Label>
                  <Input
                    id="vldl_cholesterol"
                    type="number"
                    step="0.01"
                    value={formData.vldl_cholesterol || ""}
                    onChange={(e) => handleInputChange("vldl_cholesterol", parseFloat(e.target.value))}
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label htmlFor="tyg_index">TYG-INDEX (Calculated)</Label>
                  <Input
                    id="tyg_index"
                    type="text"
                    value={formData.tyg_index || ""}
                    readOnly
                    className="bg-gray-100"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 5: PAST HISTORY (CHECKBOXES) - CRITICAL! */}
          <Card className="border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">5. Past History (Tick Boxes)</CardTitle>
              <CardDescription>Check all that apply - each adds 10 points to scoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="history_cag"
                    checked={formData.history_cag || false}
                    onCheckedChange={(checked) => handleInputChange("history_cag", checked as boolean)}
                  />
                  <label htmlFor="history_cag" className="text-sm font-medium cursor-pointer">
                    CAG (Coronary Angiography)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="history_ptca"
                    checked={formData.history_ptca || false}
                    onCheckedChange={(checked) => handleInputChange("history_ptca", checked as boolean)}
                  />
                  <label htmlFor="history_ptca" className="text-sm font-medium cursor-pointer">
                    PTCA
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="history_cva"
                    checked={formData.history_cva || false}
                    onCheckedChange={(checked) => handleInputChange("history_cva", checked as boolean)}
                  />
                  <label htmlFor="history_cva" className="text-sm font-medium cursor-pointer">
                    CVA (Cerebrovascular Accident / Stroke)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="history_alcohol"
                    checked={formData.history_alcohol || false}
                    onCheckedChange={(checked) => handleInputChange("history_alcohol", checked as boolean)}
                  />
                  <label htmlFor="history_alcohol" className="text-sm font-medium cursor-pointer">
                    Alcohol Use
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="history_smoker"
                    checked={formData.history_smoker || false}
                    onCheckedChange={(checked) => handleInputChange("history_smoker", checked as boolean)}
                  />
                  <label htmlFor="history_smoker" className="text-sm font-medium cursor-pointer">
                    Smoker
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="history_drugs"
                    checked={formData.history_drugs || false}
                    onCheckedChange={(checked) => handleInputChange("history_drugs", checked as boolean)}
                  />
                  <label htmlFor="history_drugs" className="text-sm font-medium cursor-pointer">
                    Drug Use
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="history_menopause"
                    checked={formData.history_menopause || false}
                    onCheckedChange={(checked) => handleInputChange("history_menopause", checked as boolean)}
                  />
                  <label htmlFor="history_menopause" className="text-sm font-medium cursor-pointer">
                    Menopause (for women)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="history_cancer"
                    checked={formData.history_cancer || false}
                    onCheckedChange={(checked) => handleInputChange("history_cancer", checked as boolean)}
                  />
                  <label htmlFor="history_cancer" className="text-sm font-medium cursor-pointer">
                    Cancer History
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 5.5: FAMILY HISTORY (NEW) */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-700">5.5 Family History</CardTitle>
              <CardDescription>Check all that apply - each adds 5 points to scoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="family_diabetes"
                    checked={formData.family_diabetes || false}
                    onCheckedChange={(checked) => handleInputChange("family_diabetes", checked as boolean)}
                  />
                  <label htmlFor="family_diabetes" className="text-sm font-medium cursor-pointer">
                    Family History of Diabetes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="family_hypertension"
                    checked={formData.family_hypertension || false}
                    onCheckedChange={(checked) => handleInputChange("family_hypertension", checked as boolean)}
                  />
                  <label htmlFor="family_hypertension" className="text-sm font-medium cursor-pointer">
                    Family History of Hypertension
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="family_heart_disease"
                    checked={formData.family_heart_disease || false}
                    onCheckedChange={(checked) => handleInputChange("family_heart_disease", checked as boolean)}
                  />
                  <label htmlFor="family_heart_disease" className="text-sm font-medium cursor-pointer">
                    Family History of Heart Disease
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 6: SCORING DISPLAY */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300">
            <CardHeader>
              <CardTitle>6. Risk Scoring (Auto-Calculated)</CardTitle>
              <CardDescription>Based on waist, past history, family history, HOMA-IR, TYG-INDEX, and blood tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-600 mb-2">{formData.total_score || 0}</div>
                    <div className="text-sm text-gray-600">Total Score (0-100)</div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Waist Score:</span>
                      <span className="font-semibold">{formData.waist_score || 0} pts</span>
                    </div>
                    <div className="text-xs text-gray-500">Waist &gt;85cm = 20 points</div>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    <div>
                      <Label>Speedometer Zone</Label>
                      <div className={`p-3 rounded-lg text-center font-bold text-lg ${
                        formData.speedometer_zone === 'red' ? 'bg-red-100 text-red-700' :
                        formData.speedometer_zone === 'orange_red' ? 'bg-orange-100 text-orange-700' :
                        formData.speedometer_zone === 'blue_red' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {formData.speedometer_zone?.toUpperCase().replace('_', '-') || 'GREEN'}
                      </div>
                    </div>
                    <div>
                      <Label>Risk Category</Label>
                      <div className={`p-3 rounded-lg text-center font-bold ${
                        formData.risk_category === 'very_high' ? 'bg-red-100 text-red-700' :
                        formData.risk_category === 'high' ? 'bg-orange-100 text-orange-700' :
                        formData.risk_category === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {formData.risk_category?.toUpperCase().replace('_', ' ') || 'LOW'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 7: LAB NOTES */}
          <Card>
            <CardHeader>
              <CardTitle>7. Lab Notes & Observations</CardTitle>
              <CardDescription>Additional comments and observations</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="lab_notes">Lab Notes (Optional)</Label>
              <textarea
                id="lab_notes"
                className="w-full min-h-[100px] p-3 border rounded-md"
                value={formData.lab_notes || ""}
                onChange={(e) => handleInputChange("lab_notes", e.target.value)}
                placeholder="Enter any additional observations, critical values, or notes..."
              />
            </CardContent>
          </Card>

          {/* SUBMIT BUTTONS */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Complete Assessment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


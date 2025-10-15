"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Activity, LogOut, Plus, Users, FileText, Search } from "lucide-react"
import { toast } from "sonner"

interface Patient {
  id: number
  name: string
  age: number
  sex: string
  phone?: string
  email?: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [patients, setPatients] = useState<Patient[]>([])
  const [showAddPatient, setShowAddPatient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatientData, setSelectedPatientData] = useState<any>(null)
  const [showDataModal, setShowDataModal] = useState(false)
  const [patientForm, setPatientForm] = useState({
    name: "",
    age: "",
    sex: "",
    phone: "",
    email: "",
  })

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem("auth_token")
    const name = localStorage.getItem("user_name")
    
    if (!token) {
      toast.error("Please login to access dashboard")
      router.push("/login")
      return
    }

    setUserName(name || "User")
    fetchPatients()
  }, [router])

  const fetchPatients = async () => {
    try {
      const response = await fetch("/api/patients", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch patients")
      }

      const data = await response.json()
      setPatients(data.patients || [])
    } catch (error) {
      console.error("Error fetching patients:", error)
      toast.error("Failed to load patients")
    }
  }

  const handlePatientFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientForm({
      ...patientForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation
    if (!patientForm.name || !patientForm.age || !patientForm.sex) {
      toast.error("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({
          name: patientForm.name,
          age: parseInt(patientForm.age),
          sex: patientForm.sex,
          phone: patientForm.phone || undefined,
          email: patientForm.email || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to add patient")
      }

      toast.success("Patient added successfully!")
      setShowAddPatient(false)
      setPatientForm({ name: "", age: "", sex: "", phone: "", email: "" })
      fetchPatients()
    } catch (error) {
      console.error("Error adding patient:", error)
      toast.error(error instanceof Error ? error.message : "Failed to add patient")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_role")
    localStorage.removeItem("user_name")
    localStorage.removeItem("user_id")
    toast.success("Logged out successfully")
    router.push("/login")
  }

  const fetchPatientAssessments = async (patientId: number) => {
    try {
      const response = await fetch(`/api/patients/${patientId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch patient data")

      const data = await response.json()
      
      // Fetch assessments for this patient
      const assessmentsResponse = await fetch(`/api/assessments?patient_id=${patientId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })

      const assessmentsData = await assessmentsResponse.json()
      
      setSelectedPatientData({
        patient: data.patient,
        assessments: assessmentsData.assessments || []
      })
      setShowDataModal(true)
    } catch (error) {
      console.error("Error fetching patient data:", error)
      toast.error("Failed to load patient data")
    }
  }

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone?.includes(searchTerm)
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">C.O.D. H.O.M.A I.Q TEST</h1>
              <p className="text-xs text-gray-600">Staff Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, <strong>{userName}</strong></span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{patients.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Assessments</CardTitle>
              <FileText className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">-</div>
              <p className="text-xs text-gray-500 mt-1">Coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Database Status</CardTitle>
              <Activity className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold text-green-600">✓ Connected</div>
              <p className="text-xs text-gray-500 mt-1">COD_HOMA_IQ_SCORE</p>
            </CardContent>
          </Card>
        </div>

        {/* Patients Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Patient Management
                </CardTitle>
                <CardDescription>View and manage patient records</CardDescription>
              </div>
              <Button onClick={() => setShowAddPatient(!showAddPatient)} className="gap-2">
                <Plus className="h-4 w-4" />
                {showAddPatient ? "Cancel" : "Add Patient"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Add Patient Form */}
            {showAddPatient && (
              <form onSubmit={handleAddPatient} className="mb-6 p-4 bg-blue-50 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg mb-4">Add New Patient</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={patientForm.name}
                      onChange={handlePatientFormChange}
                      placeholder="Rajesh Kumar"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={patientForm.age}
                      onChange={handlePatientFormChange}
                      placeholder="45"
                      required
                      disabled={isLoading}
                      min="0"
                      max="150"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sex">Sex *</Label>
                    <Select
                      value={patientForm.sex}
                      onValueChange={(value) => setPatientForm({ ...patientForm, sex: value })}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={patientForm.phone}
                      onChange={handlePatientFormChange}
                      placeholder="+919963721999"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={patientForm.email}
                      onChange={handlePatientFormChange}
                      placeholder="patient@example.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Patient"}
                </Button>
              </form>
            )}

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search patients by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Patients Table */}
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Sex</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                        {patients.length === 0
                          ? "No patients yet. Add your first patient above."
                          : "No patients found matching your search."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell className="capitalize">{patient.sex}</TableCell>
                        <TableCell>{patient.phone || "-"}</TableCell>
                        <TableCell>{patient.email || "-"}</TableCell>
                        <TableCell>{new Date(patient.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => router.push(`/assessment/${patient.id}`)}
                            >
                              New Assessment
                            </Button>
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => fetchPatientAssessments(patient.id)}
                            >
                              View Data
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Modal */}
      {showDataModal && selectedPatientData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Patient Data: {selectedPatientData.patient.name}
                </h2>
                <Button variant="outline" onClick={() => setShowDataModal(false)}>
                  Close
                </Button>
              </div>

              {/* Patient Info */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div><strong>Name:</strong> {selectedPatientData.patient.name}</div>
                    <div><strong>Age:</strong> {selectedPatientData.patient.age}</div>
                    <div><strong>Sex:</strong> {selectedPatientData.patient.sex}</div>
                    <div><strong>Phone:</strong> {selectedPatientData.patient.phone || "-"}</div>
                    <div><strong>Email:</strong> {selectedPatientData.patient.email || "-"}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Assessments */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Assessments ({selectedPatientData.assessments.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedPatientData.assessments.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No assessments recorded yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {selectedPatientData.assessments.map((assessment: any) => (
                        <div key={assessment.id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                            <div className="col-span-2 md:col-span-3 font-semibold text-lg mb-2">
                              Assessment Date: {new Date(assessment.assessment_date).toLocaleDateString()}
                            </div>
                            
                            {assessment.height && <div><strong>Height:</strong> {assessment.height} cm</div>}
                            {assessment.weight && <div><strong>Weight:</strong> {assessment.weight} kg</div>}
                            {assessment.bmi && <div><strong>BMI:</strong> {assessment.bmi}</div>}
                            {assessment.waist_circumference && <div><strong>Waist:</strong> {assessment.waist_circumference} cm</div>}
                            {assessment.systolic_bp && <div><strong>BP:</strong> {assessment.systolic_bp}/{assessment.diastolic_bp} mmHg</div>}
                            {assessment.heart_rate && <div><strong>Heart Rate:</strong> {assessment.heart_rate} bpm</div>}
                            {assessment.fasting_glucose && <div><strong>Glucose:</strong> {assessment.fasting_glucose} mg/dL</div>}
                            {assessment.fasting_insulin && <div><strong>Insulin:</strong> {assessment.fasting_insulin} μU/mL</div>}
                            {assessment.homa_ir && <div><strong>HOMA-IR:</strong> {assessment.homa_ir}</div>}
                            {assessment.total_cholesterol && <div><strong>Total Chol:</strong> {assessment.total_cholesterol} mg/dL</div>}
                            {assessment.triglycerides && <div><strong>Triglycerides:</strong> {assessment.triglycerides} mg/dL</div>}
                            {assessment.tyg_index && <div><strong>TYG-INDEX:</strong> {assessment.tyg_index}</div>}
                            
                            <div className="col-span-2 md:col-span-3 mt-3 pt-3 border-t">
                              <div className="flex items-center justify-between">
                                <div>
                                  <strong>Total Score:</strong> 
                                  <span className={`ml-2 text-xl font-bold ${
                                    assessment.total_score >= 80 ? 'text-red-600' :
                                    assessment.total_score >= 60 ? 'text-orange-600' :
                                    assessment.total_score >= 40 ? 'text-blue-600' :
                                    'text-green-600'
                                  }`}>
                                    {assessment.total_score || 0}
                                  </span>
                                </div>
                                <div>
                                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    assessment.speedometer_zone === 'red' ? 'bg-red-100 text-red-700' :
                                    assessment.speedometer_zone === 'orange_red' ? 'bg-orange-100 text-orange-700' :
                                    assessment.speedometer_zone === 'blue_red' ? 'bg-blue-100 text-blue-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {assessment.speedometer_zone?.toUpperCase().replace('_', '-') || 'GREEN'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {assessment.lab_notes && (
                              <div className="col-span-2 md:col-span-3 mt-2">
                                <strong>Notes:</strong> {assessment.lab_notes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 py-8 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="font-semibold">Dr. Muddu Surendra Nehru MD</p>
          <p className="text-sm">Professor of Medicine | Homa Health Care Center</p>
          <p className="text-sm mt-2">Contact: 09963721999 | www.homahealthcarecenter.in</p>
        </div>
      </footer>
    </div>
  )
}


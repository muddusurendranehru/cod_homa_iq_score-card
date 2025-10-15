import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, FileText, Users, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">C.O.D. H.O.M.A I.Q TEST</h1>
              <p className="text-xs text-gray-600">Cardiometabolic Risk Assessment</p>
            </div>
          </div>
          <Link href="/login">
            <Button variant="outline">Staff Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Cardiometabolic Risk Assessment
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Comprehensive health evaluation system by Dr. Muddu Surendra Nehru MD, Professor of Medicine
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/login">
            <Button size="lg" className="gap-2">
              <FileText className="h-5 w-5" />
              Start Assessment
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline" className="gap-2">
              <Users className="h-5 w-5" />
              Create Staff Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Comprehensive Health Assessment</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-blue-600" />
                Complete Health Profile
              </CardTitle>
              <CardDescription>
                Track vital signs, BMI, blood pressure, and comprehensive metabolic parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Height, Weight & BMI Calculation</li>
                <li>• Blood Pressure Monitoring</li>
                <li>• Waist Circumference Tracking</li>
                <li>• Heart Rate Assessment</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                Laboratory Analysis
              </CardTitle>
              <CardDescription>
                Complete blood work including metabolic, lipid, liver, kidney, and thyroid panels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Complete Blood Count (CBC)</li>
                <li>• Lipid Profile Analysis</li>
                <li>• Liver & Kidney Function Tests</li>
                <li>• Thyroid Function Panel</li>
                <li>• HOMA-IR Calculation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                Risk Assessment
              </CardTitle>
              <CardDescription>
                AI-powered cardiometabolic risk scoring with personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Automated Risk Calculation</li>
                <li>• Family History Analysis</li>
                <li>• Risk Category Classification</li>
                <li>• Personalized Health Insights</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-3xl mx-auto bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl">Professional Medical Assessment</CardTitle>
            <CardDescription className="text-base">
              Developed and supervised by Dr. Muddu Surendra Nehru MD, Professor of Medicine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              Homa Health Care Center provides comprehensive cardiometabolic risk assessment using 
              advanced laboratory analysis and evidence-based medical evaluation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/api/test-db" target="_blank">
                <Button size="lg" className="w-full sm:w-auto">🧪 Test Backend API</Button>
              </a>
              <a href="http://www.homahealthcarecenter.in" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Visit Website
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="font-semibold">Dr. Muddu Surendra Nehru MD</p>
          <p className="text-sm">Professor of Medicine | Homa Health Care Center</p>
          <p className="text-sm mt-2">Contact: 09963721999 | www.homahealthcarecenter.in</p>
          <p className="text-xs mt-4 text-gray-500">
            © {new Date().getFullYear()} Homa Health Care Center. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}


"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft, Printer, Phone, Mail, MapPin, Clock } from "lucide-react"

interface DisclaimerPageProps {
  onBack: () => void
  onPrint: () => void
}

export default function DisclaimerPage({ onBack, onPrint }: DisclaimerPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 print:mb-4">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 print:shadow-none print:border print:border-gray-300">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">DISCLAIMER & CONTACT</h1>
            <p className="text-lg text-gray-600 mb-2">Important Information & Professional Contact</p>
            <p className="text-sm text-gray-500">Dr. Muddu Surendra Nehru MD | Professor of Medicine</p>
            <p className="text-sm text-blue-600 font-medium">Homa Health Care Center | www.homahealthcarecenter.in</p>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mb-6 print:shadow-none print:border print:border-gray-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-6 w-6 text-blue-600" />
              Medical Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 print:bg-white print:border print:border-gray-300">
              <p className="font-semibold text-yellow-800 mb-2">
                IMPORTANT: This assessment is for educational purposes only
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">1. Purpose and Limitations</h3>
              <p>
                The C.O.D. H.O.M.A I.Q Test (Cardiometabolic Risk Assessment) is a screening tool designed to evaluate
                potential risk factors for metabolic and cardiovascular conditions. This assessment:
              </p>
              <ul className="ml-4 space-y-1">
                <li>• Provides an educational overview of cardiometabolic risk factors</li>
                <li>• Is NOT a substitute for professional medical diagnosis</li>
                <li>• Should NOT be used as the sole basis for medical decisions</li>
                <li>• Requires interpretation by qualified healthcare professionals</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">2. Professional Medical Advice Required</h3>
              <p>All results, recommendations, and health guidance provided by this assessment must be:</p>
              <ul className="ml-4 space-y-1">
                <li>• Reviewed and interpreted by Dr. Muddu Surendra Nehru MD or qualified healthcare provider</li>
                <li>• Considered alongside complete medical history and physical examination</li>
                <li>• Supplemented with additional diagnostic tests as deemed necessary</li>
                <li>• Used only as part of comprehensive medical evaluation</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">3. Accuracy and Reliability</h3>
              <p>While this assessment uses established medical parameters and scoring systems:</p>
              <ul className="ml-4 space-y-1">
                <li>• Results depend on accuracy of input data provided</li>
                <li>• Individual variations may affect interpretation</li>
                <li>• No screening tool is 100% accurate or predictive</li>
                <li>• False positives and false negatives are possible</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">4. Emergency Situations</h3>
              <p className="text-red-600 font-medium">
                If you are experiencing chest pain, shortness of breath, severe headache, or other emergency symptoms,
                seek immediate medical attention. Do not rely on this assessment for emergency medical decisions.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">5. Liability Limitation</h3>
              <p>
                Homa Health Care Center, Dr. Muddu Surendra Nehru MD, and associated healthcare providers are not liable
                for:
              </p>
              <ul className="ml-4 space-y-1">
                <li>• Decisions made based solely on this assessment</li>
                <li>• Delays in seeking appropriate medical care</li>
                <li>• Misinterpretation of results without professional consultation</li>
                <li>• Any adverse outcomes related to self-treatment based on these results</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6 print:shadow-none print:border print:border-gray-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Phone className="h-6 w-6 text-green-600" />
              Professional Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor Information */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg print:bg-white print:border print:border-gray-300">
                  <h3 className="font-bold text-lg text-blue-800 mb-3">Dr. Muddu Surendra Nehru MD</h3>
                  <p className="text-sm text-gray-600 mb-2">Professor of Medicine</p>
                  <p className="text-sm text-gray-600 mb-3">Specialist in Internal Medicine & Metabolic Disorders</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-lg">09963721999</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Available for consultation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinic Information */}
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg print:bg-white print:border print:border-gray-300">
                  <h3 className="font-bold text-lg text-green-800 mb-3">Homa Health Care Center</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Visit our website:</p>
                        <p className="text-blue-600">www.homahealthcarecenter.in</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Consultation Hours:</p>
                        <p>By appointment only</p>
                        <p>Call 09963721999 to schedule</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg print:bg-white print:border print:border-gray-300">
              <h3 className="font-semibold text-gray-800 mb-3">Available Services:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>• Comprehensive metabolic assessment</div>
                <div>• Diabetes management and prevention</div>
                <div>• Cardiovascular risk evaluation</div>
                <div>• Hypertension management</div>
                <div>• Lipid disorder treatment</div>
                <div>• Weight management programs</div>
                <div>• Nutritional counseling</div>
                <div>• Follow-up care and monitoring</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Notice */}
        <Card className="mb-6 bg-red-50 border-red-200 print:bg-white print:border print:border-gray-300">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold text-red-800 mb-2">Final Notice</h3>
                <p className="text-sm text-red-700">
                  By using this assessment tool, you acknowledge that you have read, understood, and agree to this
                  disclaimer. You understand that this tool is for educational purposes only and that professional
                  medical consultation is required for proper interpretation and medical decision-making.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 print:hidden">
          <Button onClick={onBack} variant="outline" className="sm:w-auto py-3 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guide
          </Button>
          <Button onClick={onPrint} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3">
            <Printer className="mr-2 h-4 w-4" />
            Print Complete Report
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center p-6 bg-blue-800 text-white rounded-lg print:bg-gray-100 print:text-black print:border print:border-gray-300">
          <p className="font-bold text-lg mb-2">Dr. Muddu Surendra Nehru MD</p>
          <p className="text-sm mb-1">Professor of Medicine | Internal Medicine Specialist</p>
          <p className="text-sm mb-3">Homa Health Care Center</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="font-semibold">09963721999</span>
            </div>
            <div className="text-blue-200 print:text-gray-600">www.homahealthcarecenter.in</div>
          </div>
        </div>
      </div>
    </div>
  )
}


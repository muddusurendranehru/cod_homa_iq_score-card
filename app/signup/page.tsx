"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Phone validation (India format)
    if (formData.phone && !formData.phone.match(/^\+?91?[6-9]\d{9}$/)) {
      toast.error("Please enter a valid Indian phone number")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
          role: "staff", // Default role
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Signup failed")
      }

      // Store token
      localStorage.setItem("auth_token", data.token)
      localStorage.setItem("user_role", data.user.role)
      localStorage.setItem("user_name", data.user.name)

      toast.success("Account created successfully! Redirecting to dashboard...")
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      console.error("Signup error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="h-10 w-10 text-blue-600" />
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900">C.O.D. H.O.M.A I.Q TEST</h1>
              <p className="text-xs text-gray-600">Cardiometabolic Risk Assessment</p>
            </div>
          </div>
          <CardTitle className="text-2xl">Create Staff Account</CardTitle>
          <CardDescription>Sign up to access the assessment system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Dr. Surendra Nehru"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="doctor@homahealth.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            {/* Phone (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+919963721999"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">India format: +91 followed by 10 digits</p>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500">Minimum 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Log in here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-sm text-gray-600">
        <p className="font-semibold">Dr. Muddu Surendra Nehru MD</p>
        <p>Homa Health Care Center | www.homahealthcarecenter.in</p>
      </div>
    </div>
  )
}


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

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
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
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Store token and user info
      localStorage.setItem("auth_token", data.token)
      localStorage.setItem("user_role", data.user.role)
      localStorage.setItem("user_name", data.user.name)
      localStorage.setItem("user_id", data.user.id)

      toast.success(`Welcome back, ${data.user.name}!`)
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      console.error("Login error:", error)
      toast.error(error instanceof Error ? error.message : "Invalid email or password")
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
          <CardTitle className="text-2xl">Staff Login</CardTitle>
          <CardDescription>Access the assessment system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="doctor@homahealth.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>

            {/* Signup Link */}
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                Sign up here
              </Link>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to Home
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


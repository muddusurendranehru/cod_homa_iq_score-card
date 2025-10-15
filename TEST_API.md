# 🧪 API Testing Guide - COD HOMA IQ SCORE

## Quick Test Using Browser or Postman

### Base URL
```
http://localhost:3031
```

---

## 📋 **TEST 1: Staff Signup**

### Request:
```
POST http://localhost:3031/api/auth/signup
Content-Type: application/json

{
  "name": "Dr. Surendra Nehru",
  "email": "doctor@homahealth.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "phone": "+919876543210",
  "role": "doctor"
}
```

### Expected Response (201):
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "Dr. Surendra Nehru",
    "email": "doctor@homahealth.com",
    "phone": "+919876543210",
    "role": "doctor"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🔑 **TEST 2: Staff Login**

### Request:
```
POST http://localhost:3031/api/auth/login
Content-Type: application/json

{
  "email": "doctor@homahealth.com",
  "password": "SecurePass123"
}
```

### Expected Response (200):
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Dr. Surendra Nehru",
    "email": "doctor@homahealth.com",
    "phone": "+919876543210",
    "role": "doctor"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👤 **TEST 3: Create Patient**

### Request:
```
POST http://localhost:3031/api/patients
Content-Type: application/json

{
  "name": "Rajesh Kumar",
  "age": 45,
  "sex": "male",
  "phone": "+919963721999",
  "email": "rajesh@example.com"
}
```

### Expected Response (201):
```json
{
  "success": true,
  "message": "Patient created successfully",
  "patient": {
    "id": 2,
    "name": "Rajesh Kumar",
    "age": 45,
    "sex": "male",
    "phone": "+919963721999",
    "email": "rajesh@example.com",
    "created_at": "2025-10-14T17:30:00.000Z"
  }
}
```

---

## 📊 **TEST 4: Get All Patients**

### Request:
```
GET http://localhost:3031/api/patients
```

### Expected Response (200):
```json
{
  "success": true,
  "patients": [
    {
      "id": 1,
      "name": "Rajesh Kumar",
      "age": 45,
      "sex": "male",
      "phone": "+919963721999",
      "email": "rajesh.kumar@example.com",
      "created_at": "2025-10-14T10:00:00.000Z",
      "updated_at": "2025-10-14T10:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Rajesh Kumar",
      "age": 45,
      "sex": "male",
      "phone": "+919963721999",
      "email": "rajesh@example.com",
      "created_at": "2025-10-14T17:30:00.000Z",
      "updated_at": "2025-10-14T17:30:00.000Z"
    }
  ]
}
```

---

## 🩺 **TEST 5: Create Assessment**

### Request:
```
POST http://localhost:3031/api/assessments
Content-Type: application/json

{
  "patient_id": 2,
  "height": 170.00,
  "weight": 85.50,
  "bmi": 29.58,
  "waist_circumference": 92.00,
  "systolic_bp": 140,
  "diastolic_bp": 90,
  "heart_rate": 78,
  "fasting_glucose": 126.50,
  "fasting_insulin": 18.50,
  "post_lunch_blood_sugar": 165.00,
  "hba1c": 6.80,
  "homa_ir": 5.78,
  "c_peptide": 2.85,
  "total_cholesterol": 240.00,
  "ldl_cholesterol": 160.00,
  "hdl_cholesterol": 38.00,
  "vldl_cholesterol": 45.00,
  "triglycerides": 220.00,
  "tyg_index": 9.45,
  "history_alcohol": true,
  "history_smoker": true,
  "family_diabetes": true,
  "family_hypertension": true,
  "total_score": 75,
  "waist_score": 20,
  "lab_reports_score": 30,
  "other_parameters_score": 25,
  "speedometer_zone": "orange_red",
  "cardiometabolic_risk_score": 72.50,
  "risk_category": "high",
  "lab_notes": "Patient shows elevated glucose, high triglycerides. Alcohol and smoking history noted."
}
```

### Expected Response (201):
```json
{
  "success": true,
  "message": "Assessment created successfully",
  "assessment": {
    "id": 1,
    "patient_id": 2,
    "height": 170.00,
    "weight": 85.50,
    "bmi": 29.58,
    "waist_circumference": 92.00,
    // ... all other fields ...
    "created_at": "2025-10-14T17:35:00.000Z"
  }
}
```

---

## 📈 **TEST 6: Get All Assessments**

### Request:
```
GET http://localhost:3031/api/assessments
```

### Expected Response (200):
```json
{
  "success": true,
  "assessments": [
    {
      "id": 1,
      "patient_id": 1,
      "patient_name": "Rajesh Kumar",
      "patient_age": 45,
      "patient_sex": "male",
      "height": 170.00,
      "weight": 85.50,
      "bmi": 29.58,
      "waist_circumference": 92.00,
      "total_score": 75,
      "speedometer_zone": "orange_red",
      "history_smoker": true,
      "history_alcohol": true,
      // ... all other fields ...
      "created_at": "2025-10-14T10:30:00.000Z"
    }
  ]
}
```

---

## 🔍 **TEST 7: Get Single Patient**

### Request:
```
GET http://localhost:3031/api/patients/2
```

### Expected Response (200):
```json
{
  "success": true,
  "patient": {
    "id": 2,
    "name": "Rajesh Kumar",
    "age": 45,
    "sex": "male",
    "phone": "+919963721999",
    "email": "rajesh@example.com",
    "created_at": "2025-10-14T17:30:00.000Z",
    "updated_at": "2025-10-14T17:30:00.000Z"
  }
}
```

---

## 🛠️ **How to Test:**

### Option 1: Using Browser Console
Open browser: `http://localhost:3031`

Press F12 → Console → Paste:

```javascript
// Test Signup
fetch('http://localhost:3031/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Dr. Nehru",
    email: "doctor@homahealth.com",
    password: "SecurePass123",
    confirmPassword: "SecurePass123",
    phone: "+919876543210",
    role: "doctor"
  })
})
.then(r => r.json())
.then(console.log)
```

### Option 2: Using PowerShell
```powershell
# Test Signup
Invoke-RestMethod -Uri "http://localhost:3031/api/auth/signup" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"Dr. Nehru","email":"doctor@homahealth.com","password":"SecurePass123","confirmPassword":"SecurePass123","phone":"+919876543210","role":"doctor"}'
```

### Option 3: Using Postman/Thunder Client
1. Install "Thunder Client" extension in VS Code
2. Create new request
3. Set method to POST/GET
4. Add URL and body
5. Click Send

---

## ✅ **Success Indicators:**

- ✅ Status 200/201 responses
- ✅ JSON responses with "success": true
- ✅ Data returned matches input
- ✅ JWT tokens generated for auth endpoints
- ✅ Patient IDs are integers (not UUIDs)
- ✅ Phone numbers in format: +91XXXXXXXXXX

---

## ❌ **Common Errors:**

### Database Connection Error:
```json
{
  "error": "Internal server error"
}
```
**Fix:** Check .env.local has correct DATABASE_URL

### Validation Error:
```json
{
  "error": "Password must be at least 8 characters"
}
```
**Fix:** Check your request body matches requirements

---

## 🎯 **After All Tests Pass:**

✅ Backend is 100% working!  
✅ Ready to build Frontend!  
✅ Proceed to LOGIN, SIGNUP, and DASHBOARD pages!

---

**Next Step:** If all API tests work, say: "**backend tests passed**"  
Then we'll build the **FRONTEND**! 🚀


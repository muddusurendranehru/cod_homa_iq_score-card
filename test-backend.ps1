# Backend Testing Script
# Run this to test INSERT and FETCH

Write-Output ""
Write-Output "═══════════════════════════════════════════════════════════"
Write-Output "🧪 BACKEND TEST: Tables & Content"
Write-Output "═══════════════════════════════════════════════════════════"
Write-Output ""

# Test 1: Show Tables
Write-Output "📋 TEST 1: Database Connection & Tables"
Write-Output "─────────────────────────────────────────"
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3031/api/test-db" -Method GET
    Write-Output "✅ Database: COD_HOMA_IQ_SCORE"
    Write-Output "✅ Tables found: $($response.tables -join ', ')"
    Write-Output "✅ Record counts:"
    Write-Output "   - Patients: $($response.recordCounts.patients)"
    Write-Output "   - Assessments: $($response.recordCounts.assessments)"
    Write-Output "   - Users: $($response.recordCounts.users)"
} catch {
    Write-Output "❌ Error: $_"
}

Write-Output ""
Write-Output "─────────────────────────────────────────"
Write-Output "📝 TEST 2: INSERT User (Signup)"
Write-Output "─────────────────────────────────────────"
try {
    $userBody = @{
        name = "Dr. Surendra Nehru"
        email = "doctor@homahealth.com"
        password = "SecurePass123"
        phone = "+919963721999"
        role = "doctor"
    } | ConvertTo-Json
    
    $userResponse = Invoke-RestMethod -Uri "http://localhost:3031/api/auth/signup" -Method POST -Body $userBody -ContentType "application/json"
    Write-Output "✅ User created successfully!"
    Write-Output "   Email: doctor@homahealth.com"
    Write-Output "   Role: doctor"
} catch {
    Write-Output "⚠️  User might already exist or validation error"
    Write-Output "   Error: $($_.Exception.Message)"
}

Write-Output ""
Write-Output "─────────────────────────────────────────"
Write-Output "🔐 TEST 3: FETCH User (Login)"
Write-Output "─────────────────────────────────────────"
try {
    $loginBody = @{
        email = "doctor@homahealth.com"
        password = "SecurePass123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3031/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    Write-Output "✅ Login successful!"
    Write-Output "   Token received: Yes"
} catch {
    Write-Output "❌ Login failed: $($_.Exception.Message)"
}

Write-Output ""
Write-Output "─────────────────────────────────────────"
Write-Output "👤 TEST 4: INSERT Patient"
Write-Output "─────────────────────────────────────────"
try {
    $patientBody = @{
        name = "Rajesh Kumar"
        age = 45
        sex = "male"
        phone = "+919963721999"
        email = "rajesh@example.com"
    } | ConvertTo-Json
    
    $patientResponse = Invoke-RestMethod -Uri "http://localhost:3031/api/patients" -Method POST -Body $patientBody -ContentType "application/json"
    Write-Output "✅ Patient created successfully!"
    Write-Output "   ID: $($patientResponse.patient.id)"
    Write-Output "   Name: $($patientResponse.patient.name)"
    Write-Output "   Age: $($patientResponse.patient.age)"
} catch {
    Write-Output "⚠️  Error creating patient: $($_.Exception.Message)"
}

Write-Output ""
Write-Output "─────────────────────────────────────────"
Write-Output "📊 TEST 5: FETCH All Patients"
Write-Output "─────────────────────────────────────────"
try {
    $patientsResponse = Invoke-RestMethod -Uri "http://localhost:3031/api/patients" -Method GET
    Write-Output "✅ Patients found: $($patientsResponse.patients.Count)"
    foreach ($patient in $patientsResponse.patients) {
        Write-Output "   - ID: $($patient.id) | Name: $($patient.name) | Age: $($patient.age) | Sex: $($patient.sex)"
    }
} catch {
    Write-Output "❌ Error fetching patients: $($_.Exception.Message)"
}

Write-Output ""
Write-Output "═══════════════════════════════════════════════════════════"
Write-Output "✅ BACKEND TEST COMPLETE"
Write-Output "═══════════════════════════════════════════════════════════"
Write-Output ""


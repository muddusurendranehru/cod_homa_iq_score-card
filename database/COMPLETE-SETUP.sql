-- ═══════════════════════════════════════════════
-- C.O.D. HOMA IQ SCORE DATABASE
-- Cardiometabolic Risk Assessment & Health Parameter Analysis
-- ═══════════════════════════════════════════════

-- STEP 1: CREATE DATABASE (Run this first in default database)
-- Note: After creating, SWITCH to 'COD_HOMA_IQ_SCORE' database in SQL Editor dropdown
-- CREATE DATABASE "COD_HOMA_IQ_SCORE";

-- ═══════════════════════════════════════════════
-- STEP 2: CREATE TABLES (Run this AFTER switching to 'COD_HOMA_IQ_SCORE' database)
-- ═══════════════════════════════════════════════

-- Table 1: PATIENTS (INTEGER Primary Key)
CREATE TABLE homa_patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    sex VARCHAR(10) NOT NULL CHECK (sex IN ('male', 'female', 'other')),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table 2: ASSESSMENTS (INTEGER Primary Key)
-- Analyzes health parameters: BMI, BP, glucose, cholesterol, etc.
CREATE TABLE homa_assessments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES homa_patients(id) ON DELETE CASCADE,
    
    -- Basic Measurements
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    bmi DECIMAL(5,2),
    waist_circumference DECIMAL(5,2),
    
    -- Vital Signs
    systolic_bp INTEGER,
    diastolic_bp INTEGER,
    heart_rate INTEGER,
    
    -- Metabolic Panel (HOMA-IR Calculation)
    fasting_glucose DECIMAL(6,2),
    fasting_insulin DECIMAL(6,2),
    hba1c DECIMAL(4,2),
    homa_ir DECIMAL(6,2),
    
    -- Lipid Profile
    total_cholesterol DECIMAL(6,2),
    ldl_cholesterol DECIMAL(6,2),
    hdl_cholesterol DECIMAL(6,2),
    triglycerides DECIMAL(6,2),
    
    -- Complete Blood Count
    hemoglobin DECIMAL(4,2),
    hematocrit DECIMAL(5,2),
    rbc_count DECIMAL(4,2),
    wbc_count DECIMAL(5,2),
    platelet_count DECIMAL(6,1),
    
    -- Liver Function
    sgpt_alt DECIMAL(6,2),
    sgot_ast DECIMAL(6,2),
    alkaline_phosphatase DECIMAL(6,2),
    total_bilirubin DECIMAL(4,2),
    
    -- Kidney Function
    creatinine DECIMAL(4,2),
    blood_urea DECIMAL(5,2),
    uric_acid DECIMAL(4,2),
    
    -- Thyroid Function
    tsh DECIMAL(6,3),
    t3 DECIMAL(6,2),
    t4 DECIMAL(5,2),
    
    -- Risk Assessment (Analyzed based on parameters)
    cardiometabolic_risk_score DECIMAL(5,2),
    risk_category VARCHAR(20) CHECK (risk_category IN ('low', 'moderate', 'high', 'very_high')),
    
    -- Family History
    family_diabetes BOOLEAN DEFAULT false,
    family_hypertension BOOLEAN DEFAULT false,
    family_heart_disease BOOLEAN DEFAULT false,
    
    -- Additional
    lab_notes TEXT,
    assessment_date DATE DEFAULT CURRENT_DATE,
    test_date DATE,
    doctor_reviewed BOOLEAN DEFAULT false,
    critical_values_flagged BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table 3: USERS/STAFF (INTEGER Primary Key)
CREATE TABLE homa_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'staff' CHECK (role IN ('staff', 'admin', 'doctor')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX idx_patient_id ON homa_assessments(patient_id);
CREATE INDEX idx_assessment_date ON homa_assessments(assessment_date);
CREATE INDEX idx_patient_name ON homa_patients(name);
CREATE INDEX idx_user_email ON homa_users(email);

-- ═══════════════════════════════════════════════
-- STEP 3: SHOW TABLES (Verify tables created)
-- ═══════════════════════════════════════════════

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Expected Result:
-- homa_assessments
-- homa_patients
-- homa_users

-- ═══════════════════════════════════════════════
-- STEP 4: TEST INSERT & FETCH
-- ═══════════════════════════════════════════════

-- INSERT test patient
INSERT INTO homa_patients (name, age, sex, phone, email) 
VALUES ('Test Patient', 45, 'male', '09963721999', 'test@example.com')
RETURNING *;

-- FETCH all patients
SELECT * FROM homa_patients;

-- INSERT test assessment with health parameters
INSERT INTO homa_assessments (
    patient_id, height, weight, bmi, systolic_bp, diastolic_bp,
    fasting_glucose, fasting_insulin, homa_ir
) 
VALUES (1, 170.5, 75.0, 25.8, 120, 80, 95.0, 10.5, 2.5)
RETURNING *;

-- FETCH assessment with patient name (health parameter analysis)
SELECT 
    a.*,
    p.name as patient_name,
    p.age,
    CASE 
        WHEN a.bmi < 18.5 THEN 'Underweight'
        WHEN a.bmi < 25 THEN 'Normal'
        WHEN a.bmi < 30 THEN 'Overweight'
        ELSE 'Obese'
    END as bmi_category,
    CASE 
        WHEN a.systolic_bp < 120 AND a.diastolic_bp < 80 THEN 'Normal'
        WHEN a.systolic_bp < 140 AND a.diastolic_bp < 90 THEN 'Elevated'
        ELSE 'Hypertension'
    END as bp_status
FROM homa_assessments a
JOIN homa_patients p ON a.patient_id = p.id;

-- ═══════════════════════════════════════════════
-- SUCCESS! 
-- Database 'COD_HOMA_IQ_SCORE' created
-- Analyzes health parameters and provides risk assessment
-- 3 tables with INTEGER primary keys
-- Backend INSERT & FETCH working
-- Ready for Next.js application
-- ═══════════════════════════════════════════════

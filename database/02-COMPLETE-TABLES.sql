-- COMPLETE TABLES for COD_HOMA_IQ_SCORE Database
-- Includes: Past History, Additional Lab Tests, Formulas, Scoring System

-- Table 1: PATIENTS
CREATE TABLE homa_patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 0 AND age <= 150),
    sex VARCHAR(10) NOT NULL CHECK (sex IN ('male', 'female', 'other')),
    phone VARCHAR(15),  -- India: +91 9963721999
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table 2: ASSESSMENTS (Complete with all fields)
CREATE TABLE homa_assessments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES homa_patients(id) ON DELETE CASCADE,
    
    -- Basic Measurements
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    bmi DECIMAL(5,2),  -- BMI FORMULA calculated
    waist_circumference DECIMAL(5,2),  -- >85 cm = 20 points
    
    -- Vital Signs
    systolic_bp INTEGER,
    diastolic_bp INTEGER,
    heart_rate INTEGER,
    
    -- Metabolic Panel
    fasting_glucose DECIMAL(6,2),
    fasting_insulin DECIMAL(6,2),
    post_lunch_blood_sugar DECIMAL(6,2),  -- NEW: Post lunch blood sugar
    hba1c DECIMAL(4,2),
    homa_ir DECIMAL(6,2),  -- HOMA-IR FORMULA calculated
    c_peptide DECIMAL(6,2),  -- NEW: C-Peptide
    
    -- Lipid Profile
    total_cholesterol DECIMAL(6,2),
    ldl_cholesterol DECIMAL(6,2),
    hdl_cholesterol DECIMAL(6,2),
    vldl_cholesterol DECIMAL(6,2),  -- NEW: VLDL
    triglycerides DECIMAL(6,2),
    tyg_index DECIMAL(6,2),  -- NEW: TYG-INDEX FORMULA calculated
    
    -- Complete Blood Count (CBC)
    hemoglobin DECIMAL(4,2),
    hematocrit DECIMAL(5,2),
    rbc_count DECIMAL(4,2),
    wbc_count DECIMAL(5,2),
    platelet_count DECIMAL(6,1),
    
    -- Liver Function Tests (LFT)
    sgpt_alt DECIMAL(6,2),
    sgot_ast DECIMAL(6,2),
    alkaline_phosphatase DECIMAL(6,2),
    total_bilirubin DECIMAL(4,2),
    
    -- Kidney Function Tests (KFT)
    creatinine DECIMAL(4,2),
    blood_urea DECIMAL(5,2),
    uric_acid DECIMAL(4,2),
    
    -- Thyroid Function Tests (TFT)
    tsh DECIMAL(6,3),
    t3 DECIMAL(6,2),
    t4 DECIMAL(5,2),
    
    -- PAST HISTORY (Tick boxes - Boolean fields)
    history_cag BOOLEAN DEFAULT false,  -- CAG (Coronary Angiography)
    history_ptca BOOLEAN DEFAULT false,  -- PTCA
    history_cva BOOLEAN DEFAULT false,  -- CVA (Stroke)
    history_alcohol BOOLEAN DEFAULT false,  -- Alcohol use
    history_smoker BOOLEAN DEFAULT false,  -- Smoker
    history_drugs BOOLEAN DEFAULT false,  -- Drug use
    history_menopause BOOLEAN DEFAULT false,  -- Menopause
    history_cancer BOOLEAN DEFAULT false,  -- Cancer
    
    -- Family History
    family_diabetes BOOLEAN DEFAULT false,
    family_hypertension BOOLEAN DEFAULT false,
    family_heart_disease BOOLEAN DEFAULT false,
    
    -- SCORING SYSTEM (Speedometer analysis)
    total_score INTEGER DEFAULT 0,  -- Total calculated score (0-100)
    waist_score INTEGER DEFAULT 0,  -- 20 if >85cm, else 0
    lab_reports_score INTEGER DEFAULT 0,  -- Each report: 10 points
    other_parameters_score INTEGER DEFAULT 0,  -- Other: 10 points each
    
    -- Risk Assessment
    cardiometabolic_risk_score DECIMAL(5,2),
    risk_category VARCHAR(20) CHECK (risk_category IN ('low', 'moderate', 'high', 'very_high')),
    
    -- Speedometer Color Zones (based on total_score)
    -- 80-100: RED
    -- 60-80: ORANGE_RED
    -- 40-60: BLUE_RED
    -- 20-40: GREEN
    speedometer_zone VARCHAR(20) CHECK (speedometer_zone IN ('green', 'blue_red', 'orange_red', 'red')),
    
    -- Additional Fields
    lab_notes TEXT,
    assessment_date DATE DEFAULT CURRENT_DATE,
    test_date DATE,
    doctor_reviewed BOOLEAN DEFAULT false,
    critical_values_flagged BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table 3: USERS/STAFF
CREATE TABLE homa_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    role VARCHAR(20) DEFAULT 'staff' CHECK (role IN ('staff', 'admin', 'doctor')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Indexes
CREATE INDEX idx_patient_id ON homa_assessments(patient_id);
CREATE INDEX idx_assessment_date ON homa_assessments(assessment_date);
CREATE INDEX idx_patient_name ON homa_patients(name);
CREATE INDEX idx_user_email ON homa_users(email);
CREATE INDEX idx_speedometer_zone ON homa_assessments(speedometer_zone);
CREATE INDEX idx_total_score ON homa_assessments(total_score);

-- FORMULAS DOCUMENTATION
-- 
-- 1. BMI FORMULA: weight(kg) / (height(m))^2
-- 2. HOMA-IR FORMULA: (fasting_glucose * fasting_insulin) / 405
-- 3. TYG-INDEX FORMULA: ln[triglycerides(mg/dL) × fasting_glucose(mg/dL) / 2]
--
-- SCORING SYSTEM:
-- - Waist circumference > 85 cm: 20 points
-- - Each lab report abnormal: 10 points
-- - Other parameters abnormal: 10 points each
-- - Total score: 0-100
--
-- SPEEDOMETER ZONES:
-- - 80-100: RED (High Risk)
-- - 60-80: ORANGE_RED (Moderate-High Risk)
-- - 40-60: BLUE_RED (Moderate Risk)
-- - 20-40: GREEN (Low-Moderate Risk)
-- - 0-20: GREEN (Low Risk)

-- Show created tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;


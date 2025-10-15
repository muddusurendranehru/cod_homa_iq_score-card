-- STEP 1: CREATE TABLES IN "heart" DATABASE
-- Copy and run this in Neon SQL Editor

-- Table 1: Patients (INTEGER id)
CREATE TABLE IF NOT EXISTS homa_patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    sex VARCHAR(10) NOT NULL CHECK (sex IN ('male', 'female', 'other')),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table 2: Assessments (INTEGER id)
CREATE TABLE IF NOT EXISTS homa_assessments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES homa_patients(id) ON DELETE CASCADE,
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    bmi DECIMAL(5,2),
    waist_circumference DECIMAL(5,2),
    systolic_bp INTEGER,
    diastolic_bp INTEGER,
    heart_rate INTEGER,
    fasting_glucose DECIMAL(6,2),
    fasting_insulin DECIMAL(6,2),
    hba1c DECIMAL(4,2),
    homa_ir DECIMAL(6,2),
    total_cholesterol DECIMAL(6,2),
    ldl_cholesterol DECIMAL(6,2),
    hdl_cholesterol DECIMAL(6,2),
    triglycerides DECIMAL(6,2),
    hemoglobin DECIMAL(4,2),
    hematocrit DECIMAL(5,2),
    rbc_count DECIMAL(4,2),
    wbc_count DECIMAL(5,2),
    platelet_count DECIMAL(6,1),
    sgpt_alt DECIMAL(6,2),
    sgot_ast DECIMAL(6,2),
    alkaline_phosphatase DECIMAL(6,2),
    total_bilirubin DECIMAL(4,2),
    creatinine DECIMAL(4,2),
    blood_urea DECIMAL(5,2),
    uric_acid DECIMAL(4,2),
    tsh DECIMAL(6,3),
    t3 DECIMAL(6,2),
    t4 DECIMAL(5,2),
    cardiometabolic_risk_score DECIMAL(5,2),
    risk_category VARCHAR(20) CHECK (risk_category IN ('low', 'moderate', 'high', 'very_high')),
    family_diabetes BOOLEAN DEFAULT false,
    family_hypertension BOOLEAN DEFAULT false,
    family_heart_disease BOOLEAN DEFAULT false,
    lab_notes TEXT,
    assessment_date DATE DEFAULT CURRENT_DATE,
    test_date DATE,
    doctor_reviewed BOOLEAN DEFAULT false,
    critical_values_flagged BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table 3: Users/Staff (INTEGER id)
CREATE TABLE IF NOT EXISTS homa_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'staff' CHECK (role IN ('staff', 'admin', 'doctor')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_patient_id ON homa_assessments(patient_id);
CREATE INDEX idx_assessment_date ON homa_assessments(assessment_date);
CREATE INDEX idx_patient_name ON homa_patients(name);
CREATE INDEX idx_user_email ON homa_users(email);

-- Success message
SELECT 'Tables created successfully!' AS status;


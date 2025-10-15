-- C.O.D. H.O.M.A I.Q Score Card Database Schema
-- Database: heart (Neon PostgreSQL)
-- Two main tables: homa_patients and homa_assessments
-- PRIMARY KEYS: INTEGER (auto-increment) - NOT UUID

-- Table 1: Patients (Simple, Integer Primary Key)
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

-- Table 2: Health Assessments (Simple, Integer Primary Key)
CREATE TABLE IF NOT EXISTS homa_assessments (
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
    
    -- Metabolic Panel
    fasting_glucose DECIMAL(6,2),
    fasting_insulin DECIMAL(6,2),
    hba1c DECIMAL(4,2),
    homa_ir DECIMAL(6,2),
    
    -- Lipid Profile
    total_cholesterol DECIMAL(6,2),
    ldl_cholesterol DECIMAL(6,2),
    hdl_cholesterol DECIMAL(6,2),
    triglycerides DECIMAL(6,2),
    
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
    
    -- Risk Assessment
    cardiometabolic_risk_score DECIMAL(5,2),
    risk_category VARCHAR(20) CHECK (risk_category IN ('low', 'moderate', 'high', 'very_high')),
    
    -- Family History
    family_diabetes BOOLEAN DEFAULT false,
    family_hypertension BOOLEAN DEFAULT false,
    family_heart_disease BOOLEAN DEFAULT false,
    
    -- Additional Fields
    lab_notes TEXT,
    assessment_date DATE DEFAULT CURRENT_DATE,
    test_date DATE,
    doctor_reviewed BOOLEAN DEFAULT false,
    critical_values_flagged BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table 3: Staff/Users (for authentication)
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

-- Create indexes for better query performance
CREATE INDEX idx_patient_id ON homa_assessments(patient_id);
CREATE INDEX idx_assessment_date ON homa_assessments(assessment_date);
CREATE INDEX idx_patient_name ON homa_patients(name);
CREATE INDEX idx_risk_category ON homa_assessments(risk_category);
CREATE INDEX idx_user_email ON homa_users(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON homa_patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON homa_assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON homa_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Show all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

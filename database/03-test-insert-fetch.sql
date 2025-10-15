-- TEST INSERT & FETCH for COD_HOMA_IQ_SCORE Database
-- This will test all tables with sample data including new fields

-- ═══════════════════════════════════════════════
-- STEP 1: INSERT TEST DATA
-- ═══════════════════════════════════════════════

-- Insert a test PATIENT
INSERT INTO homa_patients (name, age, sex, phone, email)
VALUES 
('Rajesh Kumar', 45, 'male', '+919963721999', 'rajesh.kumar@example.com');

-- Insert a test STAFF USER
INSERT INTO homa_users (name, email, password_hash, phone, role)
VALUES 
('Dr. Surendra Nehru', 'dr.nehru@homahealth.com', '$2a$12$abcdefghijklmnopqrstuvwxyz1234567890', '+919876543210', 'doctor');

-- Insert a COMPLETE ASSESSMENT with all new fields
INSERT INTO homa_assessments (
    patient_id,
    -- Basic Measurements
    height, weight, bmi, waist_circumference,
    -- Vital Signs
    systolic_bp, diastolic_bp, heart_rate,
    -- Metabolic Panel
    fasting_glucose, fasting_insulin, post_lunch_blood_sugar, hba1c, homa_ir, c_peptide,
    -- Lipid Profile
    total_cholesterol, ldl_cholesterol, hdl_cholesterol, vldl_cholesterol, triglycerides, tyg_index,
    -- CBC
    hemoglobin, hematocrit, rbc_count, wbc_count, platelet_count,
    -- LFT
    sgpt_alt, sgot_ast, alkaline_phosphatase, total_bilirubin,
    -- KFT
    creatinine, blood_urea, uric_acid,
    -- TFT
    tsh, t3, t4,
    -- PAST HISTORY (NEW!)
    history_cag, history_ptca, history_cva, history_alcohol, history_smoker, 
    history_drugs, history_menopause, history_cancer,
    -- Family History
    family_diabetes, family_hypertension, family_heart_disease,
    -- SCORING (NEW!)
    total_score, waist_score, lab_reports_score, other_parameters_score,
    speedometer_zone,
    -- Risk Assessment
    cardiometabolic_risk_score, risk_category,
    -- Additional
    lab_notes, assessment_date, doctor_reviewed
)
VALUES (
    1,  -- patient_id (Rajesh Kumar)
    -- Basic Measurements
    170.00, 85.50, 29.58, 92.00,  -- waist > 85cm = 20 points!
    -- Vital Signs
    140, 90, 78,
    -- Metabolic Panel
    126.50, 18.50, 165.00, 6.80, 5.78, 2.85,
    -- Lipid Profile
    240.00, 160.00, 38.00, 45.00, 220.00, 9.45,
    -- CBC
    13.50, 42.00, 4.80, 8.50, 250000.0,
    -- LFT
    45.00, 38.00, 105.00, 1.20,
    -- KFT
    1.10, 38.00, 6.80,
    -- TFT
    3.50, 1.20, 8.50,
    -- PAST HISTORY (Patient has some risk factors)
    false, false, false, true, true, false, false, false,  -- Alcohol + Smoker
    -- Family History
    true, true, false,  -- Diabetes + Hypertension in family
    -- SCORING (Example: 75 points = ORANGE-RED zone)
    75, 20, 30, 25,  -- Total 75: Waist(20) + Lab reports(30) + Other(25)
    'orange_red',
    -- Risk Assessment
    72.50, 'high',
    -- Additional
    'Patient shows elevated glucose, high triglycerides, and abnormal lipid profile. Alcohol and smoking history noted.',
    CURRENT_DATE,
    false
);

-- ═══════════════════════════════════════════════
-- STEP 2: FETCH AND VERIFY ALL DATA
-- ═══════════════════════════════════════════════

-- Show all PATIENTS
SELECT 
    id, name, age, sex, phone, email, 
    TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI') as created
FROM homa_patients
ORDER BY id;

-- Show all USERS/STAFF
SELECT 
    id, name, email, phone, role, is_active,
    TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI') as created
FROM homa_users
ORDER BY id;

-- Show COMPLETE ASSESSMENT with PATIENT INFO
SELECT 
    a.id,
    p.name as patient_name,
    p.age,
    p.sex,
    -- Basic Measurements
    a.height, a.weight, a.bmi, a.waist_circumference,
    -- Vital Signs
    a.systolic_bp, a.diastolic_bp, a.heart_rate,
    -- Key Metabolic Values
    a.fasting_glucose, a.fasting_insulin, a.post_lunch_blood_sugar,
    a.hba1c, a.homa_ir, a.c_peptide,
    -- Lipid Profile with NEW VLDL
    a.total_cholesterol, a.ldl_cholesterol, a.hdl_cholesterol, 
    a.vldl_cholesterol, a.triglycerides, a.tyg_index,
    -- PAST HISTORY (TICK BOXES)
    a.history_cag as CAG,
    a.history_ptca as PTCA,
    a.history_cva as CVA,
    a.history_alcohol as ALCOHOL,
    a.history_smoker as SMOKER,
    a.history_drugs as DRUGS,
    a.history_menopause as MENOPAUSE,
    a.history_cancer as CANCER,
    -- Family History
    a.family_diabetes, a.family_hypertension, a.family_heart_disease,
    -- SCORING & SPEEDOMETER
    a.total_score,
    a.waist_score,
    a.lab_reports_score,
    a.other_parameters_score,
    a.speedometer_zone,
    a.cardiometabolic_risk_score,
    a.risk_category,
    -- Additional
    a.lab_notes,
    TO_CHAR(a.assessment_date, 'YYYY-MM-DD') as assessment_date
FROM homa_assessments a
JOIN homa_patients p ON a.patient_id = p.id
ORDER BY a.id;

-- ═══════════════════════════════════════════════
-- STEP 3: VERIFY SPEEDOMETER ZONES
-- ═══════════════════════════════════════════════

SELECT 
    p.name,
    a.total_score,
    a.speedometer_zone,
    CASE 
        WHEN a.total_score >= 80 THEN '🔴 RED (High Risk)'
        WHEN a.total_score >= 60 THEN '🟠 ORANGE-RED (Moderate-High)'
        WHEN a.total_score >= 40 THEN '🔵 BLUE-RED (Moderate)'
        WHEN a.total_score >= 20 THEN '🟢 GREEN (Low-Moderate)'
        ELSE '🟢 GREEN (Low Risk)'
    END as risk_indicator
FROM homa_assessments a
JOIN homa_patients p ON a.patient_id = p.id;

-- ═══════════════════════════════════════════════
-- RESULTS INTERPRETATION
-- ═══════════════════════════════════════════════

-- Count all records
SELECT 
    'PATIENTS' as table_name, COUNT(*) as record_count 
FROM homa_patients
UNION ALL
SELECT 
    'USERS/STAFF' as table_name, COUNT(*) as record_count 
FROM homa_users
UNION ALL
SELECT 
    'ASSESSMENTS' as table_name, COUNT(*) as record_count 
FROM homa_assessments;

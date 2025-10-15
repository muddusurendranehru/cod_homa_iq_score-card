-- ═══════════════════════════════════════════════════════════
-- SIMPLE INSERT & FETCH TEST for COD_HOMA_IQ_SCORE Database
-- Copy and paste these commands ONE BY ONE in Neon SQL Editor
-- ═══════════════════════════════════════════════════════════

-- STEP 1: INSERT a Staff User (for login)
-- ─────────────────────────────────────────────────────────
INSERT INTO homa_users (name, email, password_hash, phone, role) 
VALUES (
    'Dr. Surendra Nehru',
    'doctor@homahealth.com',
    '$2a$10$abcdefghijklmnopqrstuvwxy.abcdefghijklmnop',  -- bcrypt hash of "SecurePass123"
    '+919963721999',
    'doctor'
);

-- Verify user inserted
SELECT * FROM homa_users;


-- STEP 2: INSERT a Patient
-- ─────────────────────────────────────────────────────────
INSERT INTO homa_patients (name, age, sex, phone, email) 
VALUES (
    'Rajesh Kumar',
    45,
    'male',
    '+919963721999',
    'rajesh@example.com'
);

-- Verify patient inserted
SELECT * FROM homa_patients;


-- STEP 3: INSERT a Health Assessment
-- ─────────────────────────────────────────────────────────
-- Note: Replace patient_id with the actual ID from step 2 (should be 1)
INSERT INTO homa_assessments (
    patient_id,
    height,
    weight,
    bmi,
    waist_circumference,
    systolic_bp,
    diastolic_bp,
    heart_rate,
    fasting_glucose,
    fasting_insulin,
    hba1c,
    c_peptide,
    post_lunch_blood_sugar,
    total_cholesterol,
    ldl_cholesterol,
    hdl_cholesterol,
    triglycerides,
    vldl_cholesterol,
    homa_ir,
    tyg_index,
    -- Past History (tick boxes)
    history_cag,
    history_ptca,
    history_cva,
    history_alcohol,
    history_smoker,
    history_drugs,
    history_menopause,
    history_cancer,
    -- Scoring
    total_score,
    waist_score,
    speedometer_zone,
    risk_category,
    lab_notes
) VALUES (
    1,  -- patient_id (from step 2)
    175.00,  -- height (cm)
    70.00,   -- weight (kg)
    22.86,   -- bmi (calculated: 70 / (1.75)^2)
    92.00,   -- waist (>85cm = 20 points)
    130,     -- systolic_bp
    85,      -- diastolic_bp
    72,      -- heart_rate
    90.00,   -- fasting_glucose
    10.00,   -- fasting_insulin
    5.70,    -- hba1c
    2.50,    -- c_peptide
    140.00,  -- post_lunch_blood_sugar
    200.00,  -- total_cholesterol
    120.00,  -- ldl_cholesterol
    45.00,   -- hdl_cholesterol
    150.00,  -- triglycerides
    30.00,   -- vldl_cholesterol
    2.22,    -- homa_ir (calculated: (90 * 10) / 405)
    8.81,    -- tyg_index (calculated: ln(150 * 90 / 2))
    -- Past History
    false,   -- history_cag
    false,   -- history_ptca
    false,   -- history_cva
    true,    -- history_alcohol (YES)
    true,    -- history_smoker (YES)
    false,   -- history_drugs
    false,   -- history_menopause
    false,   -- history_cancer
    -- Scoring
    40,      -- total_score (20 for waist + 10 alcohol + 10 smoker)
    20,      -- waist_score (>85cm)
    'blue_red',  -- speedometer_zone (40 points = BLUE_RED)
    'moderate',  -- risk_category
    'Initial comprehensive assessment for Rajesh Kumar. Patient shows moderate risk factors.'
);

-- Verify assessment inserted
SELECT * FROM homa_assessments;


-- ═══════════════════════════════════════════════════════════
-- STEP 4: FETCH ALL DATA (JOIN TABLES)
-- ─────────────────────────────────────────────────────────
-- This shows patient info with their assessment
SELECT 
    p.id AS patient_id,
    p.name AS patient_name,
    p.age,
    p.sex,
    p.phone,
    p.email,
    a.id AS assessment_id,
    a.height,
    a.weight,
    a.bmi,
    a.waist_circumference,
    a.systolic_bp,
    a.diastolic_bp,
    a.fasting_glucose,
    a.fasting_insulin,
    a.homa_ir,
    a.tyg_index,
    a.c_peptide,
    a.post_lunch_blood_sugar,
    a.vldl_cholesterol,
    a.history_alcohol,
    a.history_smoker,
    a.total_score,
    a.waist_score,
    a.speedometer_zone,
    a.risk_category,
    a.lab_notes,
    a.assessment_date
FROM homa_patients p
LEFT JOIN homa_assessments a ON p.id = a.patient_id
ORDER BY p.id, a.assessment_date DESC;


-- ═══════════════════════════════════════════════════════════
-- STEP 5: COUNT RECORDS IN ALL TABLES
-- ─────────────────────────────────────────────────────────
SELECT 
    'homa_users' AS table_name,
    COUNT(*) AS record_count
FROM homa_users
UNION ALL
SELECT 
    'homa_patients',
    COUNT(*)
FROM homa_patients
UNION ALL
SELECT 
    'homa_assessments',
    COUNT(*)
FROM homa_assessments;


-- ═══════════════════════════════════════════════════════════
-- STEP 6: VERIFY SPEEDOMETER SCORING
-- ─────────────────────────────────────────────────────────
-- Check if scoring is correct based on waist and other factors
SELECT 
    p.name AS patient_name,
    a.waist_circumference,
    a.waist_score,
    a.history_alcohol,
    a.history_smoker,
    a.total_score,
    a.speedometer_zone,
    CASE 
        WHEN a.total_score >= 80 THEN '🔴 RED (High Risk)'
        WHEN a.total_score >= 60 THEN '🟠 ORANGE-RED (Moderate-High)'
        WHEN a.total_score >= 40 THEN '🔵 BLUE-RED (Moderate)'
        ELSE '🟢 GREEN (Low Risk)'
    END AS expected_zone
FROM homa_patients p
JOIN homa_assessments a ON p.id = a.patient_id;


-- ═══════════════════════════════════════════════════════════
-- EXPECTED RESULTS:
-- ═══════════════════════════════════════════════════════════
-- After running all commands, you should see:
-- 
-- ✅ 1 User (Dr. Surendra Nehru)
-- ✅ 1 Patient (Rajesh Kumar, age 45, male)
-- ✅ 1 Assessment with:
--    - BMI: 22.86
--    - HOMA-IR: 2.22
--    - TYG-INDEX: 8.81
--    - Waist Score: 20 (>85cm)
--    - Total Score: 40
--    - Speedometer Zone: BLUE_RED (Moderate Risk)
--    - Past History: Alcohol ✓, Smoker ✓
-- 
-- ═══════════════════════════════════════════════════════════


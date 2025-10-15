-- Verify Database Setup for "heart" Database
-- Run this AFTER creating the schema to verify everything is set up correctly

-- Check if tables exist
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Should show:
-- homa_assessments
-- homa_patients

-- Check columns in homa_patients table
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'homa_patients'
ORDER BY ordinal_position;

-- Check columns in homa_assessments table  
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'homa_assessments'
ORDER BY ordinal_position;

-- Verify UUID extension is enabled
SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';

-- Test inserting a sample patient (optional - you can delete after)
-- INSERT INTO homa_patients (name, age, gender, phone, email) 
-- VALUES ('Test Patient', 45, 'male', '09963721999', 'test@example.com');

-- View all patients (should be empty initially)
SELECT * FROM homa_patients;

-- Success message
SELECT 'Database "heart" is set up correctly! ✅' AS status;


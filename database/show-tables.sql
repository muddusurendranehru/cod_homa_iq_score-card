-- Show all tables in the 'heart' database
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Expected result:
-- homa_assessments
-- homa_patients  
-- homa_users

-- Show structure of homa_patients table
SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'homa_patients'
ORDER BY ordinal_position;

-- Show structure of homa_users table  
SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'homa_users'
ORDER BY ordinal_position;

-- Show structure of homa_assessments table
SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'homa_assessments'
ORDER BY ordinal_position;

-- Count records in each table
SELECT 
    'homa_patients' as table_name, 
    COUNT(*) as record_count 
FROM homa_patients
UNION ALL
SELECT 
    'homa_users' as table_name, 
    COUNT(*) as record_count 
FROM homa_users
UNION ALL
SELECT 
    'homa_assessments' as table_name, 
    COUNT(*) as record_count 
FROM homa_assessments;


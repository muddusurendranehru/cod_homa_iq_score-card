# 🫀 Quick Start: Setup "heart" Database in Neon

## ⚡ Fast Track Setup (5 minutes)

### 1️⃣ Create Neon Database
```bash
1. Go to: https://console.neon.tech
2. Click "New Project"
3. Name: heart
4. Database: heart ⭐ (MUST be exactly "heart")
5. Click "Create Project"
```

### 2️⃣ Run This SQL Schema

In Neon SQL Editor, copy and paste this entire schema:

```sql
-- C.O.D. H.O.M.A I.Q Score Card Database Schema
-- Database: heart (Neon PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table 1: Patients (UUID Primary Key)
CREATE TABLE IF NOT EXISTS homa_patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table 2: Health Assessments (UUID Primary Key)
CREATE TABLE IF NOT EXISTS homa_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES homa_patients(id) ON DELETE CASCADE,
    
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

-- Create indexes
CREATE INDEX idx_patient_id ON homa_assessments(patient_id);
CREATE INDEX idx_assessment_date ON homa_assessments(assessment_date);
CREATE INDEX idx_patient_name ON homa_patients(name);
CREATE INDEX idx_risk_category ON homa_assessments(risk_category);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON homa_patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON homa_assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3️⃣ Verify Tables Created

Run this verification query:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';
```

✅ You should see:
- `homa_patients`
- `homa_assessments`

### 4️⃣ Get Your Connection String

1. In Neon dashboard, click "Connection Details"
2. Copy the connection string (it will look like):
   ```
   postgresql://username:password@ep-xyz-123.region.aws.neon.tech/heart?sslmode=require
   ```

### 5️⃣ Configure Your App

Create `.env.local` file in project root:

```env
# For Supabase Client (Neon uses Supabase client library)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Direct Neon Connection
DATABASE_URL=postgresql://username:password@ep-xyz.neon.tech/heart?sslmode=require
```

**OR if using Supabase instead of Neon:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 6️⃣ Test It!

```bash
npm run dev
```

Visit: http://localhost:3000/admin

---

## ✅ Database Checklist

- [ ] Neon project created
- [ ] Database named "heart" ⭐
- [ ] Table 1: `homa_patients` (UUID primary key)
- [ ] Table 2: `homa_assessments` (UUID primary key)
- [ ] Connection string copied
- [ ] `.env.local` configured
- [ ] App running without database errors

## 🔍 Check for Database Errors

If you see errors, check:

1. **Connection string is correct** in `.env.local`
2. **Tables were created** (run verification query)
3. **Database name is "heart"** exactly
4. **Environment variables are loaded** (restart dev server after changing .env.local)

---

## 📊 Database Structure

```
heart (database)
├── homa_patients (Table 1)
│   ├── id (UUID, PRIMARY KEY)
│   ├── name
│   ├── age
│   ├── gender
│   ├── phone
│   ├── email
│   ├── created_at
│   └── updated_at
│
└── homa_assessments (Table 2)
    ├── id (UUID, PRIMARY KEY)
    ├── patient_id (UUID, FOREIGN KEY → homa_patients.id)
    ├── [40+ health measurement fields]
    ├── [Lab values: CBC, Lipid, LFT, KFT, TFT]
    ├── risk_category
    ├── cardiometabolic_risk_score
    ├── family_diabetes/hypertension/heart_disease
    ├── lab_notes
    ├── created_at
    └── updated_at
```

---

## 🎯 Next Steps After Database Setup

1. ✅ Database "heart" is created
2. ➡️ Test backend connection
3. ➡️ Build authentication system
4. ➡️ Create frontend forms
5. ➡️ Deploy to production

**Need help?** Check `database/SETUP_INSTRUCTIONS.md` for detailed troubleshooting.


# Deployment Guide - GitHub & Replit

## Database Structure (INTEGER Primary Keys - Simple & Safe)

```
Table 1: homa_patients
  - id: SERIAL (auto-increment 1, 2, 3...)
  - name, age, sex, phone, email
  
Table 2: homa_assessments  
  - id: SERIAL (auto-increment)
  - patient_id: INTEGER (references homa_patients.id)
  - Basic: height, weight, BMI, waist, BP (systolic/diastolic)
  - Lab reports: all test results

Table 3: homa_users (STAFF)
  - id: SERIAL
  - email, password_hash
  - Staff sign up → login → dashboard → add patients
```

---

## Step 1: Create Neon Database "heart"

```bash
# Go to: https://console.neon.tech/app/projects/autumn-darkness-64907462
# 1. Create database: heart
# 2. SQL Editor → Select 'heart'
# 3. Paste schema from database/schema.sql
# 4. Run
```

---

## Step 2: Push to GitHub

```powershell
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: HOMA IQ Score Card with INTEGER keys"

# Add GitHub remote
git remote add origin https://github.com/muddusurendranehru/cod_homa_iq_score-card.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Replit

### Option A: Import from GitHub

1. Go to https://replit.com
2. Click "Create Repl"
3. Select "Import from GitHub"
4. Enter: `muddusurendranehru/cod_homa_iq_score-card`
5. Click "Import from GitHub"

### Option B: Manual Setup

1. Create new Repl → Node.js
2. Upload all project files
3. Add `.env` file in Replit Secrets:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/heart?sslmode=require
```

4. In Replit Shell, run:

```bash
npm install
npm run build
npm run start
```

---

## Step 4: Verify Deployment

### Show Tables in Neon

Run this SQL in Neon SQL Editor:

```sql
-- Show all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

Expected result:
```
homa_assessments
homa_patients
homa_users
```

---

## Application Flow (Following Your Rules)

```
1. DATABASE "heart" (Neon)
   └─ 3 tables with INTEGER keys ✅
   
2. BACKEND (All aligned with database)
   ├─ Staff Sign Up (email, password, confirm password)
   ├─ Staff Login (email, password)
   └─ API endpoints for patient management
   
3. FRONTEND (Aligned with backend)
   ├─ Staff Dashboard
   ├─ Add Patient Form (name, age, sex)
   ├─ Add Health Data (height, weight, BP)
   └─ View/Edit Patient Records
```

---

## Everything Aligns

- Database: INTEGER primary keys
- Backend middleware: Uses INTEGER patient_id
- Frontend: Displays INTEGER IDs
- GitHub: All code version controlled
- Replit: Same rules, same database connection

---

## Files for Deployment

```
✅ database/schema.sql - Create tables
✅ database/show-tables.sql - Verify tables
✅ .env.local - Database connection
✅ package.json - Dependencies
✅ All source code
```

Ready to deploy!


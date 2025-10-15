# Database Setup Instructions - "heart" Database

## Prerequisites
- Neon PostgreSQL account (sign up at https://neon.tech)

## Step 1: Create Neon Project

1. Go to https://console.neon.tech
2. Click **"New Project"**
3. **Project Name**: `heart`
4. **Database Name**: `heart` (IMPORTANT: must be exactly "heart")
5. **Region**: Choose closest to you
6. Click **"Create Project"**

## Step 2: Get Connection String

1. In your Neon project dashboard, click **"Connection Details"**
2. Copy the **Connection String** (should look like):
   ```
   postgresql://[user]:[password]@[host]/heart?sslmode=require
   ```
3. Save this - you'll need it for the `.env.local` file

## Step 3: Run Database Schema

1. In Neon Console, go to **"SQL Editor"**
2. Copy the entire contents of `database/schema.sql`
3. Paste into the SQL Editor
4. Click **"Run"** to execute

This will create:
- ✅ Table 1: `homa_patients` (UUID primary key)
- ✅ Table 2: `homa_assessments` (UUID primary key)

## Step 4: Verify Tables

Run this query in the SQL Editor to verify:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';
```

You should see:
- homa_patients
- homa_assessments

## Step 5: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local` (if not already done)
2. Add your Neon connection string:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
DATABASE_URL=postgresql://[user]:[password]@[host]/heart?sslmode=require
```

**Note**: If using Supabase instead of raw Neon, the Supabase project automatically creates a PostgreSQL database. You can:
- Use Supabase's built-in PostgreSQL (recommended for this project)
- OR use Neon separately and connect via Supabase client

## Step 6: Test Connection

After setup, you can test by running the dev server:

```bash
npm run dev
```

Visit http://localhost:3000/admin and check if you can see the admin panel without database errors.

## Database Schema Overview

### Table 1: homa_patients
- **Purpose**: Store patient demographic information
- **Primary Key**: UUID (auto-generated)
- **Fields**: name, age, gender, phone, email, created_at, updated_at

### Table 2: homa_assessments
- **Purpose**: Store all health assessments and lab values
- **Primary Key**: UUID (auto-generated)
- **Foreign Key**: patient_id references homa_patients(id)
- **Fields**: 
  - Basic measurements (height, weight, BMI, waist)
  - Vital signs (BP, heart rate)
  - Metabolic panel (glucose, insulin, HbA1c, HOMA-IR)
  - Lipid profile (cholesterol, LDL, HDL, triglycerides)
  - Complete Blood Count (CBC)
  - Liver Function Tests (LFT)
  - Kidney Function Tests (KFT)
  - Thyroid Function Tests (TFT)
  - Risk assessment data
  - Family history
  - Lab notes and dates

## Troubleshooting

### Error: "relation does not exist"
- Make sure you ran the schema.sql file in the SQL Editor
- Verify you're connected to the "heart" database

### Error: "connection refused"
- Check your connection string is correct
- Ensure your IP is allowlisted in Neon (check "Settings" > "IP Allow")

### Error: "password authentication failed"
- Regenerate your connection string from Neon dashboard
- Make sure no special characters are URL-encoded

## Next Steps

Once database is set up:
1. ✅ Database created with 2 tables (UUID primary keys)
2. ➡️ Test backend connectivity
3. ➡️ Build frontend forms
4. ➡️ Implement authentication

